import express from "express";
import React from "react";
import {StaticRouter} from "react-router-dom";
import path from "path";
import Loadable from 'react-loadable'
import fs from "fs";
import App from "../components/App";
import ReactDOMServer from "react-dom/server";
import {ChunkExtractor} from "@loadable/server";
import exphbs from "express-handlebars";

// for development use only
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import config from "../../webpack.config.dev.js";

const statsFile = path.join(__dirname, "loadable-stats.json");
const app = express();
const env = process.env.NODE_ENV;

if (env === "development") {
  const compiler = webpack(config);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );

  app.use(webpackHotMiddleware(compiler));
}

// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "views"));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");
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
        
      res.render(
        "index",
        {
          componentHTML,
          scriptTags,
          linkTags,
          styleTags
        }
      );
      });
});

Loadable.preloadAll().then(() => {
app.listen("9090", () => {
    console.log("Server is listening on port 9090");
});
});
