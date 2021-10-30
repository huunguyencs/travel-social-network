import { Accessibility, Explore, Home, SupervisorAccount, Tune } from "@material-ui/icons";

const homeMenu = [
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
        name: "Dịch vụ",
        icon: Accessibility,
        link: "/service",
    },
    {
        name: "Bạn bè",
        icon: SupervisorAccount,
        link: "/friend",
    },
    {
        name: "Cài đặt",
        icon: Tune,
        link: "setting",
    }
];

const profileMenu = [
    {
        name: "Giới Thiệu",
        icon: Home,
        link: "/:id/intro",
    },
    {
        name: "Bài Viết",
        icon: Explore,
        link: "/:id/post",
    },
    {
        name: "Hành Trình",
        icon: Accessibility,
        link: "/:id/tour",
    },
    {
        name: "Nhóm",
        icon: SupervisorAccount,
        link: "/:id/group",
    },
    {
        name: "Thay đổi thông tin",
        icon: Tune,
        link: "/:id/changeinfo",
    }
]

export { homeMenu, profileMenu };

