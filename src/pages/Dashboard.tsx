
import { Helmet } from "react-helmet";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatCard } from "@/components/dashboard/StatCard";
import { SalesBarChart, SalesChart } from "@/components/dashboard/SalesChart";
import { MapView } from "@/components/dashboard/MapView";
import { mockRegionData, mockSalesData, mockStats } from "@/lib/mock-data";
import { BarChart3, CreditCard, DollarSign, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | MercadoBuddy</title>
      </Helmet>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 py-8 px-6 bg-muted/30">
            <div className="container">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Bienvenido a MercadoBuddy, tu asistente de gestión para MercadoLibre
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slideInUp">
                <StatCard
                  title="Ventas Totales"
                  value={mockStats.totalSales}
                  description="Últimos 30 días"
                  icon={BarChart3}
                  trend="up"
                  trendValue="+12.5%"
                  colorClass="bg-mercado-blue"
                />
                
                <StatCard
                  title="Órdenes"
                  value={mockStats.totalOrders}
                  description={`${mockStats.pendingOrders} pendientes`}
                  icon={ShoppingCart}
                  trend="up"
                  trendValue="+8.3%"
                  colorClass="bg-green-500"
                />
                
                <StatCard
                  title="Ingresos"
                  value={`$${mockStats.totalRevenue.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  description="Promedio $2,132.66 por orden"
                  icon={DollarSign}
                  trend="up"
                  trendValue="+15.2%"
                  colorClass="bg-mercado-yellow"
                />
                
                <StatCard
                  title="Tasa de Conversión"
                  value={`${mockStats.conversionRate}%`}
                  description={`${mockStats.visitCount} visitas`}
                  icon={Users}
                  trend="up"
                  trendValue="+0.5%"
                  colorClass="bg-purple-500"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-slideInUp" style={{ animationDelay: '150ms' }}>
                <SalesChart
                  data={mockSalesData}
                  title="Ventas e Ingresos"
                  description="Datos de los últimos 7 días"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slideInUp" style={{ animationDelay: '300ms' }}>
                <SalesBarChart
                  data={mockSalesData}
                  title="Ventas por día"
                  description="Cantidad de ventas por día"
                />
                
                <MapView
                  data={mockRegionData}
                  title="Ventas por región"
                  description="Distribución geográfica de ventas"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
