import React, { useEffect, useState } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

export const getAllCollections = gql`
  query {
    collections(first: 250, query: "collection_type:'custom'") {
      edges {
        node {
          id
          title
          image {
            transformedSrc
          }
        }
      }
    }
  }
`;
//Bread & Bakery
//Fruits & Veg

function App() {
  const { loading, error, data } = useQuery(getAllCollections);

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (!error) {
      setCollections(data?.collections?.edges);
    }
  }, [data]);

  console.log(collections);

  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {collections?.length > 0 &&
            collections?.map((item, index) => {
              console.log(item);
              return (
                <div key={index}>
                  <p>{item?.node?.title}</p>
                  <img
                    style={{ width: 100, height: 100 }}
                    src={item?.node?.image?.transformedSrc}
                    alt=""
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
