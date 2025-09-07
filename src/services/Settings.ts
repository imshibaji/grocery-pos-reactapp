import { TypesenseService } from "./Typesense";

export class SettingsService extends TypesenseService {
  public schema = {
    name: "settings",
    fields: [
      { name: "id", type: "string" },
      { name: "shopName", type: "string" },
      { name: "address", type: "string" },
      { name: "whatsapp", type: "string" },
      { name: "gst", type: "bool" },
      { name: "gstPercent", type: "float" },
      { name: "deliveryCharge", type: "bool" },
      { name: "delivery", type: "float" },
      { name: "currency", type: "string" },
      { name: "currencySymbol", type: "string" },
      { name: "timezone", type: "string" },
    ],
  };

  constructor() {
    super("settings");
  }
}
