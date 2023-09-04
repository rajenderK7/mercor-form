import { Controller, useForm } from "react-hook-form";

interface IFormField {
  type: "text" | "radio" | "email" | "password" | "select" | "checkbox";
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
  // {
  //   type: "checkbox",
  //   title: "Subscribe to Newsletter",
  //   options: ["hello", "bro"],
  //   rules: {
  //     required: false,
  //   },
  // },
];

const Error = ({ children }: any) => (
  <p className="mt-2 text-red-500 text-sm">{children}</p>
);

const Input = ({ value, onChange, type, ...rest }: any) => {
  switch (type) {
    case "text":
      return (
        <input
          className="w-2/5 mt-2 border-b border-b-gray-300 py-1  focus:border-b-[#4F46E5] focus:ring-white focus:border-white outline-none"
          type="text"
          placeholder={rest?.placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      );
    case "radio":
      return rest?.options.map((e: any) => (
        <div key={e} className="flex items-center mt-2">
          <input
            className="border-b border-b-gray-300 py-1 focus:border-b-[#4F46E5] focus:ring-white focus:border-white outline-none"
            type="radio"
            value={e}
            onChange={(e) => onChange(e.target.value)}
            checked={value === e}
          />
          <label className="ml-2">{e}</label>
        </div>
      ));
    case "checkbox":
      return rest?.options.map((e: any) => (
        <div key={e} className="flex space-x-1 items-center mt-2">
          <input
            className="border-b border-b-gray-300 py-1 focus:border-b-[#4F46E5] focus:ring-white focus:border-white outline-none"
            type="checkbox"
            onChange={(e) => onChange(e.target.checked)}
            checked={value}
          />
          <p className="ml-2">{e}</p>
        </div>
      ));

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
        className="bg-white border border-gray-300 rounded-md shadow-sm mb-3 p-2 lg:p-5"
      >
        <div className="flex font-medium">
          <label className="text-[#4F46E5]">{title}</label>
          {data.rules.required && <p className="ml-1 text-red-500">*</p>}
        </div>
        <Controller
          name={data.title}
          control={control}
          rules={rules}
          defaultValue={""}
          render={({ field }) => (
            <div>
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
