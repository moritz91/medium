import { createContext } from "react";
import { UserInfoFragment } from "../../../components/apollo-components";

export interface ContextProps {
  title: string;
  creator: UserInfoFragment;
  postingId: string;
}

export const PostContext = createContext<ContextProps>({
  title: "",
  creator: { id: "", username: "", pictureUrl: "", bio: "" },
  postingId: ""
});
