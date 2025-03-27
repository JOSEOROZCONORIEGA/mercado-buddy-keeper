
import { Order } from "@/types";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Package, Truck, Printer, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders }: OrderListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">ID de orden</TableHead>
              <TableHead className="w-[120px]">Fecha</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead className="w-[100px]">Total</TableHead>
              <TableHead className="w-[120px]">Estado</TableHead>
              <TableHead className="w-[150px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.id.slice(0, 4)}...{order.id.slice(-4)}
                </TableCell>
                <TableCell>
                  {new Date(order.date).toLocaleDateString('es-MX', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{order.buyer.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {order.shipping.city}, {order.shipping.state}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    ${order.total.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </TableCell>
                <TableCell>
                  <OrderStatusBadge status={order.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Package className="mr-2 h-4 w-4" /> Preparar envío
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" /> Marcar como enviado
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Printer className="mr-2 h-4 w-4" /> Imprimir factura
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function OrderStatusBadge({ status }: { status: Order['status'] }) {
  const statusConfig = {
    pending: {
      label: "Pendiente",
      variant: "outline" as const,
      className: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200"
    },
    paid: {
      label: "Pagado",
      variant: "outline" as const,
      className: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
    },
    shipped: {
      label: "Enviado",
      variant: "outline" as const,
      className: "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200"
    },
    delivered: {
      label: "Entregado",
      variant: "default" as const,
      className: "bg-green-500 hover:bg-green-600"
    },
    cancelled: {
      label: "Cancelado",
      variant: "outline" as const,
      className: "bg-red-100 text-red-700 hover:bg-red-200 border-red-200"
    }
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}
