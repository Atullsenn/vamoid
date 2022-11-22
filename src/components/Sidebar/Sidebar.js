import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  SettingsApplicationsIcon as settingIcon,
  SettingsApplications,
  SupervisorAccount,
  VpnKey,
  Security,
  ContactSupport,
  QuestionAnswer,
  Subscriptions,
  
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  {
    id: 0,
    label: "Dashboard",
    link: "/app/dashboard",
    icon: <HomeIcon />
  },

  {
    id: 5,
    label: "Manage Admins",
    link: "/app/admin",
    icon: <SupervisorAccount />,
  },
  {
    id: 6,
    label: "Manage Merchants",
    link: "/app/merchants",
    icon: <SupervisorAccount />,
  },
  {
    id: 2,
    label: "Settings",
    link: "/app/settings",
    icon: <SettingsApplications />
  },
  {
    id: 1,
    label: "Notifications",
    link: "/app/notifications",
    icon: <NotificationsIcon />
  },
  // {
  //   id: 50,
  //   label: "Subscriptions",
  //   link: "/app/subscriptions",
  //   icon: <Subscriptions/>,
  // },
  {
    id: 7,
    label: "Contact Us",
    link: "/app/contact-us",
    icon: <ContactSupport />,
  },
  {
    id: 15,
    label: "FAQ",
    link: "/app/faq",
    icon: <QuestionAnswer />,
  },
  {
    id: 9,
    label: "Terms & Services",
    link: "/app/terms-and-services",
    icon: <Security />,
  },
  {
    id: 8,
    label: "Privacy Policy",
    link: "/app/privacy-policy",
    icon: <VpnKey />,
  },
  
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
