import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom"
import {loadableReady } from '@loadable/component'
import App from "../components/App"
// import FormContainer from "./js/components/container/FormContainer";
// const wrapper = document.getElementById("create-article-form");
// wrapper ? ReactDOM.render(<FormContainer />, wrapper): false;

loadableReady(() => {
    ReactDOM.hydrate(
        <Router>
            <App />
        </Router>,
        document.getElementById("root")
    )
});

if (typeof module.hot !== "undefined") {
	module.hot.accept(); // eslint-disable-line no-undef
}
  

// window.onload = () => {
//     Loadable.preloadReady().then(() => {
//         ReactDOM.hydrate(
//             <Router>
//                 <App />
//             </Router>,
//             document.getElementById("root")
//         )
//     });
//   };

