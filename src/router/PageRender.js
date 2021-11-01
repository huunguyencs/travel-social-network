import React from "react";
import { useParams } from "react-router-dom";

import NotFound from "../page/404";

const generatePage = (pageName) => {
    const component = () => require(`../page/${pageName}`).default;

    console.log(pageName);

    try {
        return React.createElement(component())
    }
    catch (err) {
        return <NotFound />;
    }
}

const PageRender = () => {
    const { page, subparam } = useParams();

    let pageName = "";

    if (page === "profile") {
        pageName = `${page}/${subparam}`
    }
    else if (subparam) {
        pageName = `${page}/id`;
    }
    else {
        pageName = `${page}`;
    }


    return generatePage(pageName)
}

export default PageRender;