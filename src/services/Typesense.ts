import typesense from "../config/typesense";
import { debounce } from "lodash";
import { uid } from "../providers/products";

export class TypesenseService<T extends { id?: string } = any> {
  private collection: string;
  private createQueue: Map<string, T> = new Map();
  public schema?: any;

  constructor(collection: string) {
    this.collection = collection;
  }

  /** ✅ Initialize collection if it doesn’t exist */
  async init(): Promise<void> {
    if (!(await this.collectionExists(this.collection))) {
      if (!this.schema) throw new Error("Schema is not defined");
      await this.createCollection(this.schema);
    }
  }

  /** ✅ List all collections */
  async allCollections(): Promise<any[]> {
    const res = await typesense.get("/");
    return res.data;
  }

  /** ✅ Check if collection exists */
  async collectionExists(collection: string): Promise<boolean> {
    const res = await typesense.get("/");
    return res.data.some((c: any) => c.name === collection);
  }

  /** ✅ Get collection schema */
  async getCollection(): Promise<any> {
    const res = await typesense.get(`/${this.collection}`);
    return res.data;
  }

  /** ✅ Create collection */
  async createCollection(schema: any): Promise<any> {
    const res = await typesense.post("/", schema);
    return res.data;
  }

  /** ✅ Update collection fields */
  async updateCollectionFields(fields: any): Promise<any> {
    const res = await typesense.patch(`/${this.collection}`, fields);
    return res.data;
  }

  /** ✅ Truncate collection (delete all docs) */
  async truncateCollection(): Promise<any> {
    return (
      await typesense.delete(`/${this.collection}/documents?truncate=true`)
    ).data;
  }

  /** ✅ Drop collection */
  async dropCollection(): Promise<any> {
    return (await typesense.delete(`/${this.collection}`)).data;
  }

  /** ✅ Count docs */
  async count(): Promise<number> {
    const res = await typesense.get(`/${this.collection}/documents/count`);
    return res.data.count;
  }

  /** ✅ Create document (immediate, not debounced) */
  async create(data: T): Promise<T> {
    const doc = { id: uid(), ...data };
    const res = await typesense.post(`/${this.collection}/documents`, doc);
    return res.data;
  }

  /** ✅ Create/Upsert a document safely */
  async upsert(data: T & { id: string }): Promise<T> {
    const res = await typesense.post(
      `/${this.collection}/documents/import?action=upsert`,
      JSON.stringify(data),
      { headers: { "Content-Type": "text/plain" } }
    );
    return res.data;
  }

  /** ✅ Search documents */
  async find(
    query?: string,
    queryBy: string = "",
    params: any = {}
  ): Promise<T[]> {
    const url = new URL(
      `${this.collection}/documents/search`,
      "http://localhost:8108/"
    );
    url.searchParams.set("q", query || "*");
    url.searchParams.set("query_by", queryBy);

    if (params.per_page) url.searchParams.set("per_page", params.per_page);
    if (params.page) url.searchParams.set("page", params.page);

    const res = await typesense.get(url.pathname + url.search);
    return res.data.hits.map((h: any) => h.document as T);
  }

  /** ✅ Read by ID */
  async findById(id: string): Promise<T> {
    const res = await typesense.get(`/${this.collection}/documents/${id}`);
    return res.data as T;
  }

  /** ✅ Get all docs */
  async getAll(): Promise<T[]> {
    const res = await typesense.get(`/${this.collection}/documents/search?q=*`);
    return res.data.hits.map((h: any) => h.document as T);
  }

  /** ✅ Update (direct) */
  async update(id: string, data: Partial<T>): Promise<T> {
    const res = await typesense.patch(
      `/${this.collection}/documents/${id}`,
      data
    );
    return res.data as T;
  }

  /** ✅ Bulk update (upsert all products at once) */
  async updateAll(datas: T[]): Promise<any> {
    try {
      const jsonl = datas.map((doc) => JSON.stringify(doc)).join("\n");
      const res = await typesense.post(
        `/${this.collection}/documents/import?action=upsert`,
        jsonl,
        { headers: { "Content-Type": "text/plain" } }
      );
      return res.data;
    } catch (err) {
      console.error("Bulk update failed:", err);
      return null;
    }
  }

