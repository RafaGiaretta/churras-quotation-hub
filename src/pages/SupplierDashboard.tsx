import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { getProductsBySupplier, suppliers } from '@/data/mockData';
import { Edit3, Plus, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SupplierDashboard: React.FC = () => {
  const { currentSupplier } = useAuth();
  const { toast } = useToast();
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');

  const supplierName = suppliers.find(s => s.id === currentSupplier)?.name || 'Fornecedor';
  const supplierProducts = getProductsBySupplier(currentSupplier || 'A');

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
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A adição de novos produtos estará disponível em breve.",
      variant: "default",
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meus Produtos</h1>
          <p className="text-muted-foreground mt-2">Bem-vindo, {supplierName}</p>
        </div>
        <Button onClick={handleAddProduct} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Produto
        </Button>
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
                ? (supplierProducts.reduce((sum, p) => sum + (p as any).price, 0) / supplierProducts.length).toFixed(0)
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
        
        {supplierProducts.map((product: any) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription className="mt-1">
                    <Badge variant="secondary">{product.category}</Badge>
                  </CardDescription>
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
              <Button onClick={handleAddProduct} className="mt-4">
                Adicionar Primeiro Produto
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SupplierDashboard;