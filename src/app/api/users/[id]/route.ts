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

type ProductResponse = Product | { error: string };

const filepath = path.join(process.cwd(), 'src', 'app', 'prod.json'); // Correct path for your structure

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const fileContents = await fs.promises.readFile(filepath, 'utf8');
    const products: Product[] = JSON.parse(fileContents);

    const productId = parseInt(params.id, 10);

    if (isNaN(productId)) {
      return NextResponse.json<ProductResponse>({ error: 'Invalid product ID' }, { status: 400 });
    }

    const product = products.find((p: Product) => p.id === productId);

    if (!product) {
      return NextResponse.json<ProductResponse>({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json<ProductResponse>(product, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error && 'code' in error) {
      if ((error as { code: string }).code === 'ENOENT') {
        return NextResponse.json<ProductResponse>({ error: 'Product data file not found' }, { status: 404 });
      }
    }
    console.error("Error reading product data file:", error);
    return NextResponse.json<ProductResponse>({ error: "Internal server error" }, { status: 500 });
  }
}