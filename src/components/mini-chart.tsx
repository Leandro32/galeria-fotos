"use client"

import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

export function MiniChart() {
  // Datos de los últimos 7 días (cantidad de fotos subidas por día)
  const data = [
    { day: "25", fotos: 0 },
    { day: "26", fotos: 0 },
    { day: "27", fotos: 0 },
    { day: "28", fotos: 1027 },
    { day: "29", fotos: 1419 },
    { day: "30", fotos: 0 },
    { day: "31", fotos: 0 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="day" tick={{ fontSize: 8 }} tickLine={false} axisLine={false} />
        <YAxis hide={true} />
        <Tooltip
          formatter={(value) => [`${value} fotos`, "Subidas"]}
          labelFormatter={(label) => `${label} Mar`}
          contentStyle={{ fontSize: "10px" }}
        />
        <Bar dataKey="fotos" fill="#10b981" radius={[2, 2, 0, 0]} barSize={3} />
      </BarChart>
    </ResponsiveContainer>
  )
}
