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
  DeveloperMode,
  Person as AccountIcon,
  Subscriptions,
  Payment

} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

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
    id: 1,
    label: "Manage Applications",
    link: "/app/merchant/all-application-lists/",
    icon: <DeveloperMode />
  },

  {
    id: 2,
    label: "Manage App Users",
    link: "/app/merchant/manage-appusers",
    icon: <SupervisorAccount />
  },
  // {
  //   id: 3,
  //   label: "Manage Subscriptions",
  //   link: "/app/merchant/managesubscriptions",
  //   icon: <Subscriptions />
  // },
  // {
  //   id: 4,
  //   label: "payments",
  //   link: "/app/merchant/payments",
  //   icon: <Payment />
  // },
  {
    id: 5,
    label: "Settings",
    link: "/app/merchant/settings",
    icon: <SettingsApplications />
  },
  {
    id: 6,
    label: "Notifications",
    link: "/app/merchant/notifications",
    icon: <NotificationsIcon />
  },
  {
    id: 7,
    label: "Contact Us",
    link: "/app/merchant/contact-us",
    icon: <ContactSupport />,
  },
  {
    id: 8,
    label: "Terms & Services",
    link: "/app/merchant/terms-and-services",
    icon: <Security />,
  },
  {
    id: 9,
    label: "Privacy Policy",
    link: "/app/merchant/privacy-policy",
    icon: <VpnKey />,
  },
  {
    id: 10,
    label: "FAQ",
    link: "/app/merchant/faq",
    icon: <QuestionAnswer />,
  },
  {
    id: 11,
    label: "Developers Api",
    link: "/app/merchant/developersapi",
    icon: <DeveloperMode />
  },
  {
    id: 12,
    label: "Logout",
    link: "/app/merchant/logout",
    icon: <AccountIcon />
  },
];

function MerchantSidebar({ location }) {
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

export default withRouter(MerchantSidebar);
