"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function AlbumsTable() {
  const albums = [
    {
      name: "9 LEANDRO",
      subidas: 20042,
      vendidas: 716,
      reales: 275.89,
      vs: 1.38,
    },
    {
      name: "Piscina con Olas",
      subidas: 42237,
      vendidas: 1025,
      reales: 685.87,
      vs: 1.62,
    },
    {
      name: "Flow Wave",
      subidas: 9586,
      vendidas: 68,
      reales: 42.77,
      vs: 0.45,
    },
    {
      name: "Aqualandia",
      subidas: 9,
      vendidas: 1,
      reales: 1,
      vs: 11.11,
    },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Álbum</TableHead>
          <TableHead className="text-right">Subidas</TableHead>
          <TableHead className="text-right">Vendidas</TableHead>
          <TableHead className="text-right">Reales</TableHead>
          <TableHead className="text-right">V/S</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {albums.map((album) => (
          <TableRow key={album.name}>
            <TableCell className="font-medium">{album.name}</TableCell>
            <TableCell className="text-right">{album.subidas.toLocaleString()}</TableCell>
            <TableCell className="text-right">{album.vendidas.toLocaleString()}</TableCell>
            <TableCell className="text-right">{album.reales.toFixed(2)}</TableCell>
            <TableCell className="text-right">{album.vs.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
