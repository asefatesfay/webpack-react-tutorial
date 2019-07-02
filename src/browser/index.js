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

