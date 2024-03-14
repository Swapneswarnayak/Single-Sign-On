import { IconLayoutDashboard } from "@tabler/icons-react";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { uniqueId } from "lodash";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
const Menuitems: any =  [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      {
        id: uniqueId(),
        title: "Modules",
        icon: ViewModuleIcon,
        href: "/module",
      },
      {
        id: uniqueId(),
        title: "Roles",
        icon: PersonIcon,
        href: "/role",
      },
      {
        id: uniqueId(),
        title: "Module Role Create",
        icon: PersonIcon,
        href: "/moduleRole",
      },
      {
        id: uniqueId(),
        title: "User",
        icon: PersonAddIcon,
        href: "/user",
      },
      {
        id: uniqueId(),
        title: "Designation",
        icon: PermContactCalendarIcon,
        href: "/designation",
      },
    ]

    const MenuitemsforUser: any =  [
      {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
      },
      
    ]
  

export { Menuitems,MenuitemsforUser};