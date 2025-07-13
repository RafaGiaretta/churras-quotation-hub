// Dados simulados para a aplicação
export interface Product {
  id: string;
  name: string;
  category: string;
  suppliers: {
    supplierId: string;
    supplierName: string;
    price: number;
  }[];
}

export interface PriceHistory {
  date: string;
  price: number;
}

export interface Supplier {
  id: string;
  name: string;
}

export const suppliers: Supplier[] = [
  { id: "A", name: "Fornecedor A" },
  { id: "B", name: "Fornecedor B" },
  { id: "C", name: "Fornecedor C" },
];

export const products: Product[] = [
  {
    id: "picanha",
    name: "Picanha",
    category: "Carnes Nobres",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 80 },
      { supplierId: "B", supplierName: "Fornecedor B", price: 75 },
    ],
  },
  {
    id: "linguica",
    name: "Linguiça Toscana",
    category: "Embutidos",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 25 },
      { supplierId: "C", supplierName: "Fornecedor C", price: 22 },
    ],
  },
  {
    id: "maminha",
    name: "Maminha",
    category: "Carnes Nobres",
    suppliers: [
      { supplierId: "B", supplierName: "Fornecedor B", price: 60 },
      { supplierId: "C", supplierName: "Fornecedor C", price: 59 },
    ],
  },
];

export const picanhaHistory: PriceHistory[] = [
  { date: "01/06", price: 85 },
  { date: "15/06", price: 82 },
  { date: "01/07", price: 80 },
  { date: "10/07", price: 78 },
  { date: "13/07", price: 75 },
];

// Função para obter produtos por fornecedor
export const getProductsBySupplier = (supplierId: string) => {
  return products
    .map(product => {
      const supplierData = product.suppliers.find(s => s.supplierId === supplierId);
      if (supplierData) {
        return {
          ...product,
          price: supplierData.price,
        };
      }
      return null;
    })
    .filter(Boolean);
};

// Função para obter o menor preço por produto
export const getCheapestPrices = () => {
  return products.map(product => {
    const cheapestSupplier = product.suppliers.reduce((prev, current) => 
      prev.price < current.price ? prev : current
    );
    return {
      productName: product.name,
      cheapestPrice: cheapestSupplier.price,
      supplierName: cheapestSupplier.supplierName,
    };
  });
};