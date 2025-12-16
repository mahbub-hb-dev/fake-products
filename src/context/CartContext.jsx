import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {

        case "ADD_TO_CART": {
            const exists = state.find(item => item.id === action.payload.id);

            if (exists) {
                return state.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...state, { ...action.payload, quantity: 1 }];
        }

        case "REMOVE_FROM_CART": return state.filter(item => item.id !== action.payload);
        case "CLEAR_CART": return [];
        default: return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(
        cartReducer,
        JSON.parse(localStorage.getItem("cart")) || []
    );

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);