export const Error = ({ children }: any) => (
  <p className="mt-2 text-red-500 text-sm">{children}</p>
);

const FormField = ({ value, onChange, type, ...rest }: any) => {
  switch (type) {
    case "text":
      return (
        <input
          className="w-full lg:w-2/5 mt-1 border-b-2 border-b-gray-300 py-1  focus:border-b-[#4F46E5] focus:ring-white focus:border-white outline-none"
          type="text"
          placeholder={rest?.placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value || ""}
        />
      );
    case "textarea":
      return (
        <textarea
          className="mt-3 block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder={rest?.placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value || ""}
        />
      );
    case "email":
      return (
        <input
          className="w-full lg:w-2/5 mt-2 border-b border-b-gray-300 py-1  focus:border-b-[#4F46E5] focus:ring-white focus:border-white outline-none"
          type="email"
          placeholder={rest?.placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value || ""}
        />
      );
    case "radio":
      return rest?.options.map((e: string) => (
        <div key={e} className="flex items-center mt-3">
          <input
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 cursor-pointer"
            type="radio"
            value={e}
            onChange={(event) => onChange(event.target.value)}
            checked={value === e}
          />
          <label className="ml-2">{e}</label>
        </div>
      ));
    case "checkbox":
      return rest?.options.map((e: string) => (
        <div key={e} className="flex space-x-1 items-center mt-2">
          <input
            name={e}
            className="border-b border-b-gray-300 py-1 focus:border-b-[#4F46E5] focus:ring-white focus:border-white outline-none"
            type="checkbox"
            onChange={(event) => onChange(event.target.checked)}
          />
          <p className="ml-2">{e}</p>
        </div>
      ));
    case "select":
      return (
        <select
          className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 cursor-pointer"
          onChange={(e) => onChange(e.target.value)}
          defaultValue={rest?.options[0]}
        >
          {rest?.options.map((option: string, index: number) => (
            <option disabled={index === 0} key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

    default:
      return null;
  }
};

export default FormField;
