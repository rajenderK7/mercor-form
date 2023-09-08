import { Schema, model } from "mongoose";

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
  creatorId: string;
  title: string;
  desc?: string;
  fields: IFormField[];
}

const validTypes = ["text", "radio", "email", "select", "textarea"];

const FieldSchema = new Schema({
  type: {
    type: String,
    enum: validTypes,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
  },
  options: [{ type: String }],
  rules: {
    required: {
      type: Boolean,
      default: true,
    },
  },
});

const FormSchema = new Schema(
  {
    creatorId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    fields: [FieldSchema],
  },
  { timestamps: true }
);

const Form = model<IForm>("Form", FormSchema);
export default Form;
