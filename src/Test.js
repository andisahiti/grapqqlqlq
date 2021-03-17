import React, { useEffect } from "react";

import { useQuery, gql } from "@apollo/client";
import axios from "axios";

const query = gql`
  query {
    products (first:250, query:" tag:'black'") {
        edges {
            node {
              id
              title
              description
           }
        }
    }
  }
`;

function Test(props) {
  const { loading, error, data } = useQuery(query);

  console.log(data);

  return <div></div>;
}

export default Test;
