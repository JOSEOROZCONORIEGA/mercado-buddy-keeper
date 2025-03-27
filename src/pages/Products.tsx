
import { Helmet } from "react-helmet";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { mockProducts } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductGrid, ProductList } from "@/components/products/ProductList";
import { Filter, Grid, LayoutGrid, List, Plus, Search, SlidersHorizontal } from "lucide-react";

const Products = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  return (
    <>
      <Helmet>
        <title>Productos | MercadoBuddy</title>
      </Helmet>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 py-8 px-6 bg-muted/30">
            <div className="container">
              <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  Productos
                </h1>
                <p className="text-muted-foreground">
                  Administra tus productos de MercadoLibre
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between animate-slideInUp">
                <div className="w-full md:w-auto flex items-center gap-2">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Buscar productos..."
                      className="pl-8 pr-4 w-full"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>

                <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">
                  <div className="flex gap-1 p-1 bg-muted rounded-md">
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="gap-1"
                    >
                      <List className="h-4 w-4" />
                      <span className="hidden sm:inline">Lista</span>
                    </Button>
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="gap-1"
                    >
                      <LayoutGrid className="h-4 w-4" />
                      <span className="hidden sm:inline">Cuadrícula</span>
                    </Button>
                  </div>
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Nuevo Producto</span>
                  </Button>
                </div>
              </div>

              <div className="animate-slideInUp" style={{ animationDelay: '150ms' }}>
                {viewMode === "list" ? (
                  <ProductList products={mockProducts} />
                ) : (
                  <ProductGrid products={mockProducts} />
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Products;
