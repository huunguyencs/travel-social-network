import { Accessibility, Explore, Home, Tune, Whatshot, Public, Toc } from "@material-ui/icons";

const homeMenu = {
    prefix: "",
    menu: [
        {
            name: "Trang chủ",
            icon: Home,
            link: "/",
        },
        {
            name: "Hành trình",
            icon: Explore,
            link: "/tour",
        },
        {
            name: "Hot",
            icon: Whatshot,
            link: "/hot"
        },
        {
            name: "Dịch vụ",
            icon: Accessibility,
            link: "/service",
        },
        {
            name: "Tình nguyện",
            icon: Public,
            link: '/volunteer'
        },
        {
            name: "Cài đặt",
            icon: Tune,
            link: "/setting",
        }
    ]
};

const profileMenu = {
    prefix: "profile",
    menu: [
        {
            name: "Giới Thiệu",
            icon: Home,
            link: "/",
        },
        {
            name: "Bài Viết",
            icon: Toc,
            link: "/posts",
        },
        {
            name: "Hành Trình",
            icon: Explore,
            link: "/tours",
        }
    ]
};

const groupMenu = {
    prefix: "group",
    menu: [
        {
            name: "Giới Thiệu",
            icon: Home,
            link: "/group",
        },
        {
            name: "Bài Viết",
            icon: Explore,
            link: "/posts",
        },
        {
            name: "Thành Viên",
            icon: Accessibility,
            link: "/member",
        }
    ]
};

const serviceMenu = {
    prefix: "service",
    menu: [
        {
            name: "Dịch vụ",
            icon: Accessibility,
            link: "/"
        },
        {
            name: "Bài viết",
            icon: Toc,
            link: "/posts"
        },
        {
            name: "Hành trình",
            icon: Explore,
            link: "/tours"
        },
    ]
}

export { homeMenu, profileMenu, groupMenu, serviceMenu };

