
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useReducer } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// =====================
// Action Types for Reducer
// =====================
const SET_EMAIL = "SET_EMAIL";
const SET_PASSWORD = "SET_PASSWORD";
const SET_SHOW_PASSWORD = "SET_SHOW_PASSWORD";
const SET_PASSWORD_MESSAGE = "SET_PASSWORD_MESSAGE";
const SET_EMAIL_MESSAGE = "SET_EMAIL_MESSAGE";
const SET_ALLOW_SUBMISSION = "SET_ALLOW_SUBMISSION";

// =====================
// Initial State for Reducer
// =====================
const initialState = {
  email: "",
  password: "",
  showPassword: false,
  passwordMessage: "",
  emailMessage: "",
  allowSubmission: false,
};

// =====================
// Reducer Function
// Handles state transitions based on dispatched actions
// =====================
const reducer = (state, action) => {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_SHOW_PASSWORD:
      return { ...state, showPassword: action.payload };
    case SET_PASSWORD_MESSAGE:
      return { ...state, passwordMessage: action.payload };
    case SET_EMAIL_MESSAGE:
      return { ...state, emailMessage: action.payload };
    case SET_ALLOW_SUBMISSION:
      return { ...state, allowSubmission: action.payload };
    default:
      return state; // Added default case for safety
  }
};

const SignIn = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  // =====================
  // Handles form submission for sign-in
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.allowSubmission) {
      const apiEndPoint = "http://localhost:3002/api/user/auth/signin";
      const email = state.email.trim();
      const password = state.password.trim();
      try {
        // Send POST request to backend for authentication
        const res = await fetch(apiEndPoint, {
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          credentials: "include",
        });

        // Handle different error responses from backend
        if (!res.ok) {
          switch (res.status) {
            case 404:
              toast.error("User doesnot exist, Signup Please!");
              return;
            case 403:
              toast.warning("Password incorrect, please enter a valid password!");
              return;
            case 500:
              console.log("Internal Server Error");
              return;
            default:
              break;
          }
          throw new Error(`Error logging the user!`);
        }
        // Redirect to home page on successful login
        navigate("/home");
      } catch (error) {
        // Log any unexpected errors
        console.error(`Problem logging the user: ${error}`);
      }
    } else {
      // Show appropriate validation messages if submission is not allowed
      if (state.email === "") {
        dispatch({ type: SET_EMAIL_MESSAGE, payload: "Email needed!" });
      } else if (state.password === "") {
        dispatch({ type: SET_PASSWORD_MESSAGE, payload: "Password needed!" });
      } else {
        dispatch({
          type: SET_PASSWORD_MESSAGE,
          payload:
            "Password should contain at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long.",
        });
      }
    }
  };

  // =====================
  // Toggles password visibility in the input field
  // =====================
  const toggleShowPassword = () => {
    dispatch({ type: SET_SHOW_PASSWORD, payload: !state.showPassword });
  };

  // =====================
  // Validates email and password fields in real-time
  // Enables/disables form submission accordingly
  // =====================
  useEffect(() => {
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    if (state.password === "" || state.email === "") {
      dispatch({ type: SET_ALLOW_SUBMISSION, payload: false });
    } else if (
      passwordRegExp.test(state.password) &&
      emailRegExp.test(state.email)
    ) {
      dispatch({ type: SET_ALLOW_SUBMISSION, payload: true });
      dispatch({ type: SET_PASSWORD_MESSAGE, payload: "" });
      dispatch({ type: SET_EMAIL_MESSAGE, payload: "" });
    }
  }, [state.password, state.email]);

  return (
    <div className="signupContainer min-h-screen p-4 grid grid-col-1 place-items-center">
      {/* Left Side: Form and Info */}
      <div className="max-w-[450px] flex flex-col gap-y-5 text-color-auth">
        {/* Heading and navigation to signup */}
        <div className="order-1">
          <h2 className="font-extrabold text-4xl sm:text-3xl">
            Log in and start sharing
          </h2>
          <p className="mt-2 text-lg sm:text-base cursor-pointer">
            Don't have an account? <NavLink to="/signup"> Sign up</NavLink>
          </p>
        </div>

        {/* Google Sign-In and Divider */}
        <div className="flex flex-col gap-y-4 order-3 sm:order-2">
          {/* Google Sign-In Button (not yet implemented) */}
          <button className="order-2 sm:order-1 w-full flex items-center gap-x-2 py-3 sm:py-2 justify-center border border-slate-300 rounded-sm hover:bg-slate-100 cursor-pointer">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          {/* Divider */}
          <div className="order-1 sm:order-2 flex items-center gap-x-4">
            <div className="flex-grow bg-slate-300 h-[1px]"></div>
            <span className="uppercase text-slate-600 font-semibold">OR</span>
            <div className="flex-grow bg-slate-300 h-[1px]"></div>
          </div>
        </div>

        {/* Sign-In Form */}
        <form
          method="post"
          className="flex flex-col gap-y-5 text-color-auth order-2 sm:order-3"
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email" className="font-semibold ">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="py-2 px-4 border border-slate-300 rounded-sm outline-blue-500"
              onChange={(e) =>
                dispatch({ type: SET_EMAIL, payload: e.target.value })
              }
            />
            {/* Email validation message */}
            <span className="text-sm text-red-600">{state.emailMessage}</span>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-y-1 order-4">
            <label htmlFor="password" className="font-semibold ">
              Password
            </label>
            <div className="relative">
              <input
                type={state.showPassword ? "text" : "password"}
                name="password"
                id="password"
                className={`w-full py-2 px-4 border border-slate-300 rounded-sm outline-blue-500`}
                onChange={(e) =>
                  dispatch({ type: SET_PASSWORD, payload: e.target.value })
                }
              />

              {/* Toggle password visibility button */}
              {state.password &&
                (state.showPassword ? (
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
            {/* Password validation message */}
            <span className="text-sm text-red-600">
              {state.passwordMessage}
            </span>
            {/* Forgot password link (not yet implemented) */}
            <span className="my-3 ml-auto underline text-blue-600 hover:text-blue-700 cursor-pointer">
              Forget your password?
            </span>
          </div>

          {/* Submit Button */}
          <button
            type={"submit"}
            className={`w-full ${
              state.allowSubmission ? "bg-[#2a36d9]" : "bg-[#2A5BD7]"
            } py-3 sm:py-2 text-white font-semibold cursor-pointer rounded-sm order-5`}
          >
            Login
          </button>
        </form>

        {/* Terms and Policies Notice */}
        <span className="order-6">
          By Logging in with an account, you agree to /___/ Terms of Service,
          Privacy Policy and Acceptable Use Policy.
        </span>
      </div>

      {/* Right Side: Illustration Image (hidden on small screens) */}
      {/* <div className="hidden md:block h-full w-full">
        <img
          src={"https://s.locker.io/resources/16181210/sign-up.jpg"}
          className="h-full w-full object-cover"
        />
      </div> */}
      {/* Toast notifications container */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default SignIn;

// =====================
// TODOs / Future Improvements
// =====================
// - Implement actual authentication logic for Google sign-in
// - Add a password strength indicator for better UX
