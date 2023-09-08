import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import userAtom, { IUser } from "../state/auth";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Avatar,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import authActions from "../actions/auth.actions";

const Navbar = () => {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (authActions.logout()) {
      setUser({} as IUser);
      navigate("/login", {
        replace: true,
      });
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full h-14 flex justify-between items-center border bg-white border-gray-200 px-4 fixed top-0">
      <Link to="/dashboard" className="font-semibold text-xl text-[#4F46E5]">
        Mercor Form
      </Link>
      {user.email ? (
        <Popover placement="bottom-end" arrowShadowColor="#4F46E5">
          <PopoverTrigger>
            <Avatar name={user.name} size="sm" bg="#4F46E5" cursor="pointer" />
          </PopoverTrigger>
          <PopoverContent
            zIndex={10}
            border="1px solid #4F46E5"
            width="fit-content"
            className="font-sans text-sm selection:bg-[#4F46E5] selection:text-white shadow-md border border-gray-500"
          >
            <PopoverHeader>
              <p className="text-lg">
                Hi,
                <span className="ml-1 font-bold  text-[#4F46E5]">
                  {user.name}
                </span>
              </p>
            </PopoverHeader>
            <PopoverArrow />
            <PopoverBody>
              <strong>Email</strong>
              <p className="font-medium mb-2">{user.email}</p>
              <strong>User ID</strong>
              <p>{user.userId}</p>
            </PopoverBody>
            <PopoverFooter className="text-center w-full bg-gray-100 rounded-b-md">
              <button onClick={handleLogout} className="font-medium w-full">
                Log out
              </button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="font-medium text-[#4F46E5]">Login</div>
      )}
    </div>
  );
};

export default Navbar;
