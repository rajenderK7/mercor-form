import { atom } from "recoil";

export interface IUser {
  userId: string;
  name: string;
  email: string;
}

const user: IUser = JSON.parse(localStorage.getItem("user") ?? "{}");

const userAtom = atom({
  key: "user",
  default: user,
});

export default userAtom;
