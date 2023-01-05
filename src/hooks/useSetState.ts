import { Dispatch, Reducer, useReducer } from "react";

const mergeStates = <TState extends Record<string, unknown>>(
  oldState: TState,
  newState: Partial<TState>
): TState => ({...oldState, ...newState});

export const useSetState = <TState extends Record<string, unknown>>(
  initialState: TState
): readonly [TState, Dispatch<Partial<TState>>] => {
  const [state, setState] = useReducer<Reducer<TState, Partial<TState>>>(
    mergeStates,
    initialState
  );

  return [state, setState] as const;
}