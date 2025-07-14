import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products, suppliers, getCheapestPrices, getCategories } from '@/data/mockData';
import { Package, Users, DollarSign, TrendingDown, TrendingUp, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const cheapestPrices = getCheapestPrices();
  const totalProducts = products.length;
  const totalSuppliers = suppliers.length;
  const categories = getCategories();
  const totalCategories = categories.length;
  
  const cheapestProduct = cheapestPrices.reduce((prev, current) => 
    prev.cheapestPrice < current.cheapestPrice ? prev : current
  );
  
  const expensiveProduct = cheapestPrices.reduce((prev, current) => 
    prev.cheapestPrice > current.cheapestPrice ? prev : current
  );
  
  const averagePrice = cheapestPrices.reduce((sum, item) => sum + item.cheapestPrice, 0) / cheapestPrices.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
        <p className="text-muted-foreground mt-2">Visão geral da plataforma de cotações</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Produtos cadastrados na plataforma
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Fornecedores</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSuppliers}</div>
            <p className="text-xs text-muted-foreground">
              Fornecedores ativos no sistema
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categorias</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              Categorias de produtos disponíveis
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produto Mais Barato</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {cheapestProduct.cheapestPrice}</div>
            <p className="text-xs text-muted-foreground">
              {cheapestProduct.productName} - {cheapestProduct.supplierName}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ações Rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Funcionalidades principais da plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate('/admin/quotation')} 
              className="h-20 flex flex-col items-center gap-2"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Nova Cotação</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/history')}
              className="h-20 flex flex-col items-center gap-2"
            >
              <TrendingUp className="h-6 w-6" />
              <span>Histórico de Preços</span>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/admin/products')}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Package className="h-6 w-6" />
              <span>Gerenciar Produtos</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Resumo por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo por Categoria</CardTitle>
          <CardDescription>
            Quantidade de produtos e preços médios por categoria
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map((category) => {
              const categoryProducts = cheapestPrices.filter(p => p.category === category);
              const avgPrice = categoryProducts.reduce((sum, p) => sum + p.cheapestPrice, 0) / categoryProducts.length;
              const cheapestInCategory = categoryProducts.reduce((prev, current) => 
                prev.cheapestPrice < current.cheapestPrice ? prev : current
              );
              
              return (
                <div key={category} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {categoryProducts.length} produto{categoryProducts.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">Menor: R$ {cheapestInCategory.cheapestPrice}</div>
                    <div className="text-xs text-muted-foreground">Média: R$ {avgPrice.toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Cotação Resumida */}
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Cotações</CardTitle>
          <CardDescription>
            Menor preço disponível por produto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Produto</th>
                  <th className="text-left py-2">Menor Preço</th>
                  <th className="text-left py-2">Fornecedor</th>
                </tr>
              </thead>
              <tbody>
                {cheapestPrices.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{item.productName}</td>
                    <td className="py-3 text-green-600 font-semibold">R$ {item.cheapestPrice}</td>
                    <td className="py-3 text-muted-foreground">{item.supplierName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;