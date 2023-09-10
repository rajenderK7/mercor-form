interface ResponseQuestionsProps {
  questions: any[];
}

const ResponseQuestions = ({ questions }: ResponseQuestionsProps) => {
  return (
    <div>
      {questions.map((q, idx) => (
        <p
          key={idx}
          className="my-1 bg-white p-2 rounded-md text-start border border-gray-200 shadow-sm"
        >
          {q.title}
        </p>
      ))}
    </div>
  );
};

export default ResponseQuestions;
