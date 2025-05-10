import type { HTMLAttributes } from "react"

import { Link } from "react-router-dom"
import { cn } from "../lib/utils"
import { Camera, Home, ImageIcon, BarChart2, Settings } from "lucide-react"

export function MainNav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: Home,
      active: true,
    },
    {
      href: "/fotos",
      label: "Fotos",
      icon: Camera,
    },
    {
      href: "/subir-fotos",
      label: "Subir Fotos",
      icon: ImageIcon,
    },
    {
      href: "/reportes",
      label: "Reportes",
      icon: BarChart2,
    },
    {
      href: "/configuracion",
      label: "Configuración",
      icon: Settings,
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => {
        const Icon = route.icon
        return (
          <Link
            key={route.href}
            to={route.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span className="hidden md:inline-block">{route.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
