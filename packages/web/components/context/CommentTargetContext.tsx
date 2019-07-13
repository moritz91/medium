import { createContext } from "react";

export interface CommentTargetContextProps {
  target: string | undefined;
  setTarget: React.Dispatch<React.SetStateAction<string | undefined>>;
  ref3: React.RefObject<HTMLDivElement>;
}

export const CommentTargetContext = createContext<CommentTargetContextProps>({
  target: "",
  setTarget: () => {},
  ref3: { current: null }
});
