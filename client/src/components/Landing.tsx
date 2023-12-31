import CenterWrapper from "./CenterWrapper";
import formImg from "../assets/form-img.png";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../state/auth";
import { useEffect } from "react";

const Landing = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.email) {
      navigate("/dashboard", {
        replace: true,
      });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center h-screen -mt-14">
      <CenterWrapper>
        <div className="flex flex-col lg:flex-row lg:items-center">
          <div className="flex flex-col justify-start items-start">
            <div className="text-5xl lg:text-6xl font-semibold max-w-md leading-[56px] lg:leading-[72px] mb-4 lg:mb-8 text-start">
              Get insights quickly, with Mercor Forms
            </div>
            <p className="mb-3 lg:mb-6 lg:text-lg text-gray-500">
              Easily create and share online forms and surveys, and analyze
              responses in real-time.
            </p>
            <Link
              to="/login"
              type="button"
              className="bg-[#4F46E5] text-center font-medium  text-white w-60 max-w-[320px] py-3 rounded-sm  hover:bg-opacity-90"
            >
              Continue to Forms
            </Link>
            <p className="text-gray-500 text-sm mt-5">
              Don't have an account?
              <Link to="/login" className="text-[#4F46E5] ml-1 underline">
                Sign Up
              </Link>
            </p>
          </div>
          <img
            src={formImg}
            alt="Form Image"
            className="lg:w-[50%] mt-5 lg:mt-0"
          />
        </div>
      </CenterWrapper>
    </div>
  );
};

export default Landing;
