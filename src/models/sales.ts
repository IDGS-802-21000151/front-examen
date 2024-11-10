export type Sale = {
    id: number;
    idproducto: number;
    fechacompra: string;
    title: string;
    description: string;
    category: string;
    price: string;
    discount_percentage: string;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: string;
    dimensions: {
      depth: number;
      width: number;
      height: number;
    };
    warranty_information: string;
    shipping_information: string;
    availability_status: string;
    return_policy: string;
    minimum_order_quantity: number;
    meta: {
      qrCode: string;
      barcode: string;
      createdAt: string;
      updatedAt: string;
    };
    images: string[];
    thumbnail: string;
  };