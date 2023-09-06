import { Schema, model } from "mongoose";

export interface IFormResponse {
  userId: string;
  formId: string;
  formData: {
    [field: string]: string;
  };
}

const FormResponseSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    formId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    formData: {
      type: Map,
      of: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model<IFormResponse>("FormResponse", FormResponseSchema);
