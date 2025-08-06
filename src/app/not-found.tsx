'use client'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const NotFoundPage = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col rounded-lg text-center items-center justify-center w-full">
      <h1 className="text-3xl font-bold mb-4">Not Found</h1>
      <p className="text-destructive mb-4">Could not find requested page</p>
      <Button variant="outline" className="mt-4 hover:cursor-pointer" onClick={() => router.push('/dashboard')}>
        Back to Dashboard
      </Button>
    </div>
  )
}

export default NotFoundPage
