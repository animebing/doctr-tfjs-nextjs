import { useRef, useState } from "react";

export function useStateWithRef(initialState) {
  const [state, setState] = useState(initialState);
  const ref = useRef(initialState);
  const handleState = (value) => {
    ref.current = value;
    setState(value);
  };
  return [state, handleState, ref];
}
