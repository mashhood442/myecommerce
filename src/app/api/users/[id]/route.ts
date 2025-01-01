import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface Product {
  id: number;
  name: string;
  description: string;
  currency: string;
  price: number;
  image: string;
  sizes: string[];
}

// Define the path to the product data file
const filepath = path.join(process.cwd(), "src", "app", "data", "prod.json");

// GET request handler
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Ensure the data file exists and is readable
    if (!fs.existsSync(filepath)) {
      return NextResponse.json({ error: "Product data file not found" }, { status: 500 });
    }

    // Read and parse the product data
    const fileContents = await fs.promises.readFile(filepath, "utf8");
    const products: Product[] = JSON.parse(fileContents);

    // Extract and validate the product ID
    const productId = parseInt(params.id, 10);
    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    // Find the product by ID
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Return the product data as a JSON response
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Unhandled error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
