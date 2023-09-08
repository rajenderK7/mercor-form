import endpoints from "../helpers/endpoints";

const signUp = async (userData: any) => {
  try {
    const res = await fetch(`${endpoints.API_URL}/auth/register`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

const login = async (userData: any) => {
  try {
    const res = await fetch(`${endpoints.API_URL}/auth/login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    return data;
  } catch (e: any) {
    throw new Error(e);
  }
};

const logout = () => {
  localStorage.removeItem("user");
  return true;
};

export default { signUp, login, logout };
