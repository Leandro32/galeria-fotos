"use client"

export function DailyPerformance() {
  const dailyData = [
    { date: "25 Mar", value: "-", count: 0 },
    { date: "26 Mar", value: "-", count: 0 },
    { date: "27 Mar", value: "-", count: 0 },
    { date: "28 Mar", value: "-", count: 1027 },
    { date: "29 Mar", value: "9.5", count: 1419 },
    { date: "30 Mar", value: "-", count: 0 },
    { date: "31 Mar", value: "-", count: 0 },
  ]

  return (
    <div className="grid grid-cols-7 gap-2">
      {dailyData.map((day) => (
        <div key={day.date} className="border rounded-md p-2">
          <div className="text-center">
            <div className="text-xs font-medium">{day.date}</div>
            <div className="text-sm font-bold">{day.value}</div>
            <div className="text-xs text-muted-foreground">{day.count > 0 ? day.count : ""}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
