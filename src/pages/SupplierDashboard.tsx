import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/AuthContext';
import { getProductsBySupplier, suppliers, products } from '@/data/mockData';
import { Edit3, Plus, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SupplierProduct {
  id: string;
  name: string;
  category: string;
  price: number;
}

const SupplierDashboard: React.FC = () => {
  const { currentSupplier } = useAuth();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');
  
  // Converte os produtos do fornecedor para o tipo simplificado
  const [supplierProducts, setSupplierProducts] = useState<SupplierProduct[]>(() => {
    return getProductsBySupplier(currentSupplier || 'A').map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: (p as any).price
    }));
  });
  
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: ''
  });

  const supplierName = suppliers.find(s => s.id === currentSupplier)?.name || 'Fornecedor';

  const categories = ['Carnes Nobres', 'Embutidos', 'Aves', 'Suínos', 'Acompanhamentos'];

  const handleEdit = (productId: string, currentPrice: number) => {
    setEditingProduct(productId);
    setEditPrice(currentPrice.toString());
  };

  const handleSave = () => {
    toast({
      title: "Preço atualizado!",
      description: "O novo preço foi salvo com sucesso.",
    });
    setEditingProduct(null);
    setEditPrice('');
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setEditPrice('');
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const productToAdd: SupplierProduct = {
      id: `new-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price),
    };

    setSupplierProducts(prev => [...prev, productToAdd]);
    setNewProduct({ name: '', category: '', price: '' });
    setIsAddingProduct(false);
    
    toast({
      title: "Produto adicionado!",
      description: `${newProduct.name} foi adicionado com sucesso.`,
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Produtos</h1>
          <p className="text-muted-foreground mt-2">Bem-vindo, {supplierName}</p>
        </div>
        <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Produto
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
              <DialogDescription>
                Preencha as informações do novo produto para adicionar ao seu catálogo.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nome do Produto</Label>
                <Input
                  id="name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Contrafilé"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categoria</Label>
                <Select
                  value={newProduct.category}
                  onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddProduct}>
                Adicionar Produto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Estatísticas do Fornecedor */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Cadastrados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{supplierProducts.length}</div>
            <p className="text-xs text-muted-foreground">
              Produtos ativos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Preço Médio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {supplierProducts.length > 0 
                ? (supplierProducts.reduce((sum, p) => sum + p.price, 0) / supplierProducts.length).toFixed(0)
                : '0'
              }
            </div>
            <p className="text-xs text-muted-foreground">
              Média dos seus produtos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Ativo</div>
            <p className="text-xs text-muted-foreground">
              Conta verificada
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Produtos */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Seus Produtos</h2>
        
        {supplierProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <div className="mt-1">
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Seu Preço</p>
                    {editingProduct === product.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(e.target.value)}
                          className="w-24"
                          placeholder="0"
                        />
                        <Button size="sm" onClick={handleSave}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <p className="text-xl font-bold text-primary">R$ {product.price}</p>
                    )}
                  </div>
                  {editingProduct !== product.id && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEdit(product.id, product.price)}
                    >
                      <Edit3 className="h-4 w-4" />
                      Editar Preço
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}

        {supplierProducts.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">Nenhum produto cadastrado ainda.</p>
              <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
                <DialogTrigger asChild>
                  <Button className="mt-4">
                    Adicionar Primeiro Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Produto</DialogTitle>
                    <DialogDescription>
                      Preencha as informações do novo produto para adicionar ao seu catálogo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name-empty">Nome do Produto</Label>
                      <Input
                        id="name-empty"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Ex: Contrafilé"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category-empty">Categoria</Label>
                      <Select
                        value={newProduct.category}
                        onValueChange={(value) => setNewProduct(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price-empty">Preço (R$)</Label>
                      <Input
                        id="price-empty"
                        type="number"
                        step="0.01"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingProduct(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleAddProduct}>
                      Adicionar Produto
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;