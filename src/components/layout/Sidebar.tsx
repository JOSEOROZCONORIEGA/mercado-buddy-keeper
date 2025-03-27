
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Box,
  CreditCard,
  Globe,
  Home,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border flex flex-col h-screen sticky top-0 z-50",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <div className={cn("flex items-center", collapsed && "hidden")}>
          <div className="text-xl font-bold text-mercado-blue ml-2 flex">
            MercadoBuddy
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-sidebar-accent text-sidebar-foreground"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Home className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <TooltipProvider>
          <nav className="space-y-1 px-2">
            <NavItem
              icon={LayoutDashboard}
              label="Dashboard"
              to="/"
              active
              collapsed={collapsed}
            />
            <NavItem
              icon={Box}
              label="Productos"
              to="/products"
              collapsed={collapsed}
            />
            <NavItem
              icon={ShoppingCart}
              label="Órdenes"
              to="/orders"
              collapsed={collapsed}
            />
            <NavItem
              icon={Users}
              label="Clientes"
              to="/customers"
              collapsed={collapsed}
            />
            <NavItem
              icon={BarChart3}
              label="Reportes"
              to="/reports"
              collapsed={collapsed}
            />
            <NavItem
              icon={CreditCard}
              label="Pagos"
              to="/payments"
              collapsed={collapsed}
            />
            <NavItem
              icon={Package}
              label="Envíos"
              to="/shipments"
              collapsed={collapsed}
            />
            <NavItem
              icon={MessageSquare}
              label="Mensajes"
              to="/messages"
              collapsed={collapsed}
            />
            <NavItem
              icon={Globe}
              label="Publicidad"
              to="/advertising"
              collapsed={collapsed}
            />
            <NavItem
              icon={Settings}
              label="Configuración"
              to="/settings"
              collapsed={collapsed}
            />
          </nav>
        </TooltipProvider>
      </div>
      
      <div className="p-4">
        <div
          className={cn(
            "rounded-lg bg-sidebar-accent p-3 text-sm transition-all",
            collapsed ? "items-center justify-center" : "space-y-2"
          )}
        >
          <div className={cn("font-medium", collapsed && "hidden")}>
            ¿Necesitas ayuda?
          </div>
          <div className={cn("text-sidebar-foreground/80 text-xs", collapsed && "hidden")}>
            Visita nuestro centro de ayuda para resolver tus dudas.
          </div>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90",
              collapsed && "w-10 h-10 p-0"
            )}
          >
            {collapsed ? "?" : "Centro de ayuda"}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
}

function NavItem({ icon: Icon, label, to, active, collapsed }: NavItemProps) {
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link to={to}>
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "default"}
            className={cn(
              "w-full justify-start",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon className={cn("h-5 w-5", !collapsed && "mr-2")} />
            {!collapsed && <span>{label}</span>}
          </Button>
        </Link>
      </TooltipTrigger>
      {collapsed && (
        <TooltipContent side="right" className="bg-sidebar-primary font-medium text-sidebar-primary-foreground">
          {label}
        </TooltipContent>
      )}
    </Tooltip>
  );
}
