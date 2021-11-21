import { Accessibility, Explore, Home, SupervisorAccount, Tune, Whatshot } from "@material-ui/icons";

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
            icon: Explore,
            link: "/posts",
        },
        {
            name: "Hành Trình",
            icon: Accessibility,
            link: "/tours",
        },
        {
            name: "Nhóm",
            icon: SupervisorAccount,
            link: "/group",
        },
        {
            name: "Thay đổi thông tin",
            icon: Tune,
            link: "/changeinfo",
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

export { homeMenu, profileMenu, groupMenu };

