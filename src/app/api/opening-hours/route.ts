import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getOpeningHours, saveOpeningHours } from '@/lib/actions/opening-hours.actions'

type ApiResponse = {
  success: boolean
  data?: any
  error?: string
}

// GET opening hours
export async function GET(): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await getOpeningHours()
    
    return NextResponse.json({
      success: true,
      data
    })
  } catch (error: any) {
    console.error('API Error fetching opening hours:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch opening hours' },
      { status: 500 }
    )
  }
}

// POST/PUT opening hours
export async function POST(request: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    const data = await request.json()
    
    const result = await saveOpeningHours(data)
    
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.errors?.form?.[0] || 'Failed to save opening hours' },
        { status: 400 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: { message: 'Opening hours saved successfully' }
    })
  } catch (error: any) {
    console.error('API Error saving opening hours:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save opening hours' },
      { status: 500 }
    )
  }
}