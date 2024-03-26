import SidebarHeader from './sidebar-header'
import SidebarMenu from './sidebar-menu'

const Sidebar = () => {
  return (
    <aside className="w-64 shrink-0 flex flex-col bg-muted/40 border-r">
      <SidebarHeader />
      <SidebarMenu />
    </aside>
  )
}

export default Sidebar
