import { collection, configure, setDefaultConfiguration } from "typesense-ts";
import { uid } from "../providers/products";

// Configure and set as default
setDefaultConfiguration(configure({
  apiKey: import.meta.env.TYPESENSE_API_KEY || "xyz",
  nodes: [
    { url: import.meta.env.TYPESENSE_BASE_URL || "http://localhost:8108" },
    // Or specify host/port/protocol separately:
    { host: import.meta.env.TYPESENSE_HOST || "localhost", port: import.meta.env.TYPESENSE_PORT || 8108, protocol: import.meta.env.TYPESENSE_PROTOCOL || "https", path: "/typesense" },
  ],
  // Optional parameters
  retryIntervalSeconds: 2,
  numRetries: 3,
  healthcheckIntervalSeconds: 30,
//   additionalHeaders: { "Custom-Header": "value" },
}));

// Define a type-safe collection schema
const productsSchema = collection({
  name: "products",
  fields: [
    { name: "id", type: "string" },
    { name: "name", type: "string" },
    { name: "category", type: "string" },
    { name: "unit", type: "string" },
    { name: "cost", type: "float" },
    { name: "sell", type: "float" },
    { name: "stock", type: "int32" },
  ],
});

// Register the collection globally for type safety
declare module "typesense-ts" {
  interface Collections {
    products: typeof productsSchema.schema;
  }
}

export class ProductsService {
  public schema = {
    name: "products",
    fields: [
      { name: "id", type: "string" },
      { name: "name", type: "string" },
      { name: "category", type: "string" },
      { name: "unit", type: "string" },
      { name: "cost", type: "float" },
      { name: "sell", type: "float" },
      { name: "stock", type: "int32" },
    ],
  };

  async fetch() {
    return (await productsSchema.search({
      q: "*",
      query_by: "name",
      per_page: 100,
    })).hits.map((h: any) => h.document);
  }

  async search(query: string) {
    return await productsSchema.search({ 
        q: query,
        query_by: "name",
        per_page: 100,
    }).then((res) => res.hits.map((h: any) => h.document));
  }

  async delete(id: string) {
    return await productsSchema.documents.delete({
      documentId: id,
    });
  }

  async deleteAll() {
    return await productsSchema.delete({
      q: "*",
      query_by: "name",
    });
  }

  async get(id: string) {
    return await productsSchema.documents.retrieve(id);
  }

  async exists(id: string) {
    return await productsSchema.documents.retrieve(id).then(() => true).catch(() => false);
  }

  async update(id: string, data: any) {
    return await productsSchema.documents.update(data, {
        documentId: id,
        fliter_by: 'id',
    });
  }

  async create(data: any) {
    data.id = uid();
    return await productsSchema.documents.create(data);
  }

  async import (data: any) {
    return await productsSchema.documents.import(data);
  }
}
