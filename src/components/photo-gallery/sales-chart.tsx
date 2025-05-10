import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export function SalesChart() {
  // Datos simulados basados en la gráfica de la imagen
  const data = [
    { date: "3/3", vendidas: 20, subidas: 15 },
    { date: "10/3", vendidas: 25, subidas: 10 },
    { date: "17/3", vendidas: 45, subidas: 30 },
    { date: "24/3", vendidas: 10, subidas: 5 },
  ]

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line yAxisId="left" type="monotone" dataKey="vendidas" stroke="#3b82f6" activeDot={{ r: 8 }} />
          <Line yAxisId="right" type="monotone" dataKey="subidas" stroke="#10b981" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 