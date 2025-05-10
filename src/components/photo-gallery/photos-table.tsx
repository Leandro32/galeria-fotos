import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export function PhotosTable() {
  const photos = [
    {
      id: 1,
      thumbnail: "/placeholder.svg?height=80&width=80",
      tomada: "29 Mar 10:53",
      subida: "29 Mar 12:52",
      vendida: "29 Mar 19:30",
      metodoPago: "Efectivo",
      total: "0.5",
    },
    {
      id: 2,
      thumbnail: "/placeholder.svg?height=80&width=80",
      tomada: "29 Mar 10:52",
      subida: "29 Mar 12:54",
      vendida: "29 Mar 19:30",
      metodoPago: "Efectivo",
      total: "0.5",
    },
    {
      id: 3,
      thumbnail: "/placeholder.svg?height=80&width=80",
      tomada: "29 Mar 12:49",
      subida: "29 Mar 18:59",
      vendida: "29 Mar 19:30",
      metodoPago: "Efectivo",
      total: "0.5",
    },
    {
      id: 4,
      thumbnail: "/placeholder.svg?height=80&width=80",
      tomada: "29 Mar 10:32",
      subida: "29 Mar 12:52",
      vendida: "29 Mar 19:14",
      metodoPago: "Transferencia",
      total: "2",
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Foto</TableHead>
          <TableHead>Tomada</TableHead>
          <TableHead>Subida</TableHead>
          <TableHead>Vendida</TableHead>
          <TableHead>Método de Pago</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {photos.map((photo) => (
          <TableRow key={photo.id}>
            <TableCell>
              <img
                src={photo.thumbnail || "/placeholder.svg"}
                alt={`Foto ${photo.id}`}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
            </TableCell>
            <TableCell>{photo.tomada}</TableCell>
            <TableCell>{photo.subida}</TableCell>
            <TableCell>{photo.vendida}</TableCell>
            <TableCell>{photo.metodoPago}</TableCell>
            <TableCell className="text-right">{photo.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
} 