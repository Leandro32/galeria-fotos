"use client"

import { Calendar } from "../components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "../components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import { PhotosTable } from "../components/photo-gallery/photos-table"
import { AlbumsTable } from "../components/photo-gallery/albums-table"
import { StatCard } from "../components/photo-gallery/stat-card"
import { SalesChart } from "../components/photo-gallery/sales-chart"
import { DailyPerformance } from "../components/photo-gallery/daily-performance"
import { UserNav } from "../components/photo-gallery/user-nav"
import { MainNav } from "../components/photo-gallery/main-nav"
import { MiniChart } from "../components/photo-gallery/mini-chart"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { useIsMobile } from "../hooks/use-mobile"
import { Header } from "../components/ui/Header"

console.log("holaaa")
export default function DashboardPage() {
  const isMobile = useIsMobile()
  console.log("holaaa")
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Vista General</TabsTrigger>
                <TabsTrigger value="analytics">Analítica</TabsTrigger>
                <TabsTrigger value="reports">Reportes</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <StatCard
              title="TOMAS"
              value="34259"
              description="Total de fotografías"
              className="w-full"
              iconName="camera"
            />
            <StatCard
              title="VENDIDAS"
              value="316"
              description="Fotografías vendidas"
              className="w-full"
              iconName="check-circle"
            />
            <StatCard
              title="DESC. PROM."
              value="32%"
              description="Descuento promedio"
              className="w-full"
              iconName="percent"
            />
            <StatCard
              title="REAL"
              value="215.14"
              description="Valor real promedio"
              className="w-full"
              iconName="trending-up"
            />
            <StatCard title="CERRADAS" value="0" description="Ventas cerradas" className="w-full" iconName="lock" />
            <StatCard
              title="PEDIDOS"
              value="$1,936,226"
              description="Valor total de pedidos"
              className="w-full"
              iconName="shopping-cart"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-5">
            <CardHeader>
              <CardTitle>Rendimiento de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <SalesChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Calendario</CardTitle>
            </CardHeader>
            <CardContent>
              {isMobile ? (
                <div className="space-y-3">
                  <div>
                    <label htmlFor="date-from" className="text-sm font-medium block mb-1">
                      Desde:
                    </label>
                    <Input
                      id="date-from"
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="h-10"
                      defaultValue="01/03/2025"
                    />
                  </div>
                  <div>
                    <label htmlFor="date-to" className="text-sm font-medium block mb-1">
                      Hasta:
                    </label>
                    <Input
                      id="date-to"
                      type="text"
                      placeholder="DD/MM/YYYY"
                      className="h-10"
                      defaultValue="31/03/2025"
                    />
                  </div>
                </div>
              ) : (
                <Calendar
                  mode="single"
                  month={new Date(2025, 2)} // March 2025
                  className="rounded-md border"
                />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Rendimiento Diario</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-rows-2 h-full">
                {/* Mejor día - 50% superior */}
                <div className="p-4 border-b">
                  <h3 className="text-sm font-medium mb-2">Mejor Día</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">29 Mar</div>
                      <div className="text-sm text-muted-foreground">Valor: 9.5</div>
                    </div>
                    <div className="w-24 h-16">
                      <MiniChart />
                      <div className="text-xs text-center text-muted-foreground mt-1">1419 fotos</div>
                    </div>
                  </div>
                </div>

                {/* Últimos 7 días - 50% inferior */}
                <div className="p-4">
                  <DailyPerformance />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Álbumes</CardTitle>
            </CardHeader>
            <CardContent>
              <AlbumsTable />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <CardTitle>Fotografías Recientes</CardTitle>
              <div className="flex w-full flex-col space-y-2 sm:w-auto sm:flex-row sm:space-x-2 sm:space-y-0">
                <Input placeholder="Buscar fotografías..." className="w-full sm:w-[200px]" />
                <Button variant="secondary" size="sm">
                  Buscar
                </Button>
              </div>
            </CardHeader>
            <div className="px-6 py-2 border-t border-b bg-muted/50">
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Filtrar por:</span>
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Álbum" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los álbumes</SelectItem>
                      <SelectItem value="leandro">9 LEANDRO</SelectItem>
                      <SelectItem value="piscina">Piscina con Olas</SelectItem>
                      <SelectItem value="flow">Flow Wave</SelectItem>
                      <SelectItem value="aqua">Aqualandia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="todos">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="vendidas">Vendidas</SelectItem>
                      <SelectItem value="no-vendidas">No vendidas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="recientes">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recientes">Más recientes</SelectItem>
                      <SelectItem value="antiguas">Más antiguas</SelectItem>
                      <SelectItem value="precio-alto">Mayor precio</SelectItem>
                      <SelectItem value="precio-bajo">Menor precio</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <CardContent>
              <PhotosTable />
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t px-6 py-4">
              <div className="text-xs text-muted-foreground">
                Mostrando <strong>1</strong> a <strong>4</strong> de <strong>24</strong> fotografías
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Siguiente
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
