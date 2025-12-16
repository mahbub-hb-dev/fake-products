import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const Products = () => {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    let mounted = true;

    fetch('https://dummyjson.com/products')
      .then((res) => {
        if(!res.ok) {
          throw new Error("Loading failed")
        }
        return res.json();
      })
      .then((data) => {
        if (mounted) setProducts(data.products);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(()=> { if (mounted) setIsLoading(false) })

    return () => { mounted = false }
  }, []);

  return (
    <div className="bg-gray-200">
      <h1 className="pt-3"> All Products </h1>
      {isLoading && <p className="text-center"> Products are loading... </p>}
      {error && <p className="text-center text-red-500"> Failed to fetch! </p>}

      {!isLoading && !error && 

      <section className="flex flex-wrap gap-5 justify-center py-7 px-3">
        {products && products.length > 0 && products.map((product) => {
          const {id, title, category, price, description, images} = product;

          return (
            <article key={id} className="shadow-xl bg-white rounded-lg p-3 w-[300px]">
              <img src={images[0]} alt={title} className="w-full" />
              <h3> {id} : Name : {title} </h3>
              <p className="text-fuchsia-500 font-medium"> Category : {category} </p>
              <p className="text-red-500 text-lg font-medium"> Price : {price} $ </p>
              <p> Description : {description && description.substring(0,80)}... </p>
              <Link to={`/products/${id}`} state={product} className="text-green-600 font-medium hover:underline"> Show Details... </Link>
            </article>
          )
        })}

      </section>}
    </div>
  )
}

export default Products
