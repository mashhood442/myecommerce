"use client";

import React, { useEffect, useState, useContext } from "react";
import { cartContext } from "@/app/components/context/CartContext";
import Image from "next/image";
import { useParams } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  currency: string;
  price: number;
  image: string;
  sizes: string[];
}

const ProductDetails = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const context = useContext(cartContext);
  
    if (!context) {
      throw new Error("ProductDetails must be used within a CartProvider");
    }
  
    const { addToCart } = context;
    
  
    useEffect(() => {
      const { id } = params;
      if (!id) return;
  
      const fetchProduct = async () => {
        try {
          const response = await fetch(`/api/users/${id}`);
          if (!response.ok) throw new Error("Failed to fetch product data");
          const data: Product = await response.json();
          setProduct(data);
        } catch (error) {
          console.error("Error loading product:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProduct();
    }, [params]);
  
    if (loading) return <div>Loading...</div>;
    if (!product) return <div>Product not found.</div>;
  
    return (
      <div>
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <Image
                alt={product.name}
                className="lg:w-1/2 w-full lg:h-auto h-auto object-cover rounded"
                src={product.image}
                width={500}
                height={500}
                layout="intrinsic"
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">SWIFTCART</h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
                <p className="leading-relaxed">{product.description}</p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Available Sizes</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                        {product.sizes.map((size, index) => (
                          <option key={index} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    {product.currency} {product.price}/-
                  </span>
                  <button
                    onClick={() => {
                      addToCart("itemcode", 1, 999, "SwiftCraf", "Xl");
                    }}
                    className="flex ml-10 text-sm text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default ProductDetails;
  