import React, { Component } from "react";
import graphql from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";

import { Environment } from "./relay";

const App = ({ query }) => {
  return query.deputados.edges.map(({ node }) => {
  const { nome, urlFoto } = node;
  return (
    <div>
      <img class="fit-picture"
     src={urlFoto}
     alt="Grapefruit slice atop a pile of other slices" />
      <p>{nome}</p>
    </div>
    );
  })
};

const AppQR = () => {
  return (
    <QueryRenderer
      environment={Environment}
      query={graphql`
        query AppQuery {
          deputados {
            edges {
              node {
                nome
                urlFoto
              }
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        console.log("qr: ", error, props);
        if (error) {
          return <span>{error.toString()}</span>;
        }

        if (props) {
          return <App query={props} />;
        }

        return <span>loading</span>;
      }}
    />
  );
};

export default AppQR;
