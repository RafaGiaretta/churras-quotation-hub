import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { products, QuotationItem } from '@/data/mockData';
import { ShoppingCart, Plus, Trash2, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminQuotation: React.FC = () => {
  const { toast } = useToast();
  const [quotationItems, setQuotationItems] = useState<QuotationItem[]>([]);
  const [showReport, setShowReport] = useState(false);

  const addToQuotation = (productId: string, supplierId: string) => {
    const product = products.find(p => p.id === productId);
    const supplier = product?.suppliers.find(s => s.supplierId === supplierId);
    
    if (product && supplier) {
      const existingItem = quotationItems.find(item => 
        item.productId === productId && item.selectedSupplierId === supplierId
      );
      
      if (existingItem) {
        toast({
          title: "Produto já adicionado",
          description: "Este produto com este fornecedor já está na cotação.",
          variant: "destructive"
        });
        return;
      }

      const newItem: QuotationItem = {
        productId: product.id,
        productName: product.name,
        category: product.category,
        quantity: 1,
        selectedSupplierId: supplier.supplierId,
        selectedSupplierName: supplier.supplierName,
        unitPrice: supplier.price,
        totalPrice: supplier.price
      };

      setQuotationItems([...quotationItems, newItem]);
      toast({
        title: "Produto adicionado",
        description: `${product.name} foi adicionado à cotação.`,
      });
    }
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) return;
    
    const updatedItems = [...quotationItems];
    updatedItems[index].quantity = quantity;
    updatedItems[index].totalPrice = updatedItems[index].unitPrice * quantity;
    setQuotationItems(updatedItems);
  };

  const removeFromQuotation = (index: number) => {
    const updatedItems = quotationItems.filter((_, i) => i !== index);
    setQuotationItems(updatedItems);
    toast({
      title: "Produto removido",
      description: "Produto removido da cotação.",
    });
  };

  const generateBestQuotation = () => {
    const bestItems: QuotationItem[] = products.map(product => {
      const cheapestSupplier = product.suppliers.reduce((prev, current) => 
        prev.price < current.price ? prev : current
      );
      
      return {
        productId: product.id,
        productName: product.name,
        category: product.category,
        quantity: 1,
        selectedSupplierId: cheapestSupplier.supplierId,
        selectedSupplierName: cheapestSupplier.supplierName,
        unitPrice: cheapestSupplier.price,
        totalPrice: cheapestSupplier.price
      };
    });
    
    setQuotationItems(bestItems);
    toast({
      title: "Cotação automática gerada",
      description: "Foram selecionados os melhores preços para todos os produtos.",
    });
  };

  const totalQuotation = quotationItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Cotação de Produtos</h1>
          <p className="text-muted-foreground mt-2">Compare preços entre fornecedores e gere cotações</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={generateBestQuotation} variant="outline">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Gerar Cotação Automática
          </Button>
          {quotationItems.length > 0 && (
            <Dialog open={showReport} onOpenChange={setShowReport}>
              <DialogTrigger asChild>
                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Relatório da Cotação
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Relatório de Cotação</DialogTitle>
                  <DialogDescription>
                    Resumo completo dos produtos cotados
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Produto</th>
                          <th className="text-left py-2">Categoria</th>
                          <th className="text-center py-2">Qtd</th>
                          <th className="text-left py-2">Fornecedor</th>
                          <th className="text-right py-2">Preço Unit.</th>
                          <th className="text-right py-2">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotationItems.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 font-medium">{item.productName}</td>
                            <td className="py-3">
                              <Badge variant="secondary">{item.category}</Badge>
                            </td>
                            <td className="py-3 text-center">{item.quantity}</td>
                            <td className="py-3">{item.selectedSupplierName}</td>
                            <td className="py-3 text-right">R$ {item.unitPrice.toFixed(2)}</td>
                            <td className="py-3 text-right font-semibold">R$ {item.totalPrice.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="border-t-2">
                          <td colSpan={5} className="py-4 text-right font-bold text-lg">
                            Total da Cotação:
                          </td>
                          <td className="py-4 text-right font-bold text-lg text-primary">
                            R$ {totalQuotation.toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="flex justify-end">
                    <Button onClick={() => window.print()}>
                      Imprimir Relatório
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Carrinho de Cotação */}
      {quotationItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Itens da Cotação ({quotationItems.length})</CardTitle>
            <CardDescription>
              Total: R$ {totalQuotation.toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quotationItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">{item.selectedSupplierName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(index, parseInt(e.target.value) || 1)}
                        className="w-20"
                      />
                      <span className="text-sm text-muted-foreground">x R$ {item.unitPrice}</span>
                    </div>
                    <div className="font-semibold min-w-20 text-right">
                      R$ {item.totalPrice.toFixed(2)}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromQuotation(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
                            <div className="flex gap-2 justify-center">
                              {isLowest && (
                                <Badge className="bg-green-100 text-green-800 border-green-300">
                                  Melhor Preço
                                </Badge>
                              )}
                              <Button
                                size="sm"
                                variant={isLowest ? "default" : "outline"}
                                onClick={() => addToQuotation(product.id, supplier.supplierId)}
                              >
                                <Plus className="w-4 h-4 mr-1" />
                                Adicionar
                              </Button>
                            </div>
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