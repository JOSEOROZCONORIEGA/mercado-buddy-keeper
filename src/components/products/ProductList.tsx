
import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash, Copy, ArrowUpRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductListProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

export function ProductList({ products, onProductClick }: ProductListProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
                <Checkbox />
              </TableHead>
              <TableHead className="min-w-[250px]">Producto</TableHead>
              <TableHead className="w-[100px]">Precio</TableHead>
              <TableHead className="w-[80px]">Stock</TableHead>
              <TableHead className="w-[100px]">Vendidos</TableHead>
              <TableHead className="w-[100px]">Vistas</TableHead>
              <TableHead className="w-[100px]">Estado</TableHead>
              <TableHead className="w-[140px] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>
                  <div 
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => onProductClick && onProductClick(product)}
                  >
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="font-medium text-sm leading-tight">{product.title}</div>
                      <div className="text-xs text-muted-foreground">{product.sku}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={product.stock < 10 ? "text-amber-500 font-medium" : "font-medium"}>
                    {product.stock}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{product.sold}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{product.views}</div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={product.status} />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onProductClick && onProductClick(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => window.open(product.permalink, "_blank")}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
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

export function ProductGrid({ products, onProductClick }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
          onClick={() => onProductClick && onProductClick(product)}
        >
          <div className="aspect-square relative bg-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <StatusBadge status={product.status} />
            </div>
          </div>
          <CardContent className="p-4">
            <div className="min-h-[48px]">
              <h3 className="font-medium text-sm leading-tight line-clamp-2 mb-1">
                {product.title}
              </h3>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="text-lg font-bold">
                ${product.price.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-muted-foreground">
                Stock: {product.stock}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs space-x-1">
                <span className="text-muted-foreground">SKU:</span>
                <span>{product.sku}</span>
              </div>
              <div className="flex space-x-1">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onProductClick) onProductClick(product);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(product.permalink, "_blank");
                  }}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: Product['status'] }) {
  const statusConfig = {
    active: {
      label: "Activo",
      variant: "default" as const,
      className: "bg-green-500 hover:bg-green-600"
    },
    paused: {
      label: "Pausado",
      variant: "outline" as const,
      className: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200"
    },
    under_review: {
      label: "En revisión",
      variant: "outline" as const,
      className: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
    }
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={config.className}>
      {config.label}
    </Badge>
  );
}
