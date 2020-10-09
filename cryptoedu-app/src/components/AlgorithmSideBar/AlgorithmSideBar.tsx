import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import AppDrawer from "../AppDrawer/AppDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function AlgorithmSideBar() {
  const classes = useStyles();
  return (
    <AppDrawer anchor="right">
      <div className={classes.content}>
        <Typography variant="h6" color="secondary">
          DES
        </Typography>
        <Typography variant="body2" color="textPrimary">
          Descrição e características do algorítimo.
        </Typography>
        <Typography variant="body2" color="textPrimary">
          Descrição e características do algorítimo. Consequat mauris nunc congue
          nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi
          etiam dignissim diam. Pulvinar elementum integer enim neque volutpat
          ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus.
          Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed
          odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec
          nam aliquam sem et tortor. Habitant morbi tristique senectus et.
          Adipiscing elit duis tristique sollicitudin nibh sit. Ornare aenean
          euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam
          ultrices sagittis orci a.
        </Typography>
      </div>
    </AppDrawer>
  );
}

export default AlgorithmSideBar;
