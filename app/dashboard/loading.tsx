import { LoaderCircle } from 'lucide-react'

const DashboardLoading = () => {
  return (
    <div className="h-full grid place-items-center">
      <LoaderCircle className="w-10 h-10 animate-spin text-muted-foreground" />
    </div>
  )
}

export default DashboardLoading
