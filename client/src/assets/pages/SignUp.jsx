
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useReducer } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie"

// =====================
// Action Types for Reducer
// =====================
const SET_EMAIL = "SET_EMAIL";
const SET_PASSWORD = "SET_PASSWORD";
const SET_SHOW_PASSWORD = "SET_SHOW_PASSWORD";
const SET_PASSWORD_MESSAGE = "SET_PASSWORD_MESSAGE";
const SET_EMAIL_MESSAGE = "SET_EMAIL_MESSAGE";
const SET_ALLOW_SUBMISSION = "SET_ALLOW_SUBMISSION";
const SET_LOADER = "SET_LOADER";

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
  loader: false,
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
    case SET_LOADER:
      return { ...state, loader: action.payload };
    default:
      return state; // Added default case for safety
  }
};

const SignUp = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);

  // =====================
  // Handles form submission for sign-up
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.allowSubmission) {
      const email = state.email;
      const password = state.password;
      const apiEndPoint =
        "http://localhost:3002/api/user/auth/sendVerificationToken";

      try {
        // Show loader while processing
        dispatch({ type: SET_LOADER, payload: true });

        // Send POST request to backend for account creation
        const res = await fetch(apiEndPoint, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        // Handle error responses from backend
        if (!res.ok) {
          dispatch({ type: SET_LOADER, payload: false });
          if (res.status === 409) {
            toast.error("Account with the same email already exists!");
          }
        } else if (res.status === 200) {
          // On success, navigate to confirmation page
          const parsed = await res.json();
          Cookies.set("allowAccessToConfirmationPage", true, {expires: 1})

          navigate("/signup/confirmation");
        }
      } catch (error) {
        // Log any unexpected errors
        console.error("Error submitting form:", error);
      }
    } else {
      Cookies.set("allowAccessToConfirmationPage", false, {expires: 1})
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
    <div className="signupContainer min-h-screen px-4 grid grid-col-1 md:grid-cols-2 place-items-center">
      {/* Loader shown during account creation */}
      {state.loader ? (
        <div className="flex items-center gap-x-4">
          <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
          <p>Account creation in progress...</p>
        </div>
      ) : (
        // Main sign-up form and info
        <div className="max-w-[450px] flex flex-col gap-y-5 text-color-auth">
          {/* Heading and navigation to sign-in */}
          <div className="order-1">
            <h2 className="font-extrabold text-4xl sm:text-3xl">
              Create your account
            </h2>
            <p className="mt-2 text-lg sm:text-base">
              Already have an account? <NavLink to="/signin">Log in</NavLink>
            </p>
          </div>

          {/* Google Sign-Up and Divider */}
          <div className="flex flex-col gap-y-4 order-3 sm:order-2">
            {/* Google Sign-Up Button (not yet implemented) */}
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

          {/* Sign-Up Form */}
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
            </div>

            {/* Submit Button */}
            <button
              type={"submit"}
              className={`w-full ${
                state.allowSubmission ? "bg-[#2a36d9]" : "bg-[#2A5BD7]"
              } py-3 sm:py-2 text-white font-semibold cursor-pointer rounded-sm order-5`}
            >
              Create free account
            </button>
          </form>

          {/* Terms and Policies Notice */}
          <span className="order-6">
            By creating an account, you agree to /___/ Terms of Service, Privacy
            Policy and Acceptable Use Policy.
          </span>
        </div>
      )}

      {/* Right Side: Illustration Image (hidden on small screens) */}
      <div className="hidden md:block h-full w-full">
        <img
          src={"https://s.locker.io/resources/16181210/sign-up.jpg"}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Toast notifications container */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default SignUp;

// =====================
// TODOs / Future Improvements
// =====================
// - Implement actual authentication logic for Google sign-up
// - Add a password strength indicator for better UX
