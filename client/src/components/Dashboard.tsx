import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import plus from "../assets/plus.svg";
import CenterWrapper from "./CenterWrapper";
import userAtom from "../state/auth";
import { useRecoilValue } from "recoil";
import formActions from "../actions/form.actions";
import MyFrom from "./MyFrom";
import Spinner from "./Spinner";

const BlankButton = () => {
  return (
    <Link to="/create" className="flex flex-col text-sm font-medium">
      <div className="w-40 h-36 rounded-sm bg-white p-4 border border-gray-300 hover:border-blue-800 mb-2 flex items-center justify-center ">
        <img src={plus} alt="Create" width={60} height={60} />
      </div>
      Blank
    </Link>
  );
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [myForms, setMyForms] = useState([]);
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();

  const fetchMyForms = async () => {
    setLoading(true);
    const data = await formActions.fetchMyForms(user.userId);
    if (data.message === "success") {
      setMyForms(data.forms);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login", {
        replace: true,
      });
    }
    fetchMyForms();
  }, []);

  return (
    <>
      <div className=" bg-slate-100">
        <CenterWrapper>
          <p className="mb-4 font-medium">Start a new form</p>
          <div className="flex">
            <BlankButton />
          </div>
        </CenterWrapper>
      </div>
      <CenterWrapper>
        <p className="font-medium">Recent forms</p>
        {/* My forms */}
        <div className="py-4">
          {loading && (
            <div className="flex justify-center">
              <Spinner />
            </div>
          )}
          {!loading && myForms.length === 0 && (
            <p className="text-center">No forms yet. Create now</p>
          )}
          {myForms.length > 0 &&
            myForms.map((e: any, idx: any) => {
              return <MyFrom key={idx} e={e} fetchMyForms={fetchMyForms} />;
            })}
        </div>
      </CenterWrapper>
    </>
  );
};

export default Dashboard;
