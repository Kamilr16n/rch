"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { BarChart3, Menu, User, Home, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isLanding = pathname === "/"

  if (isLanding) {
    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">Rechart</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Button asChild size="sm">
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">Rechart</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/create">Create App</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex md:hidden items-center space-x-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/create"
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <Plus className="h-5 w-5" />
                  <span>Create App</span>
                </Link>
                <div className="border-t pt-4 space-y-2">
                  <div className="px-3 py-2 text-sm text-muted-foreground">Account</div>
                  <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors w-full text-left">
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </button>
                  <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors w-full text-left">
                    <span>Settings</span>
                  </button>
                  <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors w-full text-left">
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
