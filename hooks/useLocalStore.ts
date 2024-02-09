import { useEffect } from "react";

type Props = {
  id: string;
  state: any;
};

const useLocalStore = ({ id, state }: Props) => {
  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(state));
  }, [state]);
};

export default useLocalStore;
