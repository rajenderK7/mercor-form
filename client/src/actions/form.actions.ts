import endpoints from "../helpers/endpoints";

const createForm = async (formData: any) => {
  try {
    const res = await fetch(`${endpoints.API_URL}/form`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.message === "success") {
      return data.formId;
    }
    return null;
  } catch (e: any) {
    throw new Error(e);
  }
};

const updateForm = async (formId: string, formData: any) => {
  try {
    const res = await fetch(`${endpoints.API_URL}/form/${formId}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.message === "success") {
      return data;
    }
    return null;
  } catch (e: any) {
    throw new Error(e);
  }
};

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

const fetchValidCreator = async (userId: string, formId: string) => {
  try {
    const res = await fetch(
      `${endpoints.API_URL}/form/creator/${userId}/${formId}`
    );
    const data = await res.json();
    if (data.message === "success") {
      return data;
    }
    return null;
  } catch (e: any) {
    throw new Error(e);
  }
};

const fetchFormQuestions = async (formId: string) => {
  try {
    const res = await fetch(`${endpoints.API_URL}/form/questions/${formId}`);
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

const fetchResponses = async (formId: string) => {
  try {
    const res = await fetch(`${endpoints.API_URL}/form-response/${formId}`);
    const data = await res.json();
    return data.responses;
  } catch (e: any) {
    throw new Error(e);
  }
};

const fetchMyForms = async (userId: string) => {
  try {
    const res = await fetch(`${endpoints.API_URL}/form/user-forms/${userId}`);
    const data = await res.json();
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

const deleteMyForm = async (formId: string, creatorId: string) => {
  try {
    const res = await fetch(
      `${endpoints.API_URL}/form/${formId}/${creatorId}`,
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

const updateAcceptance = async (formId: string, acceptingResponse: boolean) => {
  try {
    const res = await fetch(
      `${endpoints.API_URL}/form/update-acceptance/${formId}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ acceptingResponse }),
      }
    );
    const data = await res.json();
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

const sendMail = async (
  emails: string,
  title: string,
  link: string,
  subject: string | undefined
) => {
  try {
    const res = await fetch(`${endpoints.API_URL}/form/share/email`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emails, title, link, subject }),
    });
    const data = await res.json();
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

export default {
  createForm,
  updateForm,
  fetchForm,
  fetchFormQuestions,
  fetchValidCreator,
  submitResponse,
  fetchResponses,
  deleteMyForm,
  fetchMyForms,
  updateAcceptance,
  sendMail,
};
