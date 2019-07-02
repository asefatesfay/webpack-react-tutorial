import express from "express";
import React from "react";
import {StaticRouter} from "react-router-dom";
import path from "path";
import Loadable from 'react-loadable'
import fs from "fs";
import App from "../components/App";
import ReactDOMServer from "react-dom/server";
import {ChunkExtractor} from "@loadable/server";

const statsFile = path.join(__dirname, "loadable-stats.json");

const app = express();
app.use(express.static("dist"))
app.get("*", (req, res) => {
    const context = {};
    const initialComponent = (
      <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    const extractor = new ChunkExtractor({statsFile});
      const jsx = extractor.collectChunks(initialComponent);

			const componentHTML = ReactDOMServer.renderToString(jsx);

			const scriptTags = extractor.getScriptTags();
			const linkTags = extractor.getLinkTags();
      const styleTags = extractor.getStyleTags();

    const indexFile = path.resolve("./dist/index.html");
    fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Something went wrong:', err);
          return res.status(500).send('Oops, better luck next time!');
        }
        return res.send(
            `
            <!DOCTYPE html>
            <head>
              <title>Universal Reacl</title>
              <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
              <script src="/main.js" defer></script>
              <meta name="apple-mobile-web-app-capable" content="yes">
              <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
					${linkTags}
					${styleTags}
            </head>
            <body>
              <div id="root">${componentHTML}</div>
              ${scriptTags}
            </body>
          </html>
        `
        );
      });
});

Loadable.preloadAll().then(() => {
app.listen("9090", () => {
    console.log("Server is listening on port 9090");
});
});
