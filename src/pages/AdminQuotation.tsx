import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/mockData';

const AdminQuotation: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cotação de Produtos</h1>
        <p className="text-muted-foreground mt-2">Compare preços entre fornecedores</p>
      </div>

      <div className="space-y-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription className="mt-1">
                    <Badge variant="secondary">{product.category}</Badge>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Menor Preço</p>
                  <p className="text-2xl font-bold text-green-600">
                    R$ {Math.min(...product.suppliers.map(s => s.price))}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Fornecedor</th>
                      <th className="text-right py-2">Preço</th>
                      <th className="text-center py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.suppliers.map((supplier, index) => {
                      const isLowest = supplier.price === Math.min(...product.suppliers.map(s => s.price));
                      return (
                        <tr key={index} className="border-b">
                          <td className="py-3 font-medium">{supplier.supplierName}</td>
                          <td className="py-3 text-right">
                            <span className={`font-semibold ${isLowest ? 'text-green-600' : 'text-foreground'}`}>
                              R$ {supplier.price}
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            {isLowest ? (
                              <Badge className="bg-green-100 text-green-800 border-green-300">
                                Melhor Preço
                              </Badge>
                            ) : (
                              <Badge variant="outline">
                                Comparar
                              </Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminQuotation;