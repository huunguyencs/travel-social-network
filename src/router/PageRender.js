import React from "react";
import { useParams } from "react-router-dom";

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
    const { page, id, subpage } = useParams();

    var pageName = "";

    if (page === "admin") {
        if (id) {
            if (subpage) {
                pageName = `admin/${id}/${subpage}`;
            }
            else {
                pageName = `admin/${id}`;
            }
        }
        else {
            pageName = `admin`
        }
    }
    else {
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
    }


    return generatePage(pageName)
}

export default PageRender;