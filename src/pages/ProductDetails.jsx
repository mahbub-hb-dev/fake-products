import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom"
import { useCart } from "../context/CartContext";

const ProductDetails = () => {

    const {state} = useLocation();

    const [product, setProduct] = useState(state || null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const {id} = useParams();
    const {dispatch} = useCart();

    useEffect(()=> {
      let mounted = true;

      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => {
          if(!res.ok) {
            throw new Error("Loading failed")
          }
          return res.json();
        })
        .then((data) => {
          if (mounted) setProduct(data);
        })
        .catch((err) => {
          if (mounted) setError(err.message);
        })
        .finally(()=> { if (mounted) setIsLoading(false) })

      return () => { mounted = false }
    }, [id]);

  return (
    <div className="bg-gray-400 h-lvh">
      <h1> Product Details </h1>

      {isLoading && <p className="text-center"> Product is loading... </p>}
      {error && <p className="text-center text-red-500"> Failed to fetch! </p>}

      {!isLoading && !error && product &&
        <article className="w-[500px] mt-5 mx-auto shadow-2xl rounded-xl p-5 bg-white"> 
            <img src={product?.images?.[0]} alt={product?.title} className="w-1/2 mx-auto" />
            <h3> Name : {product?.title} </h3>
            <p className="text-[indigo]"> Category : {product?.category} </p>
            <p className="text-red-500 font-medium"> Price : {product?.price} $ </p>
            <p> Description : {product?.description} </p>
            <Link to="/" className="rounded inline-block mt-3 px-4 py-1 bg-green-500 font-medium text-white text-sm"> &#8592; Go Back </Link>
            <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })} className="mt-3 px-4 py-1 bg-indigo-500 text-white rounded"> Add to Cart </button>
        </article>}

    </div>
  )
}

export default ProductDetails
