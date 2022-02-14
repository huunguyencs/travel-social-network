import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import NotFound from "../page/404";

const GeneratePage = (pageName) => {
    const component = () => require(`../page/${pageName}`).default;

    try {
        return React.createElement(component())
    }
    catch (err) {
        return <NotFound />;
    }
}

const PageRender = () => {
    const { user } = useSelector(state => state.auth);
    const { page, id, subpage } = useParams();

    var pageName = "";

    if (page === "admin") {
        if (user && user.role) {
            if (id) {
                if (subpage) {
                    pageName = `admin/${id}/id`;
                }
                else {
                    pageName = `admin/${id}`;
                }
            }
            else {
                pageName = `admin`
            }
        }
        else
            pageName = "blank"
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

    console.log(pageName);

    return GeneratePage(pageName)
}

export default PageRender;