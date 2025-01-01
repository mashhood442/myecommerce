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

// Utility function to safely read the file
const readFileSafe = async (filePath: string): Promise<string | null> => {
  try {
    if (!fs.existsSync(filePath)) return null;
    return await fs.promises.readFile(filePath, "utf8");
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
};

// GET request handler
export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // Ensure the data file exists and is readable
    const fileContents = await readFileSafe(filepath);
    if (!fileContents) {
      return NextResponse.json(
        { error: "Product data file not found or inaccessible" },
        { status: 500 }
      );
    }

    // Parse the product data
    let products: Product[] = [];
    try {
      products = JSON.parse(fileContents);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
      return NextResponse.json(
        { error: "Invalid product data format" },
        { status: 500 }
      );
    }

    // Extract and validate the product ID
    const productId = parseInt(context.params.id, 10);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Find the product by ID
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Return the product data as a JSON response
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
