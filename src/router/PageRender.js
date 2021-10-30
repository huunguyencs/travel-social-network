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
    const { page, id } = useParams();

    let pageName = "";

    if (id) {
        pageName = `${page}/[id]`
    }
    else {
        pageName = `${page}`
    }

    console.log(pageName);

    return generatePage(pageName)
}

export default PageRender;