import { createContext, ReactNode, useEffect, useState, useCallback } from "react";

interface CartItem {
  itemcode: string;
  qty: number;
  price: number;
  name: string;
  size: string;
}

type Cart = Record<string, CartItem>;

interface CartContextValues {
  cart: Cart;
  subTotal: number;
  addToCart: (itemcode: string, qty: number, price: number, name: string, size: string) => void;
  removeFromCart: (itemcode: string, qty: number) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export const cartContext = createContext<CartContextValues | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart>({});
  const [subTotal, setSubTotal] = useState(0);

  // Load cart from local storage
  useEffect(() => {
    try {
      const fromStorage = localStorage.getItem("cart");
      if (fromStorage) {
        const parsedCart = JSON.parse(fromStorage);
        setCart(parsedCart);
        updateSubTotal(parsedCart);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      localStorage.removeItem("cart");
      setCart({});
    }
  }, []);

  // Save cart to local storage
  const saveCart = useCallback((myCart: Cart) => {
    try {
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, []);

  // Update subtotal
  const updateSubTotal = (myCart: Cart) => {
    let subtotal = 0;
    for (const item in myCart) {
      subtotal += myCart[item].qty * myCart[item].price;
    }
    setSubTotal(subtotal);
  };

  // Add to cart
  const addToCart = (itemcode: string, qty: number, price: number, name: string, size: string) => {
    const newCart = { ...cart };
    if (itemcode in newCart) {
      newCart[itemcode].qty += qty;
    } else {
      newCart[itemcode] = { itemcode, qty, price, name, size };
    }

    setCart(newCart);
    updateSubTotal(newCart);
    saveCart(newCart);
  };

  // Remove from cart
  const removeFromCart = (itemcode: string, qty: number) => {
    const newCart = { ...cart };

    if (itemcode in newCart) {
      const newQty = newCart[itemcode].qty - qty;
      if (newQty <= 0) {
        delete newCart[itemcode];
      } else {
        newCart[itemcode].qty = newQty;
      }

      setCart(newCart);
      updateSubTotal(newCart);
      saveCart(newCart);
    }
  };

  // Clear the cart
  const clearCart = () => {
    setCart({});
    setSubTotal(0);
    localStorage.removeItem("cart");
  };

  return (
    <cartContext.Provider value={{ cart, subTotal, addToCart, removeFromCart, clearCart }}>
      {children}
    </cartContext.Provider>
  );
};
