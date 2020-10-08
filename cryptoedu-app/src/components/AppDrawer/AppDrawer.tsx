import React from "react";
import { Drawer, Toolbar } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface AppDrawerProps {
  anchor: "bottom" | "left" | "right" | "top";
  children?: any;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: theme.palette.primary.main,
    },
    drawerContainer: {
      overflow: "auto",
    },
  })
);

function AppDrawer(props: AppDrawerProps) {
  const { anchor, children } = props;

  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      anchor={anchor}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar variant="dense" />
      <div className={classes.drawerContainer}>{children}</div>
    </Drawer>
  );
}

export default AppDrawer;
