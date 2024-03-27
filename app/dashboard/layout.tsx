'use client'

import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'
import React, { createContext, useState } from 'react'

interface SidebarContextType {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const SidebarContext = createContext<SidebarContextType>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
})

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <div className="fixed size-full flex">
        <Sidebar />
        <div className="grow flex flex-col">
          <Header />
          <main className="p-4 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarContext.Provider>
  )
}

export default DashboardLayout
