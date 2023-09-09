import { useState } from "react";
import authActions from "../actions/auth.actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import toast from "react-hot-toast";
import userAtom from "../state/auth";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [searchParams, _] = useSearchParams();
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const data = await authActions.signUp({ name, email, password });
    if (data.message === "success") {
      toast.success("Login to continue");
      setIsNewUser(false);
      return;
    }
    toast.error(data.message);
  };

  const handleLogin = async () => {
    const data = await authActions.login({ email, password });
    if (data.message === "success") {
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Login successful");
      const redirectURL = searchParams.get("redirect");
      if (redirectURL) {
        navigate(`/${redirectURL}`, {
          replace: true,
        });
        return;
      }
      navigate("/dashboard", {
        replace: true,
      });
      return;
    }
    toast.error(data.message);
  };

  return (
    <div className="bg-[#EEF3FE] mx-auto w-full px-4 lg:px-0 flex justify-center h-screen -mt-14 items-center">
      <div className="bg-white p-8 border border-gray-300 shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-semibold  mb-4 text-[#4F46E5]">
          {isNewUser ? "Sign Up" : "Login"}
        </h2>
        <form>
          {isNewUser && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-medium mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-purple-50 border outline-purple-500 border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#4F46E5] focus:border-[#4F46E5] block w-full p-2.5 mb-4"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-purple-50 border outline-purple-500 border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#4F46E5] focus:border-[#4F46E5] block w-full p-2.5 mb-4"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-purple-50 border outline-purple-500 border-purple-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#4F46E5] focus:border-[#4F46E5] block w-full p-2.5 mb-4"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 text-sm font-medium">
            {isNewUser ? (
              <button
                type="button"
                className="bg-[#4F46E5] text-white py-2 px-4 rounded-md hover:bg-opacity-80"
                onClick={handleSignup}
              >
                Sign Up
              </button>
            ) : (
              <button
                type="button"
                className="bg-[#4F46E5] text-white py-2 px-4 rounded-md hover:bg-opacity-80"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </div>
        </form>
        <p className="text-gray-500 text-sm">
          {isNewUser ? "Already have an account?" : "Don't have an account?"}
          <button
            className="text-[#4F46E5] ml-1 underline"
            onClick={() => setIsNewUser(!isNewUser)}
          >
            {isNewUser ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
