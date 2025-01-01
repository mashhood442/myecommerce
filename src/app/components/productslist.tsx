"use client";

import { useState, useEffect } from "react";
import React from 'react';
import Link from "next/link";
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  image: string;
  sizes: string[];
}

const Productslist = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) throw new Error("failed to fetch data from server");
        const data: Product[] = await response.json(); // Explicitly typed data
        setProducts(data);
      } catch (error) {
        console.log("Error Loading Products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    console.log("Loading Product");
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {/* Map over products and dynamically create product cards */}
          {products.map((product) => (
            <Link key={product.id} href={`product/${product.id}`} className="group">
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className="aspect-square w-full rounded-lg bg-gray-200 object-top group-hover:opacity-75 xl:aspect-[7/8]"
              />
              <p className="mt-4 text-lg font-medium text-gray-900">{product.currency}{product.price}</p>
              <h3 className="mt-1 text-md text-gray-700">{product.name}</h3>
              <h4 className="mt-0 text-sm text-gray-500">{product.sizes.join(", ")}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Productslist;
