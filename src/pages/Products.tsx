
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductGrid, ProductList } from "@/components/products/ProductList";
import { 
  Filter, 
  Grid, 
  List, 
  Plus, 
  Search, 
  SlidersHorizontal,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types";
import { mercadolibreApi } from "@/services/mercadolibre";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Products = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<"all" | "active" | "paused" | "low_stock" | "high_stock" | "manufacturing_time">("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      
      // Get user items from MercadoLibre API
      const response = await mercadolibreApi.getUserItems(50, 0);
      
      // Fetch details for each item
      const productIds = response.results || [];
      
      if (productIds.length === 0) {
        setProducts([]);
        return;
      }
      
      const productDetailsPromises = productIds.map(async (id: string) => {
        try {
          const itemData = await mercadolibreApi.getItemDetails(id);
          
          // Transform API response to match our Product interface
          const transformedProduct: Product = {
            id: itemData.id,
            title: itemData.title,
            price: itemData.price,
            image: itemData.thumbnail,
            sku: itemData.seller_custom_field || "",
            stock: itemData.available_quantity,
            categoryId: itemData.category_id,
            status: itemData.status,
            permalink: itemData.permalink,
            description: itemData.description || "",
            sold: itemData.sold_quantity || 0,
            views: itemData.visits || 0,
            gtin: itemData.gtin || "",
            manufacturing_time: extractManufacturingTime(itemData.sale_terms),
          };
          
          return transformedProduct;
        } catch (error) {
          console.error(`Error fetching details for item ${id}:`, error);
          return null;
        }
      });
      
      const productDetails = await Promise.all(productDetailsPromises);
      const validProducts = productDetails.filter(product => product !== null) as Product[];
      
      setProducts(validProducts);
      
      toast({
        title: "Éxito",
        description: `Se cargaron ${validProducts.length} productos`,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const extractManufacturingTime = (saleTerms: any[] = []): number | undefined => {
    const manufacturingTerm = saleTerms?.find(term => term.id === "MANUFACTURING_TIME");
    if (manufacturingTerm?.value_struct?.number) {
      return manufacturingTerm.value_struct.number;
    }
    return undefined;
  };

  const handleRefresh = () => {
    fetchProducts();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products
    .filter(product => {
      // First apply search filter
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return false;
      
      // Then apply status/inventory filters
      switch (filterMode) {
        case "active":
          return product.status === "active";
        case "paused":
          return product.status === "paused";
        case "low_stock":
          return product.stock === 0;
        case "high_stock":
          return product.stock >= 60;
        case "manufacturing_time":
          return product.manufacturing_time !== undefined && product.manufacturing_time > 0;
        default:
          return true;
      }
    });

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
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filtrar productos</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem 
                          onClick={() => setFilterMode("all")}
                          className={filterMode === "all" ? "bg-muted" : ""}
                        >
                          Todos
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setFilterMode("active")}
                          className={filterMode === "active" ? "bg-muted" : ""}
                        >
                          Activos
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setFilterMode("paused")}
                          className={filterMode === "paused" ? "bg-muted" : ""}
                        >
                          Pausados
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => setFilterMode("low_stock")}
                          className={filterMode === "low_stock" ? "bg-muted" : ""}
                        >
                          Sin stock
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => setFilterMode("high_stock")}
                          className={filterMode === "high_stock" ? "bg-muted" : ""}
                        >
                          Stock > 60 unidades
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => setFilterMode("manufacturing_time")}
                          className={filterMode === "manufacturing_time" ? "bg-muted" : ""}
                        >
                          Con tiempo de fabricación
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
                      <Grid className="h-4 w-4" />
                      <span className="hidden sm:inline">Cuadrícula</span>
                    </Button>
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={handleRefresh}
                    disabled={loading}
                  >
                    <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} />
                    Actualizar
                  </Button>
                  
                  <Button className="gap-1">
                    <Plus className="h-4 w-4" />
                    <span>Nuevo Producto</span>
                  </Button>
                </div>
              </div>

              <div className="animate-slideInUp" style={{ animationDelay: '150ms' }}>
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <RefreshCw className="h-10 w-10 animate-spin text-primary" />
                  </div>
                ) : filteredProducts.length > 0 ? (
                  viewMode === "list" ? (
                    <ProductList 
                      products={filteredProducts} 
                      onProductClick={(product) => navigate(`/product/${product.id}`)}
                    />
                  ) : (
                    <ProductGrid 
                      products={filteredProducts} 
                      onProductClick={(product) => navigate(`/product/${product.id}`)}
                    />
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg bg-white">
                    <AlertTriangle className="h-10 w-10 text-amber-500 mb-2" />
                    <h3 className="text-lg font-semibold mb-1">No se encontraron productos</h3>
                    <p className="text-muted-foreground max-w-md mb-4">
                      {searchTerm || filterMode !== "all" 
                        ? "No hay productos que coincidan con los filtros aplicados." 
                        : "No tienes productos disponibles en MercadoLibre."}
                    </p>
                    {(searchTerm || filterMode !== "all") && (
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchTerm("");
                          setFilterMode("all");
                        }}
                      >
                        Limpiar filtros
                      </Button>
                    )}
                  </div>
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
