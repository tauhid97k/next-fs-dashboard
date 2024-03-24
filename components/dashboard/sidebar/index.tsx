import SidebarMenu from '@/components/dashboard/sidebar/sidebar-menu'

const Sidebar = () => {
  return (
    <aside className="h-[calc(100vh-64px)] w-64 p-4 md:p-6 bg-muted/40 border-r overflow-y-auto">
      <SidebarMenu />
    </aside>
  )
}

export default Sidebar
