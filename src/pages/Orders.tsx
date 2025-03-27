
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { mockOrders } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OrderList } from "@/components/orders/OrderList";
import {
  Filter,
  Plus,
  Search,
  SlidersHorizontal
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Orders = () => {
  return (
    <>
      <Helmet>
        <title>Órdenes | MercadoBuddy</title>
      </Helmet>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 py-8 px-6 bg-muted/30">
            <div className="container">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Órdenes
                </h1>
                <p className="text-muted-foreground">
                  Gestiona tus órdenes de MercadoLibre
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between animate-slideInUp">
                <div className="w-full md:w-auto flex items-center gap-2">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar órdenes..."
                      className="pl-8 pr-4 w-full"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pending">Pendientes</SelectItem>
                      <SelectItem value="paid">Pagados</SelectItem>
                      <SelectItem value="shipped">Enviados</SelectItem>
                      <SelectItem value="delivered">Entregados</SelectItem>
                      <SelectItem value="cancelled">Cancelados</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Agregar manualmente</span>
                  </Button>
                </div>
              </div>

              <div className="animate-slideInUp" style={{ animationDelay: '150ms' }}>
                <OrderList orders={mockOrders} />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Orders;
