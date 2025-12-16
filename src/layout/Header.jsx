import { Link, Outlet } from "react-router-dom"
import { useCart } from "../context/CartContext";

const Header = () => {

  const {cart} = useCart();

  return (
    <>
      <header className="flex text-white justify-between p-3 bg-black items-center">
        <div>
            <Link to="/"> My App </Link>
        </div>
        <nav>
            <Link to="/cart">Cart ({cart.length})</Link>
            <ul className="flex gap-7 justify-center">
              {/* <li> <Link to="/"> Home </Link> </li> */}
            </ul>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Header
