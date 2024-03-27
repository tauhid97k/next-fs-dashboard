import { SidebarContext } from '@/app/dashboard/layout'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import { useContext } from 'react'

const SidebarHeader = () => {
  const { setIsSidebarOpen } = useContext(SidebarContext)

  return (
    <div className="shrink-0 flex items-center justify-between px-4 border-b h-16">
      <h1 className="text-xl font-medium">Shadcn UI</h1>
      <Button
        onClick={() => setIsSidebarOpen(false)}
        variant="outline"
        size="icon"
        className="md:hidden"
      >
        <X className="icon" />
        <span className="sr-only">Close navigation menu</span>
      </Button>
    </div>
  )
}

export default SidebarHeader
