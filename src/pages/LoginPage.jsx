import React from "react";
import LoginButton from "../components/LoginButton";

import catHearts from "../assets/images/cathearts.png";

const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b"; // background
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a"; // notebook paper

function LoginPage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* background */}
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="relative w-[400px] h-[640px] bg-[rgba(255,255,255,0.85)] rounded-[64px] shadow-[0_10px_0_1px_#5A5A5A] overflow-hidden flex flex-col justify-center items-center">
          {/* paper texture */}
          <img
            src={paperTexture}
            alt="paper texture"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-[64px]"
          />

          {/* content */}
          <div className="relative z-10 text-center mb-6">
            <img
              src={catHearts}
              alt="cat hearts"
              className="mx-auto h-50 -mb-3 animate-pulse opacity-70"
            />

            <h1 className="font-poppins-extrabold text-[42px] text-gray-600 leading-tight tracking-[-1.8px]">
              un<span className="text-pink-400">phased</span>
            </h1>
            <p className="text-gray-500 mt-2 text-lg font-poppins-extrabold leading-tight">
              stay unfazed,<br></br>even in your phases
            </p>
          </div>

          {/* login button */}
          <div
            className="relative z-10 mt-3 px-6 py-3 bg-pink-400 text-white font-bold rounded-2xl shadow-md 
            hover:bg-pink-500 hover:shadow-pink-200 transition-all duration-300 
            focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2"
          >
            <LoginButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
