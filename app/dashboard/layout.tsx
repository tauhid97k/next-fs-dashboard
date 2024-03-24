'use client'

import Header from '@/components/dashboard/header'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed size-full">
      <Header />
      <main className="h-[calc(100vh-64px)] p-4 md:p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
