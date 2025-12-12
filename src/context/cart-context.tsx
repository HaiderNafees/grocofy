
"use client";

import type { ReactNode } from 'react';
import { createContext, useReducer, useEffect } from 'react';
import type { CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
}

interface CartContextType extends CartState {
  addItem: (product: Product, quantity?: number) => void;
  updateItemQuantity: (itemId: string, quantity: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'UPDATE_ITEM_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_STATE'; payload: CartState };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === product.id
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        return { ...state, items: updatedItems };
      }
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
      };
      return { ...state, items: [...state.items, newItem] };
    }
    case 'UPDATE_ITEM_QUANTITY': {
        if (action.payload.quantity <= 0) {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload.itemId)
            }
        }
        return {
            ...state,
            items: state.items.map((item) =>
                item.id === action.payload.itemId
                ? { ...item, quantity: action.payload.quantity }
                : item
            ),
        };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.itemId),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_STATE':
        return action.payload;
    default:
      return state;
  }
};

const getInitialState = (): CartState => {
    try {
        if (typeof window !== 'undefined') {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : { items: [] };
        }
    } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
    }
    return { items: [] };
}


export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
  };

  const updateItemQuantity = (itemId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { itemId, quantity } });
  };

  const removeItem = (itemId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        updateItemQuantity,
        removeItem,
        clearCart,
        itemCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
