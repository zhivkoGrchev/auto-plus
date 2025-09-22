// /app/api/upload-car-image/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

type ApiResponse = {
  success: boolean
  cid?: string
  url?: string
  error?: string
  data?: any
}

export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'File must be an image' },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    console.log(`Uploading file: ${file.name} (${file.size} bytes)`)

    // Create FormData for Pinata
    const pinataFormData = new FormData()
    pinataFormData.append('file', file)
    pinataFormData.append('network', 'public')

    // Upload to Pinata
    const pinataResponse = await fetch('https://uploads.pinata.cloud/v3/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PINATA_JWT}`,
      },
      body: pinataFormData,
    })

    if (!pinataResponse.ok) {
      const errorText = await pinataResponse.text()
      console.error('Pinata upload failed:', errorText)
      return NextResponse.json(
        { success: false, error: 'Failed to upload to IPFS' },
        { status: 500 }
      )
    }

    const pinataResult = await pinataResponse.json()
    
    // Handle the new Pinata API response format
    const cid = pinataResult.data?.cid || pinataResult.IpfsHash
    
    if (!cid) {
      console.error('Invalid Pinata response:', pinataResult)
      return NextResponse.json(
        { success: false, error: 'Invalid response from IPFS service' },
        { status: 500 }
      )
    }

    // Generate the public URL
    const ipfsUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${cid}`
    
    console.log(`Successfully uploaded to IPFS: ${cid}`)

    return NextResponse.json({
      success: true,
      cid: cid,
      url: ipfsUrl,
      data: pinataResult
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: Add a GET method for testing
export async function GET() {
  return NextResponse.json({ 
    message: 'Upload API is working!', 
    timestamp: new Date().toISOString() 
  })
}