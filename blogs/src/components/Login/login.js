import { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import { showErrMsg } from "../utils/notification";
import { showSuccessMsg } from "../utils/notification";

const Login = () => {
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  let history = useHistory();

  const responseGoogle = async (response) => {
    try {
      fetch(process.env.REACT_APP_LOGIN_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ token: response.tokenId }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.token) {
            localStorage.token = data.token;
            setErr("");
            setSuccess(data.msg);
            return history.push("/");
          }
          setSuccess("");
          setErr(data.msg);
        });
    } catch (err) {
      setSuccess("");
      setErr("Not Authorized");
    }
  };

  return (
    <>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="mt-5 mb-5 d-flex flex justify-content-center align-items-center">
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Login with google"
          onSuccess={responseGoogle}
        />
      </div>
    </>
  );
};

export default Login;
