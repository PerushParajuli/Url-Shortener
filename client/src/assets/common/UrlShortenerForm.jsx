import React, { useState } from "react";
import { BiLink } from "react-icons/bi";

/**
 * UrlShortenerForm
 *
 * A reusable form component for submitting URLs to be shortened.
 * Accepts optional width and layout_css props for flexible styling.
 *
 * Props:
 * - width: string (controls the width of the form, e.g., "500px")
 * - layout_css: string (applies additional layout styles, e.g., "flex-1")
 */
const UrlShortenerForm = ({
  width = "",
  layout_css,
  allowPasteFromClipboard,
  handleShorten
}) => {
  const [inputValue, setInputValue] = useState("");

  // Prevents default form submission behavior
  const handleSubmit = (e) => {
    e.preventDefault();
    if(handleShorten) {
      handleShorten(inputValue)
    }
  };

  const handlePaste = (e) => {
    if (!allowPasteFromClipboard) {
      e.preventDefault();
      return;
    } else {
      const pastedText = e.clipboardData.getData("text");
    }
  };

  // Maps width prop values to Tailwind CSS width classes
  const widthVariants = {
    "": "",
    "500px": "w-[500px]",
    "600px": "w-[600px]",
    "700px": "w-[700px]",
    "800px": "w-[800px]",
  };

  // Maps layout_css prop values to inline style objects
  const layoutVariants = {
    "flex-1": { flexGrow: 1 },
  };

  return (
    <form
      onSubmit={handleSubmit}
      // Dynamically applies width and other styling classes
      className={`${widthVariants[width]} h-fit rounded-full px-6 py-2 custom-grey-color border-2 custom-border-color flex items-center justify-between gap-x-2`}
      // Applies additional layout styles if provided
      style={layoutVariants[layout_css]}
    >
      {/* Link icon at the start of the form */}
      <span>
        <BiLink />
      </span>
      {/* Input field for entering the URL to be shortened */}
      <input
        type="text"
        name=""
        id=""
        className="outline-none h-full flex-1 placeholder:text-sm text-sm"
        placeholder="Enter the link here..."
        onPaste={handlePaste}
      />
      {/* Submit button to trigger URL shortening */}
      <button className="cursor-pointer" type="submit">
        Shorten now
      </button>
    </form>
  );
};

export default UrlShortenerForm;
