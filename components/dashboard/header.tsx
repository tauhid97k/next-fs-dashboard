import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CircleUser, Menu } from 'lucide-react'
import { ThemeToggler } from '@/components/theme-toggler'
import { useContext } from 'react'
import { SidebarContext } from '@/app/dashboard/layout'
import { logout } from '@/actions/authActions'

const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)

  return (
    <header className="shrink-0 flex h-16 items-center justify-between gap-4 border-b bg-muted/40 px-4 md:px-6">
      <Button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        variant="outline"
        size="icon"
      >
        <Menu className="icon" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      <div className="flex items-center gap-4">
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full">
            <Avatar className="w-9 h-9">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="profile image"
              />
              <AvatarFallback>
                <CircleUser className="icon" />
              </AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={async () => await logout()}>
                <button type="submit">Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
