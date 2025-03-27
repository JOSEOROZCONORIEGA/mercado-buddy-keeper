
import { Bell, Mail, Search, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full py-3 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="container flex h-14 items-center">
        <div className="hidden md:flex md:w-1/3">
          <form className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-full pl-8 bg-muted/50 rounded-full border-0 focus-visible:ring-mercado-blue"
            />
          </form>
        </div>
        
        <div className="flex w-full md:w-1/3 justify-center">
          <div className="text-xl font-bold text-mercado-blue flex items-center">
            MercadoBuddy
          </div>
        </div>
        
        <div className="flex w-full md:w-1/3 justify-end">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Mail className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-mercado-blue text-white">2</Badge>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-mercado-blue text-white">4</Badge>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/lovable-uploads/f4e2a24b-a082-45c7-b3bf-af7b61be759c.png" alt="User" />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Usuario</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      usuario@mercado.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Configuración
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Soporte
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  );
}
