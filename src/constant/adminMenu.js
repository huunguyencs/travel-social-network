
import { Accessibility, Dashboard, Group, LocationOn, Person, PostAdd, RateReview } from '@material-ui/icons';


export const adminListMenu = {
    prefix: "admin",
    menu: [
        {
            icon: Dashboard,
            name: "Tổng quan",
            link: "/admin",
        },
        {
            icon: Person,
            name: "Người dùng",
            link: "/admin/user",
        },
        {
            icon: Accessibility,
            name: "Dịch vụ",
            link: "/admin/service",
        },
        {
            icon: LocationOn,
            name: "Địa điểm",
            link: "/admin/location",
        },
        {
            icon: Group,
            name: "Tỉnh",
            link: "/admin/province",
        },
        {
            icon: PostAdd,
            name: "Bài viết",
            link: "/admin/post",
        },
        {
            icon: RateReview,
            name: "Review",
            link: "/admin/review",
        },
    ]
}
