import Response from "./Response";

interface SummaryProps {
  types: any[];
  summary: Q;
}

interface Q {
  [q: string]: string[];
}

const Summary = ({ types, summary }: SummaryProps) => {
  return (
    <div className="w-full">
      {Object.keys(summary).length === 0 ? (
        <p className="text-center">No responses yet..</p>
      ) : (
        Object.keys(summary).map((q, idx) => {
          return (
            <Response
              key={idx}
              question={q}
              responses={summary[q]}
              type={types[idx]}
            />
          );
        })
      )}
    </div>
  );
};

export default Summary;
