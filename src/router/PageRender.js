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
    const { page, id, subpage } = useParams();

    var pageName = "";

    if (id) {
        if (subpage) {
            pageName = `${page}/id/${subpage}`;
        }
        else {
            pageName = `${page}/id`;
        }
    }
    else {
        pageName = `${page}`;
    }


    return generatePage(pageName)
}

export default PageRender;