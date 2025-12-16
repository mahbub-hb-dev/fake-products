import { useCart } from "../context/CartContext";

const Cart = () => {
    const { cart, dispatch } = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return <p className="text-center mt-10">Cart is empty 🛒</p>;
    }

    return (
        <div className="p-5 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">My Cart</h2>

            {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-3 bg-white p-3 shadow">
                <div>
                    <p className="font-medium">{item.title}</p>
                    <p>Qty: {item.quantity}</p>
                </div>
                <button onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })} className="text-red-500"> Remove </button>
            </div>
            ))}

            <hr />
            <p className="mt-3 font-bold">Total: ${total}</p>

            <button onClick={() => dispatch({ type: "CLEAR_CART" })} className="mt-3 w-full bg-red-500 text-white py-1 rounded"> Clear Cart </button>
        </div>
    );
};
export default Cart;