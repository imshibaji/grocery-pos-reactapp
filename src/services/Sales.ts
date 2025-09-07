// import { TypesenseService } from "./Typesense";

import { collection, configure, setDefaultConfiguration } from "typesense-ts";
import { uid } from "../providers/products";

// Configure and set as default
setDefaultConfiguration({
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
});

// Define a type-safe collection schema
const salesSchema = collection({
    name: "sales",
    fields: [
        { name: "id", type: "string" },
        { name: "name", type: "string" },
        { name: "category", type: "string" },
        { name: "unit", type: "string" },
        { name: "cost", type: "float" },
        { name: "sell", type: "float" },
        { name: "stock", type: "int32" },
        { name: "date", type: "string" },
        { name: "time", type: "string" },
        { name: "qty", type: "int32" },
        { name: "line", type: "float" },
        { name: "cost", type: "float" },
        { name: "gst", type: "float" },
        { name: "delivary", type: "float" },
        { name: "profit", type: "float" },
    ]
});

// Register the collection globally for type safety
declare module "typesense-ts" {
  interface Collections {
    sales: typeof salesSchema.schema;
  }
}

export class SalesService {
    public schema = {
        name: "sales",
        fields: [
            { name: "id", type: "string" },
            { name: "name", type: "string" },
            { name: "category", type: "string" },
            { name: "unit", type: "string" },
            { name: "cost", type: "float" },
            { name: "sell", type: "float" },
            { name: "stock", type: "int32" },
            { name: "date", type: "string" },
            { name: "time", type: "string" },
            { name: "qty", type: "int32" },
            { name: "line", type: "float" },
            { name: "cost", type: "float" },
            { name: "gst", type: "float" },
            { name: "delivary", type: "float" },
            { name: "profit", type: "float" },
        ]
    }
    constructor() {
        // super("sales");
    }
}