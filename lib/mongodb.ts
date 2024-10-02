import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  serverSelectionTimeoutMS: 30000, // Increase server selection timeout to 30 seconds
  socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
};

let client: MongoClient;
let isConnected = false; // Track connection status

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
    console.log("DB connected in development mode"); // Log when DB is connected
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri, options);
  console.log("DB connected in production mode"); // Log when DB is connected
}

// Export a function to connect to the database
export async function connectToDatabase() {
  try {
    // Connect only if not already connected
    if (!isConnected) {
      await client.connect();
      isConnected = true; // Update connection status
      console.log("Database connection established");
    }
    return client.db(); // Return the database instance
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // Rethrow the error for handling elsewhere
  }
}

export default client;