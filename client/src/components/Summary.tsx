import { useEffect, useState } from "react";
import formActions from "../actions/form.actions";
import Response from "./Response";
import { IFormResponse } from "./Responses";

interface SummaryProps {
  types: any[];
  // formId: string;
  summary: Q;
}

interface Q {
  [q: string]: string[];
}

const Summary = ({ types, summary }: SummaryProps) => {
  //   const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [summary, setSummary] = useState<Q>({});

  //   const fetchFormQuestions = async () => {
  //     const data = await formActions.fetchFormQuestions(formId);
  //     const types = data.types.map((t: any) => t.type);
  //     setTypes(types);
  //   };

  //   const fetchResponses = async () => {
  //     setLoading(true);
  //     const data = await formActions.fetchResponses(formId);

  //     const responses: Q = {};

  //     data.forEach((response: IFormResponse) => {
  //       Object.keys(response.formData).forEach((q) => {
  //         if (q in responses) {
  //           responses[q].push(response.formData[q]);
  //         } else {
  //           responses[q] = [response.formData[q]];
  //         }
  //       });
  //     });

  //     setSummary(responses);
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     fetchFormQuestions();
  //     fetchResponses();
  //   }, []);
  return (
    <div className="w-full">
      {loading && <p className="text-center">Loading..</p>}
      {!loading &&
        Object.keys(summary).map((q, idx) => {
          return (
            <Response
              key={idx}
              question={q}
              responses={summary[q]}
              type={types[idx]}
            />
          );
        })}
      {!loading && Object.keys(summary).length === 0 && (
        <p className="text-center">No responses yet..</p>
      )}
    </div>
  );
};

export default Summary;
