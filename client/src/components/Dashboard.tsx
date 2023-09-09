import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import plus from "../assets/plus.svg";
import CenterWrapper from "./CenterWrapper";
import userAtom from "../state/auth";
import { useRecoilValue } from "recoil";

const Dashboard = () => {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate("/login", {
        replace: true,
      });
    }
  }, []);

  return (
    <>
      <div className=" bg-slate-100">
        <CenterWrapper>
          <p className="mb-4 font-medium">Start a new form</p>
          <div className="flex">
            <Link to="/create" className="flex flex-col text-sm font-medium">
              <div className="w-40 h-36 rounded-sm bg-white p-4 border border-gray-300 hover:border-blue-800 mb-2 flex items-center justify-center ">
                <img src={plus} alt="Create" width={60} height={60} />
              </div>
              Blank
            </Link>
          </div>
        </CenterWrapper>
      </div>
      <CenterWrapper>
        <p className="font-medium">Recent forms</p>
        {/* My forms */}
      </CenterWrapper>
    </>
  );
};

export default Dashboard;
