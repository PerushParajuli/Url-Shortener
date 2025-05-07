import { AiOutlineExclamationCircle } from "react-icons/ai";

import React, { useEffect, useReducer } from "react";
import Switch from "react-switch";

import UrlShortenerForm from "../common/UrlShortenerForm";
import background_image_desktop from "../images/Default.png";
import Cookies from "js-cookie";

// Initial state for the reducer
const initialState = {
  autoPasteFromClipboard: false, // Controls the clipboard auto-paste toggle
  isLoggedIn: true, // Tracks user authentication status
};

// Reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_CLIPBOARD":
      // Toggle the clipboard auto-paste feature
      return { ...state, autoPasteFromClipboard: action.payload };
    case "SET_IS_LOGGED_IN":
      // Set the user's login status
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};


const Home = () => {
  // useReducer for managing local component state
  const [state, dispatch] = useReducer(reducer, initialState);

  // Handler for toggling clipboard auto-paste
  const handleToggle = () => {
    dispatch({
      type: "TOGGLE_CLIPBOARD",
      payload: !state.autoPasteFromClipboard,
    });
  };

  const handleShorten = async (input) => {
    const response = await fetch("random/api", {
      method: "POST",
      body: JSON.stringify({ originalUrl: input.trim() }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response) {
      console.error("Error Sending Data");
      return;
    }

    const parsed = response.json();
    // update state, handle response etc
  };

  // Checks for the presence of a 'uid' cookie to determine login status
  const checkCookie = () => {
    const value = Cookies.get("uid");
    console.log("uid cookie value:", value);
    if (value) {
      dispatch({ type: "SET_IS_LOGGED_IN", payload: true });
    } else {
      dispatch({ type: "SET_IS_LOGGED_IN", payload: false });
    }
  };

  // On mount, check if the user is logged in
  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <div>
      {/* Main background and layout */}
      <div
        className={`bg-contain bg-no-repeat bg-center flex flex-col h-[100vh]`}
        style={{ backgroundImage: `url(${background_image_desktop})` }}
      >
        {/* Navigation bar */}
        <nav
          className={`${
            state.isLoggedIn ? "p-10 pt-14" : "p-10"
          } custom-black-color flex flex-col items-center gap-y-4 custom-text-color-home`}
        >
          <div className="w-full flex items-center gap-x-8 ">
            {/* App title */}
            <h2 className="custom-gradient-text font-semibold w-fit">
              Sortify
            </h2>

            {/* If logged in, show URL shortener and user profile in navbar */}
            {state.isLoggedIn ? (
              <div className="w-full flex items-center gap-x-8">
                <UrlShortenerForm
                  layout_css={"flex-1"}
                  allowPasteFromClipboard={state.autoPasteFromClipboard}
                  onShorten={handleShorten}
                />
                <div className="flex-shrink-0">
                  <h3>User Profile</h3>
                </div>
              </div>
            ) : (
              // If not logged in, show  auth options
              <div className="ml-auto flex items-center gap-x-4 text-white">
                <span>Login</span>
                <span>Register Now</span>
              </div>
            )}
          </div>
          {/* Clipboard auto-paste toggle (only for logged in users) */}

          <div
            className={`${
              state.isLoggedIn ? "block" : "hidden"
            } flex items-center gap-x-2`}
          >
            <Switch
              id="toggle-switch"
              checked={state.autoPasteFromClipboard}
              onColor="#181e29"
              offColor="#181e29"
              onHandleColor="#144EE3"
              handleDiameter={20}
              uncheckedIcon={false}
              checkedIcon={false}
              height={18}
              width={40}
              className=""
              activeBoxShadow=""
              onChange={handleToggle}
            />
            <label htmlFor="toggle-switch" className="text-sm">
              Auto Paste from Clipboard
            </label>
          </div>
        </nav>

        {/* Main content section */}
        <section
          className={`h-full  ${
            state.isLoggedIn ? "custom-backgroud-history" : "custom-black-color"
          } flex-1 flex flex-col gap-y-10`}
        >
          {/* Hero section with title and description will hide is user is logged in*/}
          <section
            className={`mx-auto w-fit custom-text-color-home ${
              state.isLoggedIn ? "hidden" : "block"
            }`}
          >
            <div className="flex flex-col gap-y-6 items-center">
              <h1 className="w-fit text-5xl custom-gradient-text font-semibold">
                Shorten Your Loooong Links :)
              </h1>
              <p className="font-light text-sm text-center lg:w-6/8">
                Sortify is an efficient and easy-to-use URL shortening service
                that streamlines your online experience.
              </p>
            </div>

            {/* URL shortener form and guest info */}
            <div
              className={`${
                state.isLoggedIn ? "" : "mt-10"
              }  flex flex-col items-center gap-y-4`}
            >
              <UrlShortenerForm
                width={"500px"}
                allowPasteFromClipboard={state.autoPasteFromClipboard}
              />
              <div
                className={`${
                  state.isLoggedIn ? "hidden" : "block"
                } flex items-center gap-x-2`}
              >
                <Switch
                  id="toggle-switch"
                  checked={state.autoPasteFromClipboard}
                  onColor="#181e29"
                  offColor="#181e29"
                  onHandleColor="#144EE3"
                  handleDiameter={20}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  height={18}
                  width={40}
                  className=""
                  activeBoxShadow=""
                  onChange={handleToggle}
                />
                <label htmlFor="toggle-switch" className="text-sm">
                  Auto Paste from Clipboard
                </label>
              </div>
              {/* Guest usage limit info */}
              <span
                className={`${
                  state.isLoggedIn ? "hidden" : "block"
                }  text-sm flex items-center gap-x-2`}
              >
                You can create
                <span className=" text-[15px] text-[#eb568e] font-bold ">
                  05
                </span>
                more links. Register Now to enjoy Unlimited usage
                <AiOutlineExclamationCircle />
              </span>
            </div>
          </section>

          {/* Table of shortened links (static placeholder data) */}
          <section
            className={`h-full custom-text-color-home ${
              state.isLoggedIn ? "custom-black-color" : ""
            }`}
          >
            <div
              className={`flex justify-center ${
                state.isLoggedIn ? "custom-grey-color" : "hidden"
              }`}
            >
              <ul className="flex items-center gap-x-8">
                <li>
                  <button className="py-2 focus:bg-blue-400 transition duration-200 ease-in-out">
                    History
                  </button>
                </li>
                <li>
                  <button className="py-2  ">Statistics</button>
                </li>
                <li>
                  <button className="py-2 ">Settings</button>
                </li>
              </ul>
            </div>
            <div className="px-20">
              <div
                className={`${
                  state.isLoggedIn ? "block" : "hidden"
                } flex justify-between items-center py-8`}
              >
                <h5>
                  History (<span>Will hold count of Links</span>)
                </h5>
                <div className="flex items-center gap-x-4">
                  <button>Bulk Edit</button>
                  <button>Filter</button>
                </div>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className={`font-light ${
                      state.isLoggedIn
                        ? "custom-table-header-fill-loggedin"
                        : "custom-grey-color"
                    }`}
                    align={"left"}
                  >
                    <th className="py-3 pl-2">Short Link</th>
                    <th className="py-3 pl-2">Original Link</th>
                    <th className="py-3 pl-2">QR Code</th>
                    <th className="py-3 pl-2">Clicks</th>
                    <th className="py-3 pl-2">Status</th>
                    <th className="py-3 pl-2">Date</th>
                  </tr>
                </thead>
                <tbody className={``}>
                  {/* Example rows (replace with dynamic data as needed) */}
                  <tr
                    className={`text-[13px] border-t-2 custom-border-color ${
                      state.isLoggedIn
                        ? "custom-table-row-fill-loggedin"
                        : "custom-light-grey-color"
                    }`}
                  >
                    <td className="py-3 pl-2">Short Link</td>
                    <td className="py-3 pl-2">Original Link</td>
                    <td className="py-3 pl-2">QR Code</td>
                    <td className="py-3 pl-2">Clicks</td>
                    <td className="py-3 pl-2">Status</td>
                    <td className="py-3 pl-2">Date</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </section>

        {/* Prompt for guests to register for unlimited history */}
        {!state.isLoggedIn && (
          <span className="custom-text-color-home flex justify-center">
            <span>Register Now</span> to enjoy Unlimited History
          </span>
        )}
      </div>
    </div>
  );
};

export default Home;
