import { Link, useSearchParams } from "react-router-dom";

const Responded = () => {
  const [searchParams, _] = useSearchParams();
  return (
    <div className="bg-primary mt-56  lg:mt-[10%] mx-3 font-sans flex justify-center items-center font-medium">
      <div className="bg-white p-8 border border-gray-300 shadow-md rounded-lg w-xl text-center">
        <p className="mb-4">
          Your response for
          <span className="font-semibold text-[#4F46E5] mx-1">
            {searchParams.get("formTitle")}
          </span>
          has been recorded
        </p>
        <Link to="/" className="text-blue-600 underline">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
};

export default Responded;
