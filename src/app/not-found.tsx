'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const NotFoundPage = () => {
  const router = useRouter()

  return (
    <div className="flex flex-col grow rounded-lg text-center items-center justify-center w-full">
      <h1 className="text-3xl font-bold mb-4">Not Found</h1>
      <p className="text-destructive mb-4">Could not find requested page</p>
      <Button variant="outline" className="mt-4 hover:cursor-pointer" onClick={() => router.push('/admin')}>
        Back to Admin panel
      </Button>
    </div>
  )
}

export default NotFoundPage
