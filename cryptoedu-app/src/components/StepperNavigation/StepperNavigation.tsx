import React from "react";
import { Button, Grid } from "@material-ui/core";
import NavigateBeforeRoundedIcon from "@material-ui/icons/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@material-ui/icons/NavigateNextRounded";
import RotateLeftRoundedIcon from "@material-ui/icons/RotateLeftRounded";

interface StepperNavigationProps {
  previousStep?: number;
  nextStep?: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}

function StepperNavigation(props: StepperNavigationProps) {
  const { previousStep, nextStep, setActiveStep } = props;

  const justify = previousStep !== undefined ? "space-between" : "flex-end";

  return (
    <Grid container direction="row" justify={justify} alignItems="flex-end">
      {previousStep !== undefined && (
        <Button
          startIcon={<NavigateBeforeRoundedIcon />}
          onClick={(event) => {
            setActiveStep(previousStep);
          }}
        >
          Anterior
        </Button>
      )}
      {nextStep !== undefined && (
        <Button
          variant="contained"
          color="primary"
          endIcon={<NavigateNextRoundedIcon />}
          onClick={(event) => {
            setActiveStep(nextStep);
          }}
        >
          Próximo
        </Button>
      )}
      {nextStep === undefined && (
        <Button
          endIcon={<RotateLeftRoundedIcon />}
          onClick={(event) => {
            setActiveStep(0);
          }}
        >
          Reiniciar
        </Button>
      )}
    </Grid>
  );
}

export default StepperNavigation;
