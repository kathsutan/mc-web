import { createContext } from "react";
import { useState } from "react";

export const SavedContext = createContext()

export const SavedProvider = ({children}) => {
    const [savedItems, setSavedItems] = useState([])

    const addToSaved = (item) => {
        setSavedItems((prev) => {
            const existing = prev.find((p) => p.id === item.id)
            if (existing) {
                return prev.map((p) => p.id === item.id ? {...p, quantity: p.quantity + 1} : p)
            }
            return [...prev, {...item, quantity: 1}]
        })
    }

    const removeFromSaved = (id) => {
        setSavedItems((prev)=>prev.filter((p)=>p.id !== id))
    }
    
    const clearSaved = () => {
        setSavedItems([]);
    }
    
    const increaseQty = (id) => {
        setSavedItems((prev) => prev.map((p)=>p.id === id ? {...p, quantity: p.quantity + 1} : p ))
    }
    
    const decreaseQty = (id) => {
        setSavedItems((prev) => prev.map((p)=>p.id === id ? {...p, quantity: p.quantity - 1} : p ).filter((p)=>p.quantity>0))
    }

    return (
        <SavedContext.Provider value = {{
                savedItems,
                addToSaved,
                removeFromSaved,
                clearSaved,
                increaseQty,
                decreaseQty
            }}>
                {children}
        </SavedContext.Provider>
    )
}