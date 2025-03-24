
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from "react";
import { Product } from "../data/products";
import { toast } from "sonner";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const calculateTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  return items.reduce(
    (acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + item.product.price * item.quantity,
    }),
    { totalItems: 0, totalPrice: 0 }
  );
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);

      if (existingItemIndex !== -1) {
        // Item already in cart, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        const totals = calculateTotals(updatedItems);
        return { ...state, items: updatedItems, ...totals };
      } else {
        // Add new item
        const updatedItems = [...state.items, { product, quantity }];
        const totals = calculateTotals(updatedItems);
        return { ...state, items: updatedItems, ...totals };
      }
    }
    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(item => item.product.id !== action.payload.productId);
      const totals = calculateTotals(updatedItems);
      return { ...state, items: updatedItems, ...totals };
    }
    case "UPDATE_QUANTITY": {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return cartReducer(state, { type: "REMOVE_ITEM", payload: { productId } });
      }

      const updatedItems = state.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const totals = calculateTotals(updatedItems);
      return { ...state, items: updatedItems, ...totals };
    }
    case "CLEAR_CART":
      return { items: [], totalItems: 0, totalPrice: 0 };
    default:
      return state;
  }
};

// Get initial cart state from local storage
const getInitialState = (): CartState => {
  if (typeof window === "undefined") {
    return { items: [], totalItems: 0, totalPrice: 0 };
  }
  
  try {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);
      const totals = calculateTotals(parsedCart.items);
      return { ...parsedCart, ...totals };
    }
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
  }
  
  return { items: [], totalItems: 0, totalPrice: 0 };
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  // Save cart to local storage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;
    
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
    toast.success(`${product.name} ajouté au panier`);
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });
    toast.info("Produit retiré du panier");
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.info("Panier vidé");
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
