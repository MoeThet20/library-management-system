"use client";
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Face4Icon from "@mui/icons-material/Face4";
import Face3Icon from "@mui/icons-material/Face3";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Colors } from "@/const/colors";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LOGIN } from "@/const/routes";

const drawerWidth = 240;
const LOGOUT = "logout";

const DRAWER_LIST = [
  {
    title: "Dashboard",
    icon: <DashboardIcon sx={{ color: Colors.white }} />,
    routeName: "/admin",
  },
  {
    title: "Teacher",
    icon: <Face4Icon sx={{ color: Colors.white }} />,
    routeName: "/admin/teacher/list",
  },
  {
    title: "Student",
    icon: <Face3Icon sx={{ color: Colors.white }} />,
    routeName: "/admin/student",
  },
  {
    title: "Book",
    icon: <AutoStoriesIcon sx={{ color: Colors.white }} />,
    routeName: "/admin/book",
  },
  {
    title: "Logout",
    icon: <LogoutIcon sx={{ color: Colors.white }} />,
    routeName: LOGOUT,
  },
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface AppProps {
  children: React.ReactNode;
}

const Page: React.FC<AppProps> = ({ children }) => {
  const theme = useTheme();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleGoToRoute = (route: string, title: string) => {
    setSelectedItem(title);
    if (route === LOGOUT) {
      signOut({ callbackUrl: LOGIN });
      return;
    }
    router.push(route);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: Colors.primary_color }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Library Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ backgroundColor: Colors.primary_color }}>
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image src="/logo.jpg" width={50} height={50} alt="logo" />
            <Typography
              style={{ fontWeight: "bold", color: Colors.white, marginLeft: 8 }}
            >
              TU ( Maubin )
            </Typography>
          </div>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: Colors.white }} />
            ) : (
              <ChevronLeftIcon sx={{ color: Colors.white }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ backgroundColor: Colors.primary_color, height: "100vh" }}>
          {DRAWER_LIST.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleGoToRoute(item.routeName, item.title)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item?.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item?.title}
                  sx={{
                    opacity: open ? 1 : 0,
                    color:
                      selectedItem === item?.title
                        ? Colors.secondary_color
                        : Colors.white,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {open &&<div style={{display: 'flex', flex: 1, backgroundColor: Colors.primary_color, padding: 12}}>
          <p style={{color: Colors.white, fontSize: 12}}>Developed by Khine Zaw Htet</p>
        </div>}
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          height: "100vh",
        }}
      >
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};
export default Page;
