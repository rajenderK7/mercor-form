import { atom } from "recoil";

const user = JSON.parse(localStorage.getItem("user") ?? "{}");

const userAtom = atom({
  key: "user",
  default: user,
});

export default userAtom;
