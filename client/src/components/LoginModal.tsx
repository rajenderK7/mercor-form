import { Link } from "react-router-dom";

interface ILoginProps {
  formId: string;
}

const LoginModal = ({ formId }: ILoginProps) => {
  return (
    <div className="bg-primary mt-56  lg:mt-[10%] mx-3 font-sans flex justify-center items-center font-medium">
      <div className="bg-white p-8 border border-gray-300 shadow-md rounded-lg w-xl text-center">
        <p className="mb-4">Please Login or Sign Up to view to the form</p>
        <Link
          to={`/login?redirect=form/${formId}`}
          className="bg-[#4F46E5] text-white py-2 px-4 rounded-md hover:bg-opacity-80 text-sm"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default LoginModal;
