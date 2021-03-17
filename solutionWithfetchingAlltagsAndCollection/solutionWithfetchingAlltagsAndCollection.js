import React, { useEffect, useState } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

export const getAllCollections = gql`
  query {
    collections(first: 10, query: "collection_type:'smart'") {
      edges {
        node {
          id
          title
          image {
            transformedSrc
          }
          products(first: 250) {
            edges {
              node {
                title
                tags
              }
            }
          }
        }
      }
    }
  }
`;

function App() {
  const [selectedCollection, setSelectedCollection] = useState();
  const [collections, setCollections] = useState([]);
  const { loading, error, data } = useQuery(getAllCollections);
  const [tagsFiltered, setTagsFiltered] = useState([]);

  useEffect(() => {
    if (!error) {
      setCollections(data?.collections?.edges);
    }
  }, [data]);

  const filterTags = (tagArr) => {
    // setTagsFiltered([...tagsFiltered,tagArr])
  };

  return (
    <div className="App">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          {collections?.length > 0 &&
            collections?.map((item, index) => {
              return (
                <div
                  onClick={() => setSelectedCollection(item?.node?.title)}
                  key={index}
                >
                  <p>{item?.node?.title}</p>
                  <div style={{ display: "flex" }}>
                    {item?.node?.products?.edges?.map((item) => {
                      filterTags(item?.node?.tags);
                      return (
                        <p style={{ marginRight: 10 }}>{item?.node?.tags[0]}</p>
                      );
                    })}
                  </div>
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
