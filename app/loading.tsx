import { LoaderCircle } from 'lucide-react'

const Loading = () => {
  return (
    <div className="h-screen grid place-items-center">
      <LoaderCircle className="w-10 h-10 animate-spin text-muted-foreground" />
    </div>
  )
}

export default Loading
