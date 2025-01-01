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
const filepath = path.join(process.cwd(), 'src', 'app', 'data', 'prod.json');

// GET request for a specific product by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if the product data file exists
    if (!fs.existsSync(filepath)) {
      return NextResponse.json({ error: 'Product data file not found' }, { status: 500 });
    }

    // Read and parse the JSON file
    const fileContents = await fs.promises.readFile(filepath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);

    // Extract the `id` from the dynamic route
    const productId = parseInt(params.id, 10);

    if (isNaN(productId)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
    }

    // Find the product by ID
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Return the product as a JSON response
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
