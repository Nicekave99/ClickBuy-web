// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { searchProducts } from "../api/Product";

// const SearchResults = () => {
//   const { keyword } = useParams();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const { data } = await searchProducts(keyword);
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [keyword]);

//   if (loading) return <div>Loading...</div>;

//   if (!products.length) {
//     return <div>No products found for "{keyword}"</div>;
//   }

//   return (
//     <div className="container mx-auto py-4">
//       <h2 className="text-2xl font-bold mb-4">Results for "{keyword}"</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {products.map((product) => (
//           <div key={product.id} className="border p-4 rounded shadow">
//             <img
//               src={product.images[0]?.url}
//               alt={product.title}
//               className="w-full h-48 object-cover mb-4"
//             />
//             <h3 className="text-lg font-bold">{product.title}</h3>
//             <p className="text-gray-600">{product.description}</p>
//             <p className="text-red-500 font-bold">฿{product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchResults;
