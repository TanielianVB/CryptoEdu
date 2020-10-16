import React from "react";
import { Button, Grid } from "@material-ui/core";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";

interface StepperNavigationProps {
  previousStep?: number;
  nextStep?: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

function StepperNavigation(props: StepperNavigationProps) {
  const { previousStep, nextStep, setActiveStep } = props;
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="flex-end"
    >
      {previousStep !== undefined && (
        <Button
          size="small"
          startIcon={<NavigateBeforeRoundedIcon />}
          onClick={(event) => {
            setActiveStep(previousStep);
          }}
        >
          Passo anterior
        </Button>
      )}
      {nextStep !== undefined && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          endIcon={<NavigateNextRoundedIcon />}
          onClick={(event) => {
            setActiveStep(nextStep);
          }}
        >
          Próximo passo
        </Button>
      )}
    </Grid>
  );
}

export default StepperNavigation;
