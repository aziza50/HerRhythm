import React from 'react'

const bgImage = "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b"; // background
const paperTexture = "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a"; // notebook paper

function HomePage() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 🌿 Background Image */}
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content on top */}
      <div className="relative z-10 flex flex-col items-center">
        <TopBanner />

        <div className="relative w-[900px] h-[640px] bg-[rgba(255,255,255,0.85)] rounded-[64px] shadow-[0_10px_0_1px_#5A5A5A] overflow-hidden flex flex-col justify-center items-center -mt-4">
          {/* Paper Texture */}
          <img
            src={paperTexture}
            alt="paper texture"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-[64px]"
          />

          {/* Text */}
          <div className="relative z-10 text-center">
            <p className="font-poppins-extrabold text-[36px] text-[#2f2f2f] leading-tight tracking-[-1.92px]">
              hello {userName?.split(" ")[0]?.toLowerCase() || "friend"},
            </p>
            <p className="font-poppins-extrabold text-[36px] text-[#2f2f2f] leading-tight tracking-[-1.62px]">
              you’re in your follicular<span className="text-[#2f2f2f]"> phase!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage
