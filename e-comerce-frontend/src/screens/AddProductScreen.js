import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Api } from "../utils/Api";
import "./AddProductScreen.css";

function AddProductScreen() {
  const { replace, push } = useHistory();
  const [name, setName] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const _handleSubmit = useCallback(async () => {
    if (
      (name.length > 2 && countInStock > 0 && imageUrl.length > 2,
      description.length > 2,
      price > 0)
    ) {
      setLoading(true);
      const { statusCode, data } = await Api.postRequest("/api/products/", {
        name,
        description,
        imageUrl,
        price,
        countInStock,
      });
      if (statusCode === 400 || statusCode === 500 || statusCode === 403) {
        setLoading(false);
        alert(data);
        return;
      }
      replace("/");
    }
  }, [name, description, imageUrl, price, countInStock, replace]);
  if (loading) return <h1>Loading...</h1>;
  return (
    <div className="signupscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              // backgroundColor: 'red',
            }}
          >
            <div style={{ cursor: "pointer" }} onClick={() => push("/")}>
              <i class="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Add Product</p>
          </div>

          <label for="fname">Name</label>
          <input
            type="text"
            name="name"
            placeholder="name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label for="desc">Description</label>
          <input
            type="text"
            name="desc"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label for="url">Image Url</label>
          <input
            type="text"
            name="url"
            placeholder="Image Url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <label for="price">Price</label>
          <input
            type="text"
            name="price"
            placeholder="Price in Rupees"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <label for="count">Count In Stock</label>
          <input
            type="text"
            name="count"
            placeholder="Count"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
          />

          <br />

          <input type="submit" value="Add Product" onClick={_handleSubmit} />
        </div>
      </div>
    </div>
  );
}

export default AddProductScreen;
