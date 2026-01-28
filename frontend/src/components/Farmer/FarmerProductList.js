// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const FarmerProductList = () => {
//   const [products, setProducts] = useState([]);
//   const uid = 3; // ✅ Replace with actual UID from login/auth

//   useEffect(() => {
//     if (!uid) {
//       console.error("UID is undefined");
//       return;
//     }

//     fetchProducts();
//   }, [uid]);

//   const fetchProducts = () => {
//     axios
//       .get(`http://localhost:8083/api/farmer/products/${uid}`)
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching farmer products:", error);
//       });
//   };

//   const handleChange = (e, index, field) => {
//     const newProducts = [...products];
//     newProducts[index][field] = e.target.value;
//     setProducts(newProducts);
//   };

//   const handleUpdate = async (index) => {
//     const product = products[index];

//     try {
//       const response = await fetch("http://localhost:8083/api/farmer/update-product", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           psId: product.psId,
//           price: product.price,
//           qty: product.qty,
//           available: product.available, // ✅ send this too
//           product: {
//             pid: product.product.pid,    // ✅ backend needs this
//           },
//         }),
//       });

//       if (response.ok) {
//         alert("Product updated successfully!");
//         fetchProducts(); // ✅ refresh list
//       } else {
//         const msg = await response.text();
//         alert("Failed to update product. " + msg);
//       }
//     } catch (error) {
//       alert("Error updating product: " + error.message);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">My Products</h2>

//       {products.length === 0 ? (
//         <div className="alert alert-warning text-center">No products found.</div>
//       ) : (
//         <table className="table table-striped table-bordered">
//           <thead className="thead-dark">
//             <tr>
//               <th>Product Name</th>
//               <th>Category</th>
//               <th>Price (₹)</th>
//               <th>Quantity</th>
//               <th>Available</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((prod, index) => (
//               <tr key={prod.psId}>
//                 <td>{prod.product?.pname}</td>
//                 <td>{prod.product?.category?.cat_name}</td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={prod.price}
//                     onChange={(e) => handleChange(e, index, "price")}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={prod.qty}
//                     onChange={(e) => handleChange(e, index, "qty")}
//                   />
//                 </td>
//                 <td>{prod.available ? "Yes" : "No"}</td>
//                 <td>
//                   <button
//                     className="btn btn-primary btn-sm"
//                     onClick={() => handleUpdate(index)}
//                   >
//                     Update
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default FarmerProductList;


///////////////updates//////////
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const FarmerProductList = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.auth.user); // ✅ Get logged-in farmer
  const uid = user?.uid;

  useEffect(() => {
    if (uid) {
      fetchProducts();
    }
  }, [uid]);

  const fetchProducts = () => {
    axios
      .get(`http://localhost:8080/api/farmer/products/${uid}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching farmer products:", error);
      });
  };

  const handleChange = (e, index, field) => {
    const newProducts = [...products];
    newProducts[index][field] = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setProducts(newProducts);
  };

  const handleUpdate = async (index) => {
    const product = products[index];

    try {
      const response = await fetch("http://localhost:8080/api/farmer/update-product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          psId: product.psId,
          price: product.price,
          qty: product.qty,
          available: product.available,
          product: {
            pid: product.product.pid,
          },
        }),
      });

      if (response.ok) {
        alert("Product updated successfully!");
        // ✅ Instead of fetching all products again, just update local state
        const updated = [...products];
        updated[index] = product;
        setProducts(updated);
      } else {
        const msg = await response.text();
        alert("Failed to update product. " + msg);
      }
    } catch (error) {
      alert("Error updating product: " + error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">My Products</h2>

      {products.length === 0 ? (
        <div className="alert alert-warning text-center">No products found.</div>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Quantity</th>
              <th>Available</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod, index) => (
              <tr key={prod.psId}>
                <td>{prod.product?.pname}</td>
                <td>{prod.product?.category?.cat_name}</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={prod.price}
                    onChange={(e) => handleChange(e, index, "price")}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={prod.qty}
                    onChange={(e) => handleChange(e, index, "qty")}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={prod.available}
                    onChange={(e) => handleChange(e, index, "available")}
                  />{" "}
                  {prod.available ? "Yes" : "No"}
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleUpdate(index)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FarmerProductList;