  /** ✅ Delete */
  async remove(id: string): Promise<{ success: boolean }> {
    const res = await typesense.delete(`/${this.collection}/documents/${id}`);
    return { success: true, ...res.data };
  }

  // ------------------- Debounced CRUD -------------------

  /** ✅ Debounced fetchAll (returns all docs with debounce) */
  fetchAllDebounced = (() => {
    let resolver: ((value: T[]) => void) | null = null;

    const run = debounce(async () => {
      try {
        const res = await typesense.get(
          `/${this.collection}/documents/search?q=*`
        );
        const docs = res.data.hits.map((h: any) => h.document as T);

        if (resolver) {
          resolver(docs);
          resolver = null;
        }
      } catch (err) {
        console.error("Debounced fetchAll failed:", err);
        if (resolver) {
          resolver([]);
          resolver = null;
        }
      }
    }, 500);

    return (): Promise<T[]> =>
      new Promise<T[]>((resolve) => {
        resolver = resolve;
        run();
      });
  })();

  /** ✅ Debounced fetch (returns a proper Promise) */
  fetchDebounced = (() => {
    let resolver: ((value: T[]) => void) | null = null;

    const run = debounce(
      async (query?: string, queryBy: string = "", params: any = {}) => {
        try {
          const result = await this.find(query, queryBy, params);
          if (resolver) {
            resolver(result);
            resolver = null;
          }
        } catch (err) {
          console.error("Debounced fetch failed:", err);
          if (resolver) {
            resolver([] as T[]);
            resolver = null;
          }
        }
      },
      500
    );

    return (
      query?: string,
      queryBy: string = "",
      params: any = {}
    ): Promise<T[]> =>
      new Promise<T[]>((resolve) => {
        resolver = resolve;
        run(query, queryBy, params);
      });
  })();

  // ✅ Bulk create helper
  async createMany(docs: T[]): Promise<any> {
    const jsonl = docs.map((doc) => JSON.stringify(doc)).join("\n");
    const res = await typesense.post(
      `/${this.collection}/documents/import?action=create`,
      jsonl,
      { headers: { "Content-Type": "text/plain" } }
    );
    return res.data;
  }

  // ✅ Debounced batch create
  private processCreate = debounce(async () => {
    if (this.createQueue.size === 0) return;
    const docs = Array.from(this.createQueue.values());
    this.createQueue.clear();

    const jsonl = docs.map((doc) => JSON.stringify(doc)).join("\n");
    await typesense.post(
      `/${this.collection}/documents/import?action=upsert`,
      jsonl,
      { headers: { "Content-Type": "text/plain" } }
    );
  }, 500);

  // ✅ Add to queue (deduplicated by ID or fallback UID)
  queueCreate(data: T & { id: string }) {
    this.createQueue.set(data.id, data); // dedupe by id
    this.processCreate();
  }

  /** ✅ Debounced update */
  updateDebounced = debounce(
    async (id: string, data: Partial<T>): Promise<T | null> => {
      try {
        console.log("Debounced update:", id, data);
        const res = await typesense.patch(
          `/${this.collection}/documents/${id}`,
          data
        );
        return res.data as T;
      } catch (err) {
        console.error("Debounced update failed:", err);
        return null;
      }
    },
    500,
    { leading: false, trailing: true }
  );

  /** ✅ Debounced bulk update */
  updateAllDebounced = debounce(
    async (datas: T[]): Promise<any> => {
      try {
        const jsonl = datas.map((doc) => JSON.stringify(doc)).join("\n");
        const res = await typesense.post(
          `/${this.collection}/documents/import?action=upsert`,
          jsonl,
          { headers: { "Content-Type": "text/plain" } }
        );
        return res.data;
      } catch (err) {
        console.error("Bulk update failed:", err);
        return null;
      }
    },
    500,
    { leading: false, trailing: true }
  );

  /** ✅ Debounced delete */
  removeDebounced = debounce(
    async (id: string): Promise<{ success: boolean }> => {
      try {
        const res = await typesense.delete(
          `/${this.collection}/documents/${id}`
        );
        return { success: true, ...res.data };
      } catch (err) {
        console.error("Debounced delete failed:", err);
        return { success: false };
      }
    },
    500,
    { leading: false, trailing: true }
  );
}
