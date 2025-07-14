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
  { id: "D", name: "Fornecedor D" },
  { id: "E", name: "Fornecedor E" },
];

export const products: Product[] = [
  {
    id: "picanha",
    name: "Picanha",
    category: "Carnes Nobres",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 80 },
      { supplierId: "B", supplierName: "Fornecedor B", price: 75 },
      { supplierId: "D", supplierName: "Fornecedor D", price: 82 },
    ],
  },
  {
    id: "linguica",
    name: "Linguiça Toscana",
    category: "Embutidos",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 25 },
      { supplierId: "C", supplierName: "Fornecedor C", price: 22 },
      { supplierId: "E", supplierName: "Fornecedor E", price: 24 },
    ],
  },
  {
    id: "maminha",
    name: "Maminha",
    category: "Carnes Nobres",
    suppliers: [
      { supplierId: "B", supplierName: "Fornecedor B", price: 60 },
      { supplierId: "C", supplierName: "Fornecedor C", price: 59 },
      { supplierId: "D", supplierName: "Fornecedor D", price: 62 },
    ],
  },
  {
    id: "alcatra",
    name: "Alcatra",
    category: "Carnes Nobres",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 45 },
      { supplierId: "B", supplierName: "Fornecedor B", price: 42 },
      { supplierId: "E", supplierName: "Fornecedor E", price: 48 },
    ],
  },
  {
    id: "fraldinha",
    name: "Fraldinha",
    category: "Carnes Nobres",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 35 },
      { supplierId: "C", supplierName: "Fornecedor C", price: 32 },
      { supplierId: "D", supplierName: "Fornecedor D", price: 36 },
    ],
  },
  {
    id: "costela",
    name: "Costela Bovina",
    category: "Carnes Especiais",
    suppliers: [
      { supplierId: "B", supplierName: "Fornecedor B", price: 28 },
      { supplierId: "C", supplierName: "Fornecedor C", price: 26 },
      { supplierId: "E", supplierName: "Fornecedor E", price: 30 },
    ],
  },
  {
    id: "linguica_calabresa",
    name: "Linguiça Calabresa",
    category: "Embutidos",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 18 },
      { supplierId: "B", supplierName: "Fornecedor B", price: 16 },
      { supplierId: "D", supplierName: "Fornecedor D", price: 19 },
    ],
  },
  {
    id: "chorizo",
    name: "Chorizo",
    category: "Embutidos",
    suppliers: [
      { supplierId: "C", supplierName: "Fornecedor C", price: 32 },
      { supplierId: "D", supplierName: "Fornecedor D", price: 35 },
      { supplierId: "E", supplierName: "Fornecedor E", price: 30 },
    ],
  },
  {
    id: "coxa_frango",
    name: "Coxa de Frango",
    category: "Aves",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 12 },
      { supplierId: "B", supplierName: "Fornecedor B", price: 11 },
      { supplierId: "C", supplierName: "Fornecedor C", price: 13 },
    ],
  },
  {
    id: "asa_frango",
    name: "Asa de Frango",
    category: "Aves",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 15 },
      { supplierId: "D", supplierName: "Fornecedor D", price: 14 },
      { supplierId: "E", supplierName: "Fornecedor E", price: 16 },
    ],
  },
  {
    id: "pao_alho",
    name: "Pão de Alho",
    category: "Acompanhamentos",
    suppliers: [
      { supplierId: "B", supplierName: "Fornecedor B", price: 8 },
      { supplierId: "C", supplierName: "Fornecedor C", price: 7 },
      { supplierId: "E", supplierName: "Fornecedor E", price: 9 },
    ],
  },
  {
    id: "farofa",
    name: "Farofa Especial",
    category: "Acompanhamentos",
    suppliers: [
      { supplierId: "A", supplierName: "Fornecedor A", price: 12 },
      { supplierId: "C", supplierName: "Fornecedor C", price: 10 },
      { supplierId: "D", supplierName: "Fornecedor D", price: 13 },
    ],
  },
];

export const priceHistories: { [key: string]: PriceHistory[] } = {
  picanha: [
    { date: "01/06", price: 85 },
    { date: "15/06", price: 82 },
    { date: "01/07", price: 80 },
    { date: "10/07", price: 78 },
    { date: "13/07", price: 75 },
  ],
  linguica: [
    { date: "01/06", price: 28 },
    { date: "15/06", price: 26 },
    { date: "01/07", price: 25 },
    { date: "10/07", price: 23 },
    { date: "13/07", price: 22 },
  ],
  maminha: [
    { date: "01/06", price: 65 },
    { date: "15/06", price: 62 },
    { date: "01/07", price: 61 },
    { date: "10/07", price: 60 },
    { date: "13/07", price: 59 },
  ],
  alcatra: [
    { date: "01/06", price: 48 },
    { date: "15/06", price: 46 },
    { date: "01/07", price: 45 },
    { date: "10/07", price: 43 },
    { date: "13/07", price: 42 },
  ],
  fraldinha: [
    { date: "01/06", price: 38 },
    { date: "15/06", price: 36 },
    { date: "01/07", price: 35 },
    { date: "10/07", price: 34 },
    { date: "13/07", price: 32 },
  ],
  costela: [
    { date: "01/06", price: 30 },
    { date: "15/06", price: 29 },
    { date: "01/07", price: 28 },
    { date: "10/07", price: 27 },
    { date: "13/07", price: 26 },
  ],
};

export const picanhaHistory = priceHistories.picanha;

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
      productId: product.id,
      productName: product.name,
      category: product.category,
      cheapestPrice: cheapestSupplier.price,
      supplierName: cheapestSupplier.supplierName,
      supplierId: cheapestSupplier.supplierId,
    };
  });
};

// Interface para itens de cotação
export interface QuotationItem {
  productId: string;
  productName: string;
  category: string;
  quantity: number;
  selectedSupplierId: string;
  selectedSupplierName: string;
  unitPrice: number;
  totalPrice: number;
}

// Função para obter categorias únicas
export const getCategories = () => {
  const categories = products.map(p => p.category);
  return [...new Set(categories)];
};