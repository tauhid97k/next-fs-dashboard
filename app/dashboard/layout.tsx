'use client'

import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'
import React, { createContext, useEffect, useState } from 'react'

// Context Types
interface SidebarContextType {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  isSidebarMobile: boolean
  setIsSidebarMobile: React.Dispatch<React.SetStateAction<boolean>>
}

// Sidebar Context
export const SidebarContext = createContext<SidebarContextType>({
  isSidebarOpen: false,
  setIsSidebarOpen: () => {},
  isSidebarMobile: false,
  setIsSidebarMobile: () => {},
})

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  const [isSidebarMobile, setIsSidebarMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
        setIsSidebarMobile(true)
      } else {
        setIsSidebarMobile(false)
        setIsSidebarOpen(true)
      }
    }

    // Initial check on mount
    handleResize()

    // Event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <SidebarContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        isSidebarMobile,
        setIsSidebarMobile,
      }}
    >
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
