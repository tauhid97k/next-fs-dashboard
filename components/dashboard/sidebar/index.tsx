import { useContext } from 'react'
import { SidebarContext } from '@/app/dashboard/layout'
import SidebarHeader from './sidebar-header'
import SidebarMenu from './sidebar-menu'

const Sidebar = () => {
  const { isSidebarOpen } = useContext(SidebarContext)

  return (
    <aside
      className={`${
        isSidebarOpen ? 'ml-0' : '-ml-64'
      } w-64 h-full shrink-0 flex flex-col absolute md:static bg-background md:bg-muted/40 border-r transition-[margin] duration-300`}
    >
      <SidebarHeader />
      <SidebarMenu />
    </aside>
  )
}

export default Sidebar
