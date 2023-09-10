import { useEffect, useState } from "react";
import { CancelIcon, DeleteIcon, MySwitch } from "./Icons";

export interface QuestionProps {
  questionData: any;
  onUpdate: Function;
  onDelete: Function;
}

const Question = ({ questionData, onUpdate, onDelete }: QuestionProps) => {
  const [type, setType] = useState(questionData.type);
  const [title, setTitle] = useState(questionData.title);
  const [required, setRequired] = useState(questionData.rules.required);
  const [option, setOption] = useState("");
  const [options, setOptions] = useState<string[]>(questionData.options);

  const addOptionHandler = (e: any) => {
    e.preventDefault();
    setOptions((prev) => [...prev, option]);
    setOption("");
  };

  useEffect(() => {
    const updatedData = {
      type,
      title,
      rules: {
        required,
      },
      options,
    };
    onUpdate(updatedData);
  }, [type, title, required, options]);

  return (
    <div className="bg-white border border-gray-300 rounded-md shadow-sm mb-4 p-2 lg:p-6 font-medium text-start w-full">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="w-full lg:w-[70%]">
          <input
            name="question"
            type="text"
            placeholder="Question"
            className="w-full font-medium p-3 outline-none bg-gray-50 border-b-2 border-b-gray-300  text-gray-900  rounded-sm  focus:border-b-[#4F46E5]"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="lg:mx-auto">
          <select
            onChange={(e) => {
              setType(e.target.value);
              setOptions([]);
            }}
            id="types"
            className="mt-3 lg:mt-0 lg:w-full outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-[#4F46E5] focus:border-[#4F46E5] block p-2.5"
            value={type}
          >
            <option value="radio">Multiple choice</option>
            <option value="text">Short answer</option>
            <option value="textarea">Paragraph</option>
            <option value="select">Dropdown</option>
          </select>
        </div>
      </div>
      {/* Options */}
      <div className="flex flex-col justify-start mt-3">
        {(type === "select" || type === "radio") && (
          <>
            {options.map((opt, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-between text-gray-500 my-1"
                >
                  <div>
                    {type === "select" ? <span>☐</span> : <span>⚪</span>}
                    <span className="ml-2" key={idx}>
                      {opt}
                    </span>
                  </div>
                  <button
                    type="button"
                    disabled={idx === 0}
                    className="ml-2 text-sm font-semibold text-black"
                    onClick={() => {
                      if (options.length < 2) return;
                      setOptions((prev) => prev.filter((_, i) => i !== idx));
                    }}
                  >
                    <CancelIcon />
                  </button>
                </div>
              );
            })}
          </>
        )}
        {(type === "select" || type === "radio") && (
          <form onSubmit={addOptionHandler}>
            <input
              name="option"
              type="text"
              className="mt-2 outline-none p-1 text-sm text-gray-900 border-b-2 border-gray-300 bg-gray-50"
              value={option}
              placeholder="Add option"
              required
              onChange={(e) => setOption(e.target.value)}
            />
            <button type="submit" />
          </form>
        )}
      </div>
      {/* Required switch */}
      <div className="flex justify-end space-x-3 mt-4 md:mt-3">
        <button onClick={() => onDelete()}>
          <DeleteIcon />
        </button>
        <div className="border-l border-l-gray-300"></div>
        <div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              name="required"
              type="checkbox"
              value="required"
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
              className="sr-only peer"
            />
            <MySwitch text="Required" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Question;
