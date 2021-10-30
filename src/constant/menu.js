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

export { homeMenu };

