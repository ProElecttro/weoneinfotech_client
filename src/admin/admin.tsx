import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./admin.css";

import { AiOutlineSearch } from "react-icons/ai";

interface Product {
  noOfRatings: number;
  rating: number;
  product_id: string;
  productName: string;
  category: string;
  brandName: string;
  stock: string;
  status: string;
  MRP: string;
  salesPrice: number;
  description: string;
  images: string;
  specifications: string;
}

export default function Admin() {
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [duplicateData, setduplicateData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchProducts() {
      const access_token = localStorage.getItem("access_token");
      try {
        const url = `http://localhost:3002/api/v1/product/fetchProductDetails`
        const method = "GET";
        const headers = {
          access_token: access_token,
          "Content-Type": "application/json",
        };
        const response = await fetch(url, { method, headers });

        if (response.ok) {
          const result = await response.json();
          const data: Product[] = result.data;

          setLoading(false);
          setProductsData(data);
          setduplicateData(data);
        } else {
          const errorData = await response.json();
          console.error(errorData.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      <div id="admin">
        <div id="products-container">
          <h2>Products</h2>
          <hr />
          <div id="control">
            <button id="bulk-action" className="control-btn">
              Bulk Action
            </button>
            <button id="selected-dlt" className="control-btn">
              Delete Selected
            </button>
            <button id="add-prod" className="control-btn">
              <NavLink to={"/addProduct"}>Add Product</NavLink>
            </button>
          </div>
          <hr />
          <div id="search">
            <div className="search-bar" id="search-prod">
              <input
                type="text"
                className="search"
                placeholder="Search for Products..."
              />
              <button className="button">
                <AiOutlineSearch className="icons" />
              </button>
            </div>
            <select name="category" id="category" className="fetch-prod">
              <option value="All" hidden>
                Category
              </option>
              <option value="b">b</option>
              <option value="c">c</option>
              <option value="d">d</option>
            </select>
            <select name="sort-products" id="sort-prod" className="fetch-prod">
              <option value="All" hidden>
                Price
              </option>
              <option value="low">Low to High</option>
              <option value="high">High to Low</option>
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
              <option value="status-selling">Status - Selling</option>
              <option value="status-out-of-stock">Status - Out of Stock</option>
              <option value="date-added-asc">Date Added</option>
              <option value="date-updated-asc">Date Updated</option>
            </select>
          </div>
          <hr />
          <div className="table-container">
            <table id="product_info">
              <thead>
                <tr>
                  <th id="select-all">
                    <input type="checkbox" className="check-box" />
                  </th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Sales Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th id="description-th">Description</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>Loading...</td>
                  </tr>
                ) : duplicateData.length === 0 ? (
                  <tr>
                    <td colSpan={7}>No products found</td>
                  </tr>
                ) : (
                  duplicateData.map((product) => (
                    <tr key={product.product_id}>
                      <td>
                        <input type="checkbox" className="check-box" />
                      </td>
                      <td>{product.productName}</td>
                      <td>{product.category}</td>
                      <td>{product.MRP}</td>
                      <td>{product.salesPrice}</td>
                      <td>{product.stock}</td>
                      <td>{product.status}</td>
                      <td>{product.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
