
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { mercadolibreApi } from "@/services/mercadolibre";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product, ProductVariation } from "@/types";
import { Loader2, Save, ArrowLeft, Pause, Play, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [manufacturingTimeSupported, setManufacturingTimeSupported] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
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
          variations: itemData.variations?.map((v: any) => ({
            id: v.id,
            attribute_combinations: v.attribute_combinations,
            price: v.price,
            available_quantity: v.available_quantity,
            sold_quantity: v.sold_quantity,
            picture_ids: v.picture_ids,
            seller_custom_field: v.seller_custom_field,
            catalog_product_id: v.catalog_product_id,
            gtin: v.gtin
          }))
        };
        
        setProduct(transformedProduct);
        
        // Check if manufacturing time is supported for this category
        const isSupported = await mercadolibreApi.checkManufacturingTimeAvailability(transformedProduct.categoryId);
        setManufacturingTimeSupported(isSupported);
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast({
          title: "Error",
          description: "No se pudo cargar los detalles del producto",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductDetails();
  }, [id, toast]);

  const extractManufacturingTime = (saleTerms: any[] = []): number | undefined => {
    const manufacturingTerm = saleTerms?.find(term => term.id === "MANUFACTURING_TIME");
    if (manufacturingTerm?.value_struct?.number) {
      return manufacturingTerm.value_struct.number;
    }
    return undefined;
  };

  const handleUpdateProduct = async (updatedData: Partial<Product>) => {
    if (!product) return;
    
    try {
      setSaving(true);
      await mercadolibreApi.updateItem(product.id, updatedData);
      
      // Update local state
      setProduct(prev => prev ? { ...prev, ...updatedData } : null);
      
      toast({
        title: "Éxito",
        description: "Producto actualizado correctamente",
      });
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el producto",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleStatusToggle = async () => {
    if (!product) return;
    
    const newStatus = product.status === "active" ? "paused" : "active";
    
    try {
      setSaving(true);
      await mercadolibreApi.updateItemStatus(product.id, newStatus);
      
      // Update local state
      setProduct(prev => prev ? { ...prev, status: newStatus } : null);
      
      toast({
        title: "Éxito",
        description: `Producto ${newStatus === "active" ? "activado" : "pausado"} correctamente`,
      });
    } catch (error) {
      console.error("Error updating product status:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el estado del producto",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStock = async (newStock: number) => {
    if (!product) return;
    
    try {
      setSaving(true);
      await mercadolibreApi.updateItemStock(product.id, newStock);
      
      // Update local state
      setProduct(prev => prev ? { ...prev, stock: newStock } : null);
      
      toast({
        title: "Éxito",
        description: "Stock actualizado correctamente",
      });
    } catch (error) {
      console.error("Error updating stock:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el stock",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePrice = async (newPrice: number) => {
    if (!product) return;
    
    try {
      setSaving(true);
      await mercadolibreApi.updateItemPrice(product.id, newPrice);
      
      // Update local state
      setProduct(prev => prev ? { ...prev, price: newPrice } : null);
      
      toast({
        title: "Éxito",
        description: "Precio actualizado correctamente",
      });
    } catch (error) {
      console.error("Error updating price:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el precio",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateGtin = async (gtin: string) => {
    if (!product) return;
    
    try {
      setSaving(true);
      await mercadolibreApi.updateItemGtin(product.id, gtin);
      
      // Update local state
      setProduct(prev => prev ? { ...prev, gtin } : null);
      
      toast({
        title: "Éxito",
        description: "Código GTIN actualizado correctamente",
      });
    } catch (error) {
      console.error("Error updating GTIN:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el código GTIN",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateVariationGtin = async (variationId: string, gtin: string) => {
    if (!product) return;
    
    try {
      setSaving(true);
      await mercadolibreApi.updateVariationGtin(product.id, variationId, gtin);
      
      // Update local state
      setProduct(prev => {
        if (!prev) return null;
        
        const updatedVariations = prev.variations?.map(v => 
          v.id === variationId ? { ...v, gtin } : v
        );
        
        return { ...prev, variations: updatedVariations };
      });
      
      toast({
        title: "Éxito",
        description: "Código GTIN de la variación actualizado correctamente",
      });
    } catch (error) {
      console.error("Error updating variation GTIN:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el código GTIN de la variación",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateManufacturingTime = async (days: number) => {
    if (!product) return;
    
    try {
      setSaving(true);
      await mercadolibreApi.updateManufacturingTime(product.id, days);
      
      // Update local state
      setProduct(prev => prev ? { ...prev, manufacturing_time: days } : null);
      
      toast({
        title: "Éxito",
        description: "Tiempo de fabricación actualizado correctamente",
      });
    } catch (error) {
      console.error("Error updating manufacturing time:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el tiempo de fabricación",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 py-8 px-6 bg-muted/30 flex items-center justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </main>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 py-8 px-6 bg-muted/30">
            <div className="container">
              <Button 
                variant="outline" 
                className="mb-4"
                onClick={() => navigate("/products")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver a Productos
              </Button>
              
              <Card>
                <CardContent className="flex flex-col items-center justify-center min-h-[300px]">
                  <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
                  <h2 className="text-xl font-bold">Producto no encontrado</h2>
                  <p className="text-muted-foreground mt-2">
                    No se pudo encontrar el producto con ID: {id}
                  </p>
                  <Button 
                    className="mt-4"
                    onClick={() => navigate("/products")}
                  >
                    Volver a Productos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const statusBadgeClasses = {
    active: "bg-green-500 hover:bg-green-600",
    paused: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
    under_review: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200"
  };

  const statusLabel = {
    active: "Activo",
    paused: "Pausado",
    under_review: "En revisión"
  };

  return (
    <>
      <Helmet>
        <title>{product.title} | MercadoBuddy</title>
      </Helmet>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 py-8 px-6 bg-muted/30">
            <div className="container">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/products")}
                    className="mb-2"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Volver
                  </Button>
                  <h1 className="text-2xl font-bold tracking-tight">
                    {product.title}
                  </h1>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={product.status === "active" ? "outline" : "default"}
                    onClick={handleStatusToggle}
                    disabled={saving || product.status === "under_review"}
                  >
                    {product.status === "active" ? (
                      <>
                        <Pause className="h-4 w-4 mr-1" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-1" />
                        Activar
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => window.open(product.permalink, "_blank")}
                  >
                    Ver en MercadoLibre
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column - product image and basic info */}
                <Card className="lg:col-span-1">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-muted rounded-md mb-4 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-contain" 
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Estado</div>
                        <Badge 
                          variant="outline" 
                          className={statusBadgeClasses[product.status]}
                        >
                          {statusLabel[product.status]}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">ID</div>
                        <div className="text-sm">{product.id}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">SKU</div>
                        <div className="text-sm">{product.sku || "No definido"}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Categoría</div>
                        <div className="text-sm">{product.categoryId}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Ventas</div>
                        <div className="text-sm">{product.sold}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-1">Vistas</div>
                        <div className="text-sm">{product.views}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Right column - editable fields */}
                <Card className="lg:col-span-2">
                  <CardContent className="p-0">
                    <Tabs defaultValue="general">
                      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
                        <TabsTrigger 
                          value="general"
                          className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                        >
                          General
                        </TabsTrigger>
                        
                        <TabsTrigger 
                          value="variations"
                          className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                          disabled={!product.variations || product.variations.length === 0}
                        >
                          Variaciones ({product.variations?.length || 0})
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="general" className="p-6">
                        <div className="space-y-6">
                          {/* Price */}
                          <div>
                            <Label htmlFor="price">Precio</Label>
                            <div className="flex gap-2 mt-1.5">
                              <Input 
                                id="price"
                                type="number"
                                min="0"
                                step="0.01"
                                defaultValue={product.price}
                                className="w-full"
                              />
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button>Actualizar Precio</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Actualizar Precio</DialogTitle>
                                    <DialogDescription>
                                      Ingresa el nuevo precio para este producto.
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="dialog-price">Nuevo precio</Label>
                                      <Input 
                                        id="dialog-price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        defaultValue={product.price}
                                      />
                                    </div>
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      onClick={() => {
                                        const priceInput = document.getElementById("dialog-price") as HTMLInputElement;
                                        const newPrice = parseFloat(priceInput.value);
                                        if (newPrice > 0) {
                                          handleUpdatePrice(newPrice);
                                        }
                                      }}
                                      disabled={saving}
                                    >
                                      {saving ? (
                                        <>
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          Actualizando...
                                        </>
                                      ) : (
                                        <>
                                          <Save className="h-4 w-4 mr-2" />
                                          Guardar
                                        </>
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                          
                          {/* Stock */}
                          <div>
                            <Label htmlFor="stock">Stock</Label>
                            <div className="flex gap-2 mt-1.5">
                              <Input 
                                id="stock"
                                type="number"
                                min="0"
                                step="1"
                                defaultValue={product.stock}
                                className="w-full"
                              />
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button>Actualizar Stock</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Actualizar Stock</DialogTitle>
                                    <DialogDescription>
                                      Ingresa la nueva cantidad de stock para este producto.
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="dialog-stock">Nueva cantidad</Label>
                                      <Input 
                                        id="dialog-stock"
                                        type="number"
                                        min="0"
                                        step="1"
                                        defaultValue={product.stock}
                                      />
                                    </div>
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      onClick={() => {
                                        const stockInput = document.getElementById("dialog-stock") as HTMLInputElement;
                                        const newStock = parseInt(stockInput.value);
                                        if (newStock >= 0) {
                                          handleUpdateStock(newStock);
                                        }
                                      }}
                                      disabled={saving}
                                    >
                                      {saving ? (
                                        <>
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          Actualizando...
                                        </>
                                      ) : (
                                        <>
                                          <Save className="h-4 w-4 mr-2" />
                                          Guardar
                                        </>
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                          
                          {/* GTIN */}
                          <div>
                            <Label htmlFor="gtin">Código GTIN / EAN / UPC</Label>
                            <div className="flex gap-2 mt-1.5">
                              <Input 
                                id="gtin"
                                type="text"
                                defaultValue={product.gtin || ""}
                                placeholder="Ej: 7898192628317"
                                className="w-full"
                              />
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button>Actualizar GTIN</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Actualizar Código GTIN</DialogTitle>
                                    <DialogDescription>
                                      Ingresa el código GTIN, EAN o UPC para este producto.
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="dialog-gtin">Código GTIN</Label>
                                      <Input 
                                        id="dialog-gtin"
                                        type="text"
                                        defaultValue={product.gtin || ""}
                                        placeholder="Ej: 7898192628317"
                                      />
                                    </div>
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      onClick={() => {
                                        const gtinInput = document.getElementById("dialog-gtin") as HTMLInputElement;
                                        handleUpdateGtin(gtinInput.value);
                                      }}
                                      disabled={saving}
                                    >
                                      {saving ? (
                                        <>
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          Actualizando...
                                        </>
                                      ) : (
                                        <>
                                          <Save className="h-4 w-4 mr-2" />
                                          Guardar
                                        </>
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                          
                          {/* Manufacturing Time */}
                          <div>
                            <Label htmlFor="manufacturing-time">
                              Tiempo de fabricación (días)
                              {!manufacturingTimeSupported && (
                                <Badge 
                                  variant="outline" 
                                  className="ml-2 bg-amber-100 text-amber-700 border-amber-200"
                                >
                                  No disponible para esta categoría
                                </Badge>
                              )}
                            </Label>
                            <div className="flex gap-2 mt-1.5">
                              <Input 
                                id="manufacturing-time"
                                type="number"
                                min="0"
                                step="1"
                                defaultValue={product.manufacturing_time || 0}
                                className="w-full"
                                disabled={!manufacturingTimeSupported}
                              />
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button disabled={!manufacturingTimeSupported}>
                                    Actualizar Tiempo
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Actualizar Tiempo de Fabricación</DialogTitle>
                                    <DialogDescription>
                                      Ingresa los días que toma fabricar este producto.
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="dialog-manufacturing-time">Días de fabricación</Label>
                                      <Input 
                                        id="dialog-manufacturing-time"
                                        type="number"
                                        min="0"
                                        step="1"
                                        defaultValue={product.manufacturing_time || 0}
                                      />
                                    </div>
                                  </div>
                                  
                                  <DialogFooter>
                                    <Button
                                      type="submit"
                                      onClick={() => {
                                        const timeInput = document.getElementById("dialog-manufacturing-time") as HTMLInputElement;
                                        const days = parseInt(timeInput.value);
                                        if (days >= 0) {
                                          handleUpdateManufacturingTime(days);
                                        }
                                      }}
                                      disabled={saving}
                                    >
                                      {saving ? (
                                        <>
                                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                          Actualizando...
                                        </>
                                      ) : (
                                        <>
                                          <Save className="h-4 w-4 mr-2" />
                                          Guardar
                                        </>
                                      )}
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="variations" className="p-6">
                        {product.variations && product.variations.length > 0 ? (
                          <div className="space-y-6">
                            {product.variations.map((variation, index) => (
                              <Card key={variation.id} className="overflow-hidden">
                                <CardHeader className="bg-muted/50 p-4">
                                  <CardTitle className="text-lg">
                                    Variación {index + 1} - {variation.attribute_combinations.map(attr => attr.value_name).join(" / ")}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 space-y-4">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor={`variation-${variation.id}-price`}>
                                        Precio
                                      </Label>
                                      <Input 
                                        id={`variation-${variation.id}-price`}
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        defaultValue={variation.price}
                                        className="mt-1.5"
                                        disabled
                                      />
                                    </div>
                                    
                                    <div>
                                      <Label htmlFor={`variation-${variation.id}-stock`}>
                                        Stock
                                      </Label>
                                      <Input 
                                        id={`variation-${variation.id}-stock`}
                                        type="number"
                                        min="0"
                                        step="1"
                                        defaultValue={variation.available_quantity}
                                        className="mt-1.5"
                                        disabled
                                      />
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <Label htmlFor={`variation-${variation.id}-gtin`}>
                                      Código GTIN / EAN / UPC
                                    </Label>
                                    <div className="flex gap-2 mt-1.5">
                                      <Input 
                                        id={`variation-${variation.id}-gtin`}
                                        type="text"
                                        defaultValue={variation.gtin || ""}
                                        placeholder="Ej: 7898192628317"
                                        className="w-full"
                                      />
                                      <Dialog>
                                        <DialogTrigger asChild>
                                          <Button>Actualizar GTIN</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle>Actualizar Código GTIN</DialogTitle>
                                            <DialogDescription>
                                              Ingresa el código GTIN, EAN o UPC para esta variación.
                                            </DialogDescription>
                                          </DialogHeader>
                                          
                                          <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                              <Label htmlFor={`dialog-variation-${variation.id}-gtin`}>
                                                Código GTIN
                                              </Label>
                                              <Input 
                                                id={`dialog-variation-${variation.id}-gtin`}
                                                type="text"
                                                defaultValue={variation.gtin || ""}
                                                placeholder="Ej: 7898192628317"
                                              />
                                            </div>
                                          </div>
                                          
                                          <DialogFooter>
                                            <Button
                                              type="submit"
                                              onClick={() => {
                                                const gtinInput = document.getElementById(`dialog-variation-${variation.id}-gtin`) as HTMLInputElement;
                                                handleUpdateVariationGtin(variation.id, gtinInput.value);
                                              }}
                                              disabled={saving}
                                            >
                                              {saving ? (
                                                <>
                                                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                  Actualizando...
                                                </>
                                              ) : (
                                                <>
                                                  <Save className="h-4 w-4 mr-2" />
                                                  Guardar
                                                </>
                                              )}
                                            </Button>
                                          </DialogFooter>
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              Este producto no tiene variaciones.
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
