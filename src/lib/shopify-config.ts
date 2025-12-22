// Shopify Storefront API Configuration
export const SHOPIFY_CONFIG = {
  storeDomain: 'lovable-project-ovet7.myshopify.com',
  storefrontToken: '53c3d85e6e6ce9b85b03110c701361d1',
  apiVersion: '2025-07',
} as const;

export const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_CONFIG.storeDomain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;
