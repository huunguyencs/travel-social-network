import { Accessibility, Event, Explore, Home, SupervisorAccount, Tune } from "@material-ui/icons";

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
        name: "Lễ hội",
        icon: Event,
        link: "/event"
    },
    {
        name: "Bạn bè",
        icon: SupervisorAccount,
        link: "/friend",
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
];

const profileMenu = [
    {
        name: "Giới Thiệu",
        icon: Home,
        link: "/profile/intro",
    },
    {
        name: "Bài Viết",
        icon: Explore,
        link: "/profile/posts",
    },
    {
        name: "Hành Trình",
        icon: Accessibility,
        link: "/profile/tours",
    },
    {
        name: "Nhóm",
        icon: SupervisorAccount,
        link: "/profile/group",
    },
    {
        name: "Thay đổi thông tin",
        icon: Tune,
        link: "/profile/changeinfo",
    }
]

const groupMenu = [
    {
        name: "Giới Thiệu",
        icon: Home,
        link: "/group",
    },
    {
        name: "Bài Viết",
        icon: Explore,
        link: "/group/posts",
    },
    {
        name: "Thành Viên",
        icon: Accessibility,
        link: "/group/member",
    }
]

export { homeMenu, profileMenu, groupMenu };

