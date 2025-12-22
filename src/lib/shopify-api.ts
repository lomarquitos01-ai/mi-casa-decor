import { SHOPIFY_STOREFRONT_URL, SHOPIFY_CONFIG } from './shopify-config';
import { toast } from 'sonner';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    productType: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

export interface ProductsResponse {
  data: {
    products: {
      edges: ShopifyProduct[];
    };
  };
}

// GraphQL Queries
const PRODUCTS_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      productType
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Storefront API helper
export async function storefrontApiRequest<T>(query: string, variables: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_CONFIG.storefrontToken,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Pago requerido", {
      description: "El acceso a la API de Shopify requiere un plan de facturación activo.",
    });
    throw new Error('Payment required');
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Error de Shopify: ${data.errors.map((e: { message: string }) => e.message).join(', ')}`);
  }

  return data;
}

// Fetch products
export async function fetchProducts(first: number = 20, query?: string): Promise<ShopifyProduct[]> {
  const response = await storefrontApiRequest<ProductsResponse>(PRODUCTS_QUERY, {
    first,
    query: query || null,
  });
  return response.data.products.edges;
}

// Fetch single product by handle
export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct['node'] | null> {
  const response = await storefrontApiRequest<{ data: { productByHandle: ShopifyProduct['node'] | null } }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return response.data.productByHandle;
}

// Create checkout
export async function createStorefrontCheckout(items: Array<{ variantId: string; quantity: number }>): Promise<string> {
  const lines = items.map(item => ({
    quantity: item.quantity,
    merchandiseId: item.variantId,
  }));

  const response = await storefrontApiRequest<{
    data: {
      cartCreate: {
        cart: { checkoutUrl: string } | null;
        userErrors: Array<{ message: string }>;
      };
    };
  }>(CART_CREATE_MUTATION, {
    input: { lines },
  });

  if (response.data.cartCreate.userErrors.length > 0) {
    throw new Error(`Error al crear carrito: ${response.data.cartCreate.userErrors.map(e => e.message).join(', ')}`);
  }

  const cart = response.data.cartCreate.cart;

  if (!cart?.checkoutUrl) {
    throw new Error('No se pudo obtener la URL de checkout');
  }

  const url = new URL(cart.checkoutUrl);
  url.searchParams.set('channel', 'online_store');
  return url.toString();
}

// Format price
export function formatPrice(amount: string, currencyCode: string): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount));
}
