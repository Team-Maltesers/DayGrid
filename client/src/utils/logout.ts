import { Cookies } from "react-cookie";

const logout = async () => {
  const cookies = new Cookies();
  cookies.remove("refreshToken");
  window.location.href = "/";
};

export default logout;
