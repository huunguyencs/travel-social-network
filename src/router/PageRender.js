import React from "react";
import { useParams } from "react-router-dom";

import NotFound from "../page/404";

const generatePage = (pageName) => {
    const component = () => require(`../page/${pageName}`).default;
    // if (pageName === "") component = () => require(`../page/home`).default;
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

    if (subparam) {
        pageName = `${page}/${subparam}`
    }
    else {
        pageName = `${page}`
    }


    return generatePage(pageName)
}

export default PageRender;