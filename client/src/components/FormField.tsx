import { Controller } from "react-hook-form";
import FormFieldProps from "../interfaces/FormFieldProps";

const FormField = ({ formField, control }: FormFieldProps) => {
  return (
    <div>
      {formField.type === "text" ? (
        <div>
          <label>{formField.label}</label>
          <Controller
            name={formField.label}
            control={control}
            defaultValue=""
            render={({ field }) => <input {...field} />}
          />
        </div>
      ) : formField.type === "radio" || formField.type === "checkbox" ? (
        <div>
          <p>{formField.label}</p>
          {formField.options.map((op: any, index: any) => (
            <div key={index}>
              <Controller
                name={formField.label}
                control={control}
                defaultValue={formField.type === "radio" ? "" : []}
                render={({ field }) => (
                  <input
                    type={formField.type}
                    // value={op}
                    {...field}
                    id={`${formField.label}_${index}`}
                  />
                )}
              />
              <label htmlFor={`${formField.label}_${index}`}>{op}</label>
            </div>
          ))}
        </div>
      ) : (
        <div>Unsupported Field Type</div>
      )}
    </div>
  );
};

export default FormField;
