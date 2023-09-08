import { useEffect, useState } from "react";
import formActions from "../actions/form.actions";
import Response from "./Response";

interface SummaryProps {
  formId: string;
}

interface IFormResponse {
  userId: string;
  formId: string;
  formData: {
    [field: string]: string;
  };
}

interface Q {
  [q: string]: string[];
}

const Summary = ({ formId }: SummaryProps) => {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Q>({});

  const fetchResponses = async () => {
    setLoading(true);
    const data = await formActions.fetchResponses(formId);

    const responses: Q = {};

    data.forEach((response: IFormResponse) => {
      Object.keys(response.formData).forEach((q) => {
        if (q in responses) {
          responses[q].push(response.formData[q]);
        } else {
          responses[q] = [response.formData[q]];
        }
      });
    });

    setSummary(responses);
    setLoading(false);
  };

  useEffect(() => {
    fetchResponses();
  }, []);
  return (
    <div className="w-full">
      {loading && <p className="text-center">Loading..</p>}
      {!loading &&
        Object.keys(summary).map((q, idx) => {
          return <Response key={idx} question={q} responses={summary[q]} />;
        })}
    </div>
  );
};

export default Summary;
