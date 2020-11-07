import React from "react";
import {
  Grid,
  GridJustification,
  TextField,
  Typography,
} from "@material-ui/core";
import BitTextField from "../BitTextField/BitTextField";
import Utils from "../../utils/Utils";

interface BitsFieldProps {
  bits: number[];
  justify?: GridJustification;
  addChar?: boolean;
  gridItem?: boolean;
  className?: string;
  style?: React.CSSProperties;
  accent?: number | number[];
  focus?: number | number[];
  accentNumbers?: boolean;
}

function BitArrayField(props: BitsFieldProps) {
  const {
    bits,
    justify,
    addChar,
    gridItem,
    className,
    style,
    accent,
    focus,
    accentNumbers,
  } = props;

  let values: string[] = new Array(bits.length);

  for (let index = 0; index < bits.length; index++) {
    const element = bits[index];
    values[index] = element !== undefined ? element.toString() : " ";
  }

  const isAccent = (position: number): boolean => {
    if (typeof accent === "number") {
      return position === accent;
    } else if (accent !== undefined) {
      return accent.includes(position);
    }
    return false;
  };

  const isFocus = (position: number): boolean => {
    if (typeof focus === "number") {
      return position === focus;
    } else if (focus !== undefined) {
      return focus.includes(position);
    }
    return false;
  };

  return (
    <Grid
      item={gridItem}
      container
      justify={justify}
      alignItems="center"
      spacing={1}
      className={className}
      style={style}
    >
      {values.map((b, i) => {
        const position = i + 1;
        return (
          <Grid item key={position}>
            <BitTextField
              position={position.toString()}
              value={b.toString()}
              accent={isAccent(position)}
              focus={isFocus(position)}
              accentNumber={accentNumbers}
            />
          </Grid>
        );
      })}
      {addChar && (
        <>
          <Grid item>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              =
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Char"
              variant="outlined"
              size="small"
              style={{ width: "52px" }}
              value={Utils.getChar(bits)}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default BitArrayField;
