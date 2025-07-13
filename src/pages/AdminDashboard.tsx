import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { products, suppliers, getCheapestPrices } from '@/data/mockData';
import { Package, Users, DollarSign } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const cheapestPrices = getCheapestPrices();
  const totalProducts = products.length;
  const totalSuppliers = suppliers.length;
  const cheapestProduct = cheapestPrices.reduce((prev, current) => 
    prev.cheapestPrice < current.cheapestPrice ? prev : current
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Administrativo</h1>
        <p className="text-muted-foreground mt-2">Visão geral da plataforma de cotações</p>
      </div>

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <CardTitle className="text-sm font-medium">Produto Mais Barato</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {cheapestProduct.cheapestPrice}</div>
            <p className="text-xs text-muted-foreground">
              {cheapestProduct.productName} - {cheapestProduct.supplierName}
            </p>
          </CardContent>
        </Card>
      </div>

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