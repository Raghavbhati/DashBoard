import { useState } from "react";
import axios from "axios";
import Inputbox from "../Components/FormComponents/inputbox";
import LoginSignupNavbar from "../Components/Common/LoginSignupNavbar";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const checkLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/user/register", {
        email,
        password,
        username,
      });
      console.log("data acceses", res);
    } catch (error) {
      console.log("Error occured", error);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col relative">
      <LoginSignupNavbar
        text={"Already have an account? "}
        path={"/login"}
        title={"Login"}
      />
      <div className="flex justify-center items-center w-full h-full">
        <div className="w-8/12 shadow-xl rounded-lg bg-dark">
          <div className="flex gap-4 shadow-md bg-dark">
            <div className="w-6/12 p-12">
              
            </div>
            <div className="w-6/12 p-10 bg-light">
              <h2 className="font-bold text-4xl text-dark pb-6">
                Register Now
              </h2>
              <form onSubmit={checkLogin}>
                <Inputbox
                  label={"Username"}
                  type={"text"}
                  isRequired={true}
                  value={username}
                  onChange={setUsername}
                  class={""}
                />
                <Inputbox
                  label={"Email"}
                  value={email}
                  isRequired={true}
                  onChange={setEmail}
                  class={""}
                  type={"text"}
                />
                <Inputbox
                  label={"Password"}
                  isRequired={true}
                  value={password}
                  onChange={setPassword}
                  class={""}
                  type={"password"}
                />
                <button
                  className="bg-primary text-white w-full py-1.5 my-3 font-semibold rounded-sm hover:bg-secondry"
                  type="submit"
                >
                  Signup Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
