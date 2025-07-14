import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { products, suppliers, getCategories } from '@/data/mockData';
import { Package, Search, Plus, Edit, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminProducts: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  
  const categories = getCategories();
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const viewProductDetails = (product: any) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const getProductStats = (product: any) => {
    const prices = product.suppliers.map((s: any) => s.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((sum: number, price: number) => sum + price, 0) / prices.length;
    
    return { minPrice, maxPrice, avgPrice };
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Gerenciamento de Produtos</h1>
        <p className="text-muted-foreground mt-2">Visualize e gerencie todos os produtos da plataforma</p>
      </div>

      {/* Estatísticas Gerais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
            <p className="text-xs text-muted-foreground">
              Produtos cadastrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground">
              Categorias ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fornecedores</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{suppliers.length}</div>
            <p className="text-xs text-muted-foreground">
              Fornecedores ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {(products.reduce((sum, p) => sum + Math.min(...p.suppliers.map(s => s.price)), 0) / products.length).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Baseado nos menores preços
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Filtre os produtos por nome ou categoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar produto</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Digite o nome do produto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-64">
              <Label htmlFor="category">Categoria</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Produtos */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos ({filteredProducts.length})</CardTitle>
          <CardDescription>
            Lista completa de produtos disponíveis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum produto encontrado com os filtros aplicados.
              </div>
            ) : (
              filteredProducts.map((product) => {
                const stats = getProductStats(product);
                return (
                  <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{product.category}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {product.suppliers.length} fornecedor{product.suppliers.length !== 1 ? 'es' : ''}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">
                          Menor: R$ {stats.minPrice.toFixed(2)}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Média: R$ {stats.avgPrice.toFixed(2)}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => viewProductDetails(product)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Ver Detalhes
                      </Button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialog de Detalhes do Produto */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>
              Detalhes completos do produto e fornecedores
            </DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Categoria</Label>
                  <div className="mt-1">
                    <Badge variant="secondary">{selectedProduct.category}</Badge>
                  </div>
                </div>
                <div>
                  <Label>Número de Fornecedores</Label>
                  <div className="mt-1 text-lg font-semibold">
                    {selectedProduct.suppliers.length}
                  </div>
                </div>
              </div>

              <div>
                <Label>Fornecedores e Preços</Label>
                <div className="mt-2 overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">Fornecedor</th>
                        <th className="text-right py-2">Preço</th>
                        <th className="text-center py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.suppliers.map((supplier: any, index: number) => {
                        const isLowest = supplier.price === Math.min(...selectedProduct.suppliers.map((s: any) => s.price));
                        return (
                          <tr key={index} className="border-b">
                            <td className="py-3 font-medium">{supplier.supplierName}</td>
                            <td className="py-3 text-right">
                              <span className={`font-semibold ${isLowest ? 'text-green-600' : 'text-foreground'}`}>
                                R$ {supplier.price.toFixed(2)}
                              </span>
                            </td>
                            <td className="py-3 text-center">
                              {isLowest ? (
                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                  Melhor Preço
                                </Badge>
                              ) : (
                                <Badge variant="outline">Disponível</Badge>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    R$ {Math.min(...selectedProduct.suppliers.map((s: any) => s.price)).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Menor Preço</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    R$ {(selectedProduct.suppliers.reduce((sum: number, s: any) => sum + s.price, 0) / selectedProduct.suppliers.length).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Preço Médio</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    R$ {Math.max(...selectedProduct.suppliers.map((s: any) => s.price)).toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">Maior Preço</div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;