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

  const justify =
    previousStep !== undefined && nextStep !== undefined
      ? "space-between"
      : previousStep !== undefined
      ? "flex-start"
      : "flex-end";

  return (
    <Grid container direction="row" justify={justify} alignItems="flex-end">
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
