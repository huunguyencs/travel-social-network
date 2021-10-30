import React from "react";
import { useParams } from "react-router";

import NotFound from "../page/404";

const generatePage = (pageName) => {
    const component = () => require(`../page/${pageName}`).default;
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

    return generatePage(pageName)
}