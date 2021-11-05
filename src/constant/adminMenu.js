
import { Accessibility, Dashboard, Group, LocationOn, Person, PostAdd, RateReview } from '@material-ui/icons';


export const adminListMenu = [
    {
        icon: Dashboard,
        name: "Tổng quan",
        link: "/admin",
    },
    {
        icon: Person,
        name: "Người dùng",
        link: "/admin/users",
    },
    {
        icon: Accessibility,
        name: "Dịch vụ",
        link: "/admin/services",
    },
    {
        icon: LocationOn,
        name: "Địa điểm",
        link: "/admin/locations",
    },
    {
        icon: Group,
        name: "Nhóm",
        link: "/admin/groups",
    },
    {
        icon: PostAdd,
        name: "Bài viết",
        link: "/admin/posts",
    },
    {
        icon: RateReview,
        name: "Review",
        link: "/admin/reviews",
    },
]
