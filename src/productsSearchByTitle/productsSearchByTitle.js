import React, { useEffect, useState } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

export const getProductsBySearchTitle = gql`
  query Products($lastItem: String, $query: String) {
    products(first: 10, after: $lastItem, query: $query) {
      edges {
        cursor
        node {
          id
          title
          description
          tags
          totalInventory
          tags
          variants(first: 3) {
            edges {
              node {
                availableForSale
                id
                compareAtPrice
                price
                title
              }
            }
          }
          priceRange {
            maxVariantPrice {
              amount
            }
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                id
                transformedSrc
              }
            }
          }
        }
      }
    }
  }
`;
//Bread & Bakery
//Fruits & Veg

function App() {
  const [products, setProducts] = useState([]);
  const [lastItem, setLastItem] = useState();
  const [input, setInput] = useState("");
  const [queryTitle, setQueryTitle] = useState("");
  const { loading, error, data } = useQuery(getProductsBySearchTitle, {
    variables: { lastItem: lastItem, query: `title : ${queryTitle}` },
  });

  useEffect(() => {
    if (data?.products?.edges?.length > 0) {
      setProducts([...data?.products?.edges]);
    }
  }, [data]);

  useEffect(() => {
      const timer = setTimeout(() => {
        setQueryTitle(input);
      }, 500);

      return () => {
        clearTimeout(timer);
      };
  }, [input]);

  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button
            onClick={() => {
              let copiedProducts = [...products];
              let lastItem = copiedProducts.pop();
              setLastItem(lastItem.cursor);
            }}
          >
            click
          </button>
          {products.length > 0 &&
            products.map((item, index) => {
              console.log(item?.node?.images?.edges?.node?.transformedSrc);
              return (
                <div key={index} style={{ border: "1px solid red" }}>
                  <p>{item?.node?.title}</p>
                  <p>{item?.node?.totalInventory}</p>
                  <p>{item?.node?.description}</p>
                  <p>
                    Discounted Price :
                    {item?.node?.variants?.edges[0]?.node?.price}
                  </p>
                  <p>
                    Previous price :
                    {item?.node?.variants?.edges[0]?.node?.compareAtPrice}
                  </p>
                  <img
                    style={{ width: 100, height: 100 }}
                    src={item?.node?.images?.edges[0]?.node?.transformedSrc}
                  />
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default App;
