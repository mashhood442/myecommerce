"use client";

import React, { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { cartContext } from "@/app/components/context/CartContext";
import Image from "next/image";

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
  
  


  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              alt={'product.name'}
              className="lg:w-1/2 w-full lg:h-auto h-auto object-cover rounded"
              src='https://m.media-amazon.com/images/I/91VCk+J8s8L._AC_SX466_.jpg'
              width={500}
              height={500}
              layout="intrinsic"
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">SWIFTCART</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">Men's Limited Edition</h1>
              <p className="leading-relaxed">Swift Cart Limited Edition - Elevate your style with the MEN'S Limited Edition T-Shirt. This exclusive piece features a sleek, modern design crafted from premium-quality fabric to ensure comfort and durability. Perfect for any occasion, it comes in a variety of sizes to provide a perfect fit for everyone. Pair it with jeans, chinos, or shorts to complete your look. Don't miss out on this must-have addition to your wardrobe!</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Available Sizes</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      <option>
                        S
                        </option>
                        <option>
                        M
                        </option>
                        <option>
                        L 
                        </option>
                        <option>
                        XL
                        </option>
                        <option>
                          XXL 
                        </option>
                        
                      
                    </select>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  Rs999-/
                </span>
                <button
                  
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
