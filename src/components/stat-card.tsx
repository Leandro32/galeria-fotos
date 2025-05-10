import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, CheckCircle, Percent, TrendingUp, Lock, ShoppingCart, type LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  description: string
  className?: string
  iconName?: string
}

export function StatCard({ title, value, description, className, iconName }: StatCardProps) {
  // Mapeo de nombres de iconos a componentes de Lucide
  const iconMap: Record<string, LucideIcon> = {
    camera: Camera,
    "check-circle": CheckCircle,
    percent: Percent,
    "trending-up": TrendingUp,
    lock: Lock,
    "shopping-cart": ShoppingCart,
  }

  // Obtener el componente de icono si existe
  const IconComponent = iconName ? iconMap[iconName] : null

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4">
        <CardTitle className="text-xs sm:text-sm font-medium">{title}</CardTitle>
        {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold truncate">{value}</div>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </CardContent>
    </Card>
  )
}
