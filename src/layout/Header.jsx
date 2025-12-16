import { Link, Outlet } from "react-router-dom"

const Header = () => {

  return (
    <>
      <header className="flex text-white justify-between p-3 bg-black items-center">
        <div>
            <Link to="/"> My App </Link>
        </div>
        <nav>
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
