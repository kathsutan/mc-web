import { createContext } from "react";
import { useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([])

    const addToCart = (item) => {
        setCartItems((prev) => {
            const existing = prev.find((p) => p.id === item.id)
            if (existing) {
                return prev.map((p) => p.id === item.id ? {...p, quantity:p.quantity + 1}: p)
            }
            return [...prev, {...item, quantity: 1}]
        })
    }

    const removeFromCart = (id) => {
        setCartItems((prev)=>prev.filter((p)=>p.id !== id))
    }
    const clearCart = () => {
        setCartItems([]);
        // sets cart to an empty array to clear cart
    }
    
    const increaseQty = (id) => {
        setCartItems((prev) => prev.map((p)=>p.id === id ? {...p, quantity: p.quantity + 1}:p ))
    }
    const decreaseQty = (id) => {
        setCartItems((prev) => prev.map((p)=>p.id === id ? {...p, quantity: p.quantity - 1}:p ).filter((p)=>p.quantity>0))
    }

    return (
        <CartContext.Provider value = {{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                increaseQty,
                decreaseQty
            }}>
                {children}
        </CartContext.Provider>
    )
}