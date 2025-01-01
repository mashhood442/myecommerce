"use client";

import React, { useRef, useContext } from "react";
import Image from "next/image";
import { CiShoppingCart } from "react-icons/ci";
import { MdCancel } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { GrSubtractCircle } from "react-icons/gr";
import { cartContext } from "./context/CartContext";
import Link from "next/link";

const Navbar = () => {
  const context = useContext(cartContext);

  if (!context) throw new Error("Navbar must be used within a CartProvider");

  const { cart, addToCart, removeFromCart, clearCart } = context;
  const ref = useRef<HTMLDivElement | null>(null);

  const toggleCart = () => {
    if (ref.current) {
      const classList = ref.current.classList;
      classList.toggle("translate-x-full");
      classList.toggle("translate-x-0");
    }
  };

  return (
    <div>
      <nav className="flex flex-wrap justify-between items-center w-full p-4 bg-gray-800 shadow-lg relative">
        {/* Logo */}
        <div className="px-2">
          <Image
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-xl mx-auto sm:mx-0"
            src="/New.webp"
            alt="Company logo"
            width={64}
            height={64}
          />
        </div>
        {/* Navigation Links */}
        <ul className="flex flex-row gap-6 text-gray-300 font-semibold">
          <li className="hover:text-white">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-white">
            <Link href="/shirts">Shirts</Link>
          </li>
          <li className="hover:text-white">
            <Link href="/signup">Sign Up</Link>
          </li>
        </ul>
        {/* Cart Icon */}
        <button onClick={toggleCart}>
          <CiShoppingCart className="w-7 h-7 text-gray-400 hover:text-blue-500 transition duration-200" />
        </button>
      </nav>

      {/* Cart Sidebar */}
      <div
        ref={ref}
        className="cart fixed right-0 top-0 h-full bg-gray-900 text-gray-300 shadow-lg transition-transform translate-x-full w-80 sm:w-96 z-50 p-4 overflow-y-auto"
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <span className="text-lg font-semibold text-gray-100">Shopping Cart</span>
          <MdCancel
            onClick={toggleCart}
            className="text-gray-400 cursor-pointer hover:text-red-600 w-6 h-6"
          />
        </div>

        {Object.keys(cart).length === 0 ? (
          <div className="text-center py-8 text-gray-500">Your cart is empty.</div>
        ) : (
          <ol className="space-y-4">
            {Object.values(cart).map((item, index) => (
              <li key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">Size: {item.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <IoAddCircleOutline
                    onClick={() => addToCart(item.itemcode, 1, item.price, item.name, item.size)}
                    className="cursor-pointer text-green-500 w-5 h-5"
                  />
                  <span className="text-gray-200">{item.qty}</span>
                  <GrSubtractCircle
                    onClick={() => removeFromCart(item.itemcode, 1)}
                    className="cursor-pointer text-red-500 w-5 h-5"
                  />
                </div>
                <span className="font-semibold text-gray-300">{item.price}RS</span>
              </li>
            ))}
          </ol>
        )}

        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Clear Cart
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
