'use client'

import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed size-full flex">
      <Sidebar />
      <div className="grow flex flex-col">
        <Header />
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout
