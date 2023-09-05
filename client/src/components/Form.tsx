import { Controller, useForm } from "react-hook-form";

interface IFormField {
  type: "text" | "radio" | "email" | "select" | "checkbox";
  title: string;
  placeholder?: string;
  options?: string[];
  rules: {
    required: boolean;
  };
}

const dummyData: IFormField[] = [
  {
    type: "text",
    title: "What is your name?",
    placeholder: "Enter your name",
    options: [],
    rules: {
      required: true,
    },
  },
  {
    type: "text",
    title: "Email",
    placeholder: "Enter your email",
    options: [],
    rules: {
      required: true,
    },
  },
  {
    type: "radio",
    title: "Which country do you live in?",
    placeholder: "Select your country",
    options: ["USA", "Canada", "UK", "Australia"],
    rules: {
      required: true,
    },
  },
  {
    type: "select",
    title: "Country",
    options: ["Choose", "USA", "Canada", "UK", "Australia"],
    placeholder: "Your Country",
    rules: {
      required: false,
    },
  },
];

const Error = ({ children }: any) => (
  <p className="mt-2 text-red-500 text-sm">{children}</p>
);

const Input = ({ value, onChange, type, ...rest }: any) => {
  switch (type) {
    case "text":
      return (
        <input
          className="w-full lg:w-2/5 mt-2 border-b border-b-gray-300 py-1  focus:border-b-[#4F46E5] focus:ring-white focus:border-white outline-none"
          type="text"
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
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600"
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
          className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5"
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

const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const formInputs = dummyData.map((data, index) => {
    const { rules, title } = data;
    return (
      <section
        key={index}
        className="bg-white border border-gray-300 rounded-md shadow-sm mb-4 p-3 lg:p-6 font-sans font-medium"
      >
        <div className="flex font-medium">
          <label className="text-[#4F46E5]">{title}</label>
          {data.rules.required && <p className="ml-1 text-red-500">*</p>}
        </div>
        <Controller
          name={data.title}
          control={control}
          rules={rules}
          defaultValue=""
          render={({ field }) => (
            <div className="text-sm">
              <Input {...field} {...data} />
            </div>
          )}
        />
        {errors[data.title] && <Error>This is a required question</Error>}
      </section>
    );
  });

  return (
    <div className="max-w-2xl mx-auto pt-4 px-2 md:px-0">
      <form onSubmit={handleSubmit(onSubmit)}>
        {formInputs}
        <button
          type="submit"
          className="text-white bg-[#4F46E5] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
