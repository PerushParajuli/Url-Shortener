import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [allowSubmission, setAllowSubmission] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (allowSubmission) {
    } else {
      if (email === "") {
        setEmailMessage("Email needed");
      } else if (password === "") {
        setPasswordMessage("Password needed");
      } else {
        setPasswordMessage(
          "Password should contain at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long."
        );
      }
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
      setEmailMessage("");
    }
  }, [password, email]);

  return (
    <div className="signupContainer min-h-screen px-4 grid grid-col-1 md:grid-cols-2 place-items-center">
      <div className="max-w-[450px] flex flex-col gap-y-5 text-color-auth">
        <div className="order-1">
          <h2 className="font-extrabold text-4xl sm:text-3xl">
            Log in and start sharing
          </h2>
          <p className="mt-2 text-lg sm:text-base">
            Don't have an account? Sign up
          </p>
        </div>

        <div className="flex flex-col gap-y-4 order-3 sm:order-2">
          <button className="order-2 sm:order-1 w-full flex items-center gap-x-2 py-3 sm:py-2 justify-center border border-slate-300 rounded-sm hover:bg-slate-100 cursor-pointer">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <div className="order-1 sm:order-2 flex items-center gap-x-4">
            <div className="flex-grow bg-slate-300 h-[1px]"></div>
            <span className="uppercase text-slate-600 font-semibold">OR</span>
            <div className="flex-grow bg-slate-300 h-[1px]"></div>
          </div>
        </div>

        <form
          action=""
          method="post"
          className="flex flex-col gap-y-5 text-color-auth order-2 sm:order-3"
          onSubmit={handleSubmit}
        >
          {/* Email */}
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
            <span className="text-sm text-red-600">{emailMessage}</span>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-y-1 order-4">
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
            <span className="my-3 ml-auto underline text-blue-600 hover:text-blue-700 cursor-pointer">Forget your password?</span>
          </div>


          {/* Submit button */}
          <button
            type={"submit"}
            className={`w-full ${
              allowSubmission ? "bg-[#2a36d9]" : "bg-[#2A5BD7]"
            } py-3 sm:py-2 text-white font-semibold cursor-pointer rounded-sm order-5`}
          >
            Login
          </button>
        </form>

        <span className="order-6">
          By Logging in with an account, you agree to /___/ Terms of Service,
          Privacy Policy and Acceptable Use Policy.
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

export default SignIn;

// Backend Integration
// Implement actual authentication logic for google
// Password Strength Indicator
