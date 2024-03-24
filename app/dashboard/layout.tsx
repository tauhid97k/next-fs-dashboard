'use client'

import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed size-full">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="h-[calc(100vh-64px)] grow p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
