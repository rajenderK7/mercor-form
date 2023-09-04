import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-14 flex justify-between items-center border bg-white border-gray-200 px-4 fixed top-0">
      <Link to="/dashboard" className="font-semibold text-xl text-[#4F46E5]">
        Mercor Form
      </Link>
      <div className="font-medium text-[#4F46E5]">Account</div>
    </div>
  );
};

export default Navbar;
