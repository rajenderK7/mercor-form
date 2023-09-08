interface ResponseProps {
  question: string;
  responses: string[];
}

const Response = ({ question, responses }: ResponseProps) => {
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm mb-4 p-6 font-medium text-start text-sm w-full">
      <p className="font-semibold">{question}</p>
      <p className="text-xs">{responses.length} responses</p>
      <div className="text-xs mt-2">
        {responses.map((reponse, idx) => {
          return (
            <p key={idx} className="my-1 bg-gray-100 p-2 rounded-md">
              {reponse}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Response;
