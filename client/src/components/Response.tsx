import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

interface ResponseProps {
  type: string;
  question: string;
  responses: string[];
}

const Response = ({ type, question, responses }: ResponseProps) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const count: any = {};
  let data: any = {};
  if (type === "radio" || type === "select") {
    responses.forEach((e: string) => (count[e] ? count[e]++ : (count[e] = 1)));
    data = {
      labels: Object.keys(count),
      datasets: [
        {
          label: "# of Votes",
          data: Object.values(count),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }
  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm mb-4 p-6 font-medium text-start text-sm w-full">
      <p className="font-semibold">{question}</p>
      <p className="text-xs mt-1 mb-2">{responses.length} responses</p>
      <div className="text-xs">
        {type === "radio" || type === "select" ? (
          <div className="w-56">
            <Pie data={data} />
          </div>
        ) : (
          responses.map((reponse, idx) => {
            return (
              <p key={idx} className="my-1 bg-gray-100 p-2 rounded-md">
                {reponse}
              </p>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Response;
