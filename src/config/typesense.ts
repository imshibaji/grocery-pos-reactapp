import axios from "axios";

const typesense = axios.create({
  baseURL: `${import.meta.env.TYPESENSE_BASE_URL || "http://localhost:8108"}/collections`, // adjust to your Typesense host
  headers: {
    "X-TYPESENSE-API-KEY": import.meta.env.TYPESENSE_API_KEY || "xyz", // replace with your API key
    "Content-Type": "application/json",
  },
});

export default typesense;

