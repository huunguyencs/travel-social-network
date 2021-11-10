import React from "react";
import { useParams } from "react-router-dom";

import NotFound from "../page/404";

const generatePage = (pageName) => {
    const component = () => require(`../page/admin/${pageName}`).default;


    try {
        return React.createElement(component())
    }
    catch (err) {
        return <NotFound />;
    }
}

const AdminPageRender = () => {
    const { page, id } = useParams();
    var pageName = "";

    if (id) {
        pageName = `${page}/id`;
    }
    else {
        pageName = `${page}`;
    }
    return generatePage(pageName)
}

export default AdminPageRender;