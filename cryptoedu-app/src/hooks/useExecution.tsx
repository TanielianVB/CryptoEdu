import { Dispatch, useReducer } from "react";

interface ExecutionState {
  position: number;
  step: "start" | "permutation" | "input" | "output" | "finish";
}

type ExecutionAction = "prev" | "next" | "first" | "last";

function useExecution(
  maxLength: number
): [ExecutionState, Dispatch<ExecutionAction>] {
  const executionReducer = (
    state: ExecutionState,
    action: ExecutionAction
  ): ExecutionState => {
    switch (action) {
      case "first":
        return { position: 0, step: "start" };
      case "prev":
        switch (state.step) {
          case "start":
            return { position: 0, step: "start" };
          case "permutation":
            const position = state.position - 1;
            if (position === 0) {
              return { position: 0, step: "start" };
            } else {
              return { position: position, step: "output" };
            }
          case "input":
            return { position: state.position, step: "permutation" };
          case "output":
            return { position: state.position, step: "input" };
          case "finish":
            return { position: maxLength, step: "output" };
          default:
            throw new Error();
        }
      case "next":
        switch (state.step) {
          case "start":
            return { position: 1, step: "permutation" };
          case "permutation":
            return { position: state.position, step: "input" };
          case "input":
            return { position: state.position, step: "output" };
          case "output":
            if (state.position === maxLength) {
              return { position: 0, step: "finish" };
            } else {
              return { position: state.position + 1, step: "permutation" };
            }
          case "finish":
            return { position: 0, step: "start" };
          default:
            throw new Error();
        }
      case "last":
        return { position: 0, step: "finish" };
      default:
        throw new Error();
    }
  };

  const [executionState, executionDispatch] = useReducer(executionReducer, {
    position: 0,
    step: "start",
  });

  return [executionState, executionDispatch];
}

export default useExecution;
