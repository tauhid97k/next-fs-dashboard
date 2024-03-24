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

const Header = () => {
  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="shrink-0">
          <Menu className="icon" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        <h1 className="text-xl font-medium">Shadcn UI</h1>
      </div>
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
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Header
