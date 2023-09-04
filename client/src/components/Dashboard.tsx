import { Link } from "react-router-dom";
import plus from "../assets/plus.svg";
import CenterWrapper from "./CenterWrapper";

const Dashboard = () => {
  return (
    <div className="flex bg-slate-100 py-6">
      <CenterWrapper>
        <Link
          to="/create"
          className="flex flex-col text-sm font-medium text-center"
        >
          <div className="w-32 h-32 rounded-md bg-white p-4 border border-gray-300 hover:border-gray-500 mb-2 flex items-center justify-center ">
            <img src={plus} alt="Create" width={80} height={80} />
          </div>
          Create
        </Link>
      </CenterWrapper>
    </div>
  );
};

export default Dashboard;
