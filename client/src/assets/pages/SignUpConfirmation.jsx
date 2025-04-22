import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import React from "react";

const SignUpConfirmation = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputs = document.querySelectorAll("#otp-inputs input");

    const otpCode = Array.from(inputs)
      .map((input) => input.value)
      .join("");

    const apiEndPoint =
      "http://localhost:3002/api/user/auth/verifyTokenAndSignup";

    try {
      const res = fetch(apiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ verificationToken: otpCode }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      console.log("User successfully created");
    } catch (error) {
      throw new Error(`Error validating and creating user`);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="max-w-lg bg-white shadow-lg rounded-lg p-6">
        <div className="flex flex-col mb-6">
          <span className="font-bold text-gray-800">Perush Parajuli</span>
          <h4 className="text-xl font-semibold text-blue-700 mt-2">
            Check your email
          </h4>
          <p className="text-gray-600 mt-1">
            We sent an email to your Gmail account. Enter the unique code we
            sent you below.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-y-5"
        >
          <div id="otp-inputs" className="flex gap-x-2">
            <input
              maxlength="1"
              name="input"
              className="w-8 p-1 text-lg text-center border-2 outline-0"
            />
            <input
              maxlength="1"
              name="input"
              className="w-8 p-1 text-lg text-center border-2 outline-0"
            />
            <input
              maxlength="1"
              name="input"
              className="w-8 p-1 text-lg text-center border-2 outline-0"
            />
            <input
              maxlength="1"
              name="input"
              className="w-8 p-1 text-lg text-center border-2 outline-0"
            />
            <input
              maxlength="1"
              name="input"
              className="w-8 p-1 text-lg text-center border-2 outline-0"
            />
            <input
              maxlength="1"
              name="input"
              className="w-8 p-1 text-lg text-center border-2 outline-0"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer w-full px-8 py-2 rounded-md shadow-md transition duration-200"
          >
            Submit
          </button>
        </form>

        <div className="flex items-center gap-x-2 mt-6">
          <HiOutlineDotsCircleHorizontal className="text-3xl text-blue-600 animate-spin" />
          <div>
            <h6 className="font-semibold text-gray-800">
              Waiting for approval
            </h6>
            <p className="text-gray-500 text-sm">
              The code is only valid for 3 minutes. Be quick!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpConfirmation;
