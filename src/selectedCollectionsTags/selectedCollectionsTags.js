import React, { useEffect, useState } from "react";
import "./App.css";
import { gql, useQuery } from "@apollo/client";

export const getSelectedCollectionTags = gql`
  query CollectionByHandle($title: String) {
    collectionByHandle(handle: $title) {
      title
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
`;

export const getAllCollections = gql`
  query {
    collections(first: 250, query: "collection_type:'smart'") {
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

function App() {
  const [selectedCollection, setSelectedCollection] = useState();
  const [collections, setCollections] = useState([]);
  const [tags, setTags] = useState([]);
  const { loading, error, data } = useQuery(getAllCollections);

  const { loadingT, errorT, dataT } = useQuery(getSelectedCollectionTags, {
    variables: { title: selectedCollection },
  });

  useEffect(() => {
    if (!error) {
      setCollections(data?.collections?.edges);
    }
  }, [data]);

  console.log(errorT);
  console.log(dataT);

  useEffect(() => {
    if (dataT) {
      setTags(dataT?.collectionByHandle?.products);
    }
  }, [dataT]);

  console.log(selectedCollection);

  return (
    <div className="App">
      {tags?.length > 0 &&
        tags?.map((item, index) => {
          return <p>{item?.node?.tags[0]}</p>;
        })}
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
