import { Controller, useForm } from "react-hook-form";
import FormField, { Error } from "./FormField";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import formActions from "../actions/form.actions";

export interface IFormField {
  type: "text" | "radio" | "email" | "select" | "textarea";
  title: string;
  placeholder?: string;
  options?: string[];
  rules: {
    required: boolean;
  };
}

export interface IForm {
  title: string;
  desc?: string;
  fields: IFormField[];
}

const Form = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { formId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<IForm | undefined>();

  const fetchForm = async () => {
    setLoading(true);
    const data = await formActions.fetchForm(formId!);
    setForm(data.form);
    setLoading(false);
  };

  const submitForm = async (formData: any) => {
    setLoading(true);
    const message = await formActions.submitResponse(
      "64f7da18c7facdab30fefe2c",
      "64f7da18c7facdab30fefe2c",
      formData
    );
    if (message === "success") {
      navigate(`/responded?formTitle=${form?.title}`, {
        replace: true,
      });
      return;
    }
    toast.error("Something went wrong. Please try again later");
    setLoading(false);
  };

  useEffect(() => {
    fetchForm();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-4 px-2 md:px-0 font-sans">
      {loading && <p className="text-center">Loading..</p>}
      {form && (
        <>
          <div className="bg-white border border-gray-300 border-t-8 border-t-[#4F46E5]  rounded-md shadow-sm mb-4 p-3 lg:p-6">
            <h2 className="text-3xl font-bold mercor-color">{form.title}</h2>
            <p className="mt-1 font-medium text-gray-600">{form.desc}</p>
            <hr className="my-2 border-gray-300" />
            <div className="text-sm">
              <p className="flex items-center">
                <span className="font-semibold">rseven@email.com </span>
                <span className="mercor-color ml-1">Switch account</span>
              </p>
              <p className="text-red-500 mt-1">* Indicates required question</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            {form.fields.map((data: any, index: any) => {
              const { rules, title } = data;
              return (
                <section
                  key={index}
                  className="bg-white border border-gray-300 rounded-md shadow-sm mb-4 p-3 lg:p-6 font-medium"
                >
                  <label className="text-[#4F46E5]">
                    {title}
                    {data.rules.required && (
                      <span className="ml-1 text-red-500">*</span>
                    )}
                  </label>
                  <Controller
                    name={data.title}
                    control={control}
                    rules={rules}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="text-sm">
                        <FormField {...field} {...data} />
                      </div>
                    )}
                  />
                  {errors[data.title] && (
                    <Error>This is a required question</Error>
                  )}
                </section>
              );
            })}
            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="text-white bg-[#4F46E5] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5"
              >
                Submit
              </button>
              <button
                type="button"
                className="text-[#4F46E5] font-medium text-sm"
              >
                Clear form
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Form;
