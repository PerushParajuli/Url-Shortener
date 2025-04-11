import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [allowSubmission, setAllowSubmission] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (allowSubmission) {
    } else {
      setPasswordMessage(
        "Password should contain at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long."
      );
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (password === "" || email === "") {
      setAllowSubmission(false);
    } else if (passwordRegExp.test(password) && emailRegExp.test(email)) {
      setAllowSubmission(true);
      setPasswordMessage("");
    }
  }, [password, email]);

  return (
    <div className="signupContainer min-h-screen grid grid-col-1 md:grid-cols-2 place-items-center">
      <div className="w-[450px] flex flex-col gap-y-5 text-color-auth">
        <div>
          <h2 className="font-extrabold">Create your account</h2>
          <p className="mt-2">Already have an account? Log in</p>
        </div>

        <button className="w-full flex items-center gap-x-2 py-2 justify-center border border-slate-300 rounded-sm hover:bg-slate-100 cursor-pointer">
          <FcGoogle className="text-xl" /> Continue with Google
        </button>

        <div className="flex items-center gap-x-4">
          <div className="flex-grow bg-slate-300 h-[1px]"></div>
          <span className="uppercase text-slate-600 font-semibold">OR</span>
          <div className="flex-grow bg-slate-300 h-[1px]"></div>
        </div>

        <form
          action=""
          method="post"
          className="flex flex-col gap-y-5 text-color-auth"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email" className="font-semibold ">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="py-2 px-4 border border-slate-300 rounded-sm outline-blue-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-1">
            <label htmlFor="password" className="font-semibold ">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={`w-full py-2 px-4 border border-slate-300 rounded-sm outline-blue-500`}
                onChange={(e) => setPassword(e.target.value)}
              />

              {password &&
                (showPassword ? (
                  <button
                    className="absolute top-3 right-3"
                    onClick={toggleShowPassword}
                    type="button"
                  >
                    <AiOutlineEye />
                  </button>
                ) : (
                  <button
                    className="absolute top-3 right-3"
                    onClick={toggleShowPassword}
                    type="button"
                  >
                    <AiOutlineEyeInvisible />
                  </button>
                ))}
            </div>
            <span className="text-sm text-red-600">{passwordMessage}</span>
          </div>

          <button
            type={"submit"}
            className={`w-full ${
              allowSubmission ? "bg-[#2a36d9]" : "bg-[#2A5BD7]"
            } text-white py-2 font-semibold cursor-pointer rounded-sm`}
          >
            Create free account
          </button>
        </form>

        <span>
          By creating an account, you agree to /___/ Terms of Service, Privacy
          Policy and Acceptable Use Policy.
        </span>
      </div>

      <div className="hidden md:block h-full w-full">
        <img
          src={"https://s.locker.io/resources/16181210/sign-up.jpg"}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
