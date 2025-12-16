import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { dispatch } = useCart();

  useEffect(() => {
    let mounted = true;

    fetch("https://dummyjson.com/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Loading failed");
        }
        return res.json();
      })
      .then((data) => {
        if (mounted) setProducts(data.products);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <h1 className="pt-3 text-center text-2xl font-bold"> All Products </h1>

      {isLoading && (<p className="text-center mt-5">Products are loading...</p>)}
      {error && (<p className="text-center mt-5 text-red-500"> Failed to fetch! </p>)}

      {!isLoading && !error && (
        <section className="flex flex-wrap gap-5 justify-center py-7 px-3">
          {products.length > 0 &&
            products.map((product) => {
              const {id, title, category, price, description, images} = product;

              return (
                <article
                  key={id} className="shadow-xl bg-white rounded-lg p-3 w-[300px] flex flex-col">
                  <img src={images[0]} alt={title} className="w-full h-[180px] object-cover rounded"/>
                  <h3 className="mt-2 font-medium"> {id} : {title} </h3>
                  <p className="text-fuchsia-500 font-medium"> Category : {category} </p>
                  <p className="text-red-500 text-lg font-medium"> Price : {price} $ </p>
                  <p className="text-sm"> {description.substring(0, 80)}... </p>

                  <div className="mt-auto flex flex-col gap-2">
                    <Link to={`/products/${id}`} state={product} className="text-green-600 font-medium hover:underline"> Show Details... </Link>
                    <button onClick={() => dispatch({type: "ADD_TO_CART", payload: product,})} className="w-full bg-indigo-500 text-white py-1 rounded hover:bg-indigo-600"> Add to Cart </button>
                  </div>
                </article>
              );
            })}
        </section>
      )}
    </div>
  );
};

export default Products;
