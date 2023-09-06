import endpoints from "../helpers/endpoints";

const fetchForm = async (formId: string) => {
  try {
    const res = await fetch(`${endpoints.API_URL}/form/${formId}`);
    const data = await res.json();
    if (data.message === "success") {
      return data;
    }
    return null;
  } catch (e: any) {
    throw new Error(e);
  }
};

const submitResponse = async (
  userId: string,
  formId: string,
  formData: any
) => {
  try {
    const formResponse = {
      userId,
      formId,
      formData,
    };
    const res = await fetch(`${endpoints.API_URL}/form-response`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formResponse),
    });
    const data = await res.json();
    return data.message;
  } catch (e: any) {
    throw new Error(e);
  }
};

export default { fetchForm, submitResponse };
