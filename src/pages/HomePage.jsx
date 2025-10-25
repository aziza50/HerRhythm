import React from 'react'

// Figma asset URLs
const imgHomePage = "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const imgImg25951 = "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

function HomePage() {
  return (
    <div className="bg-[#b5d96c] relative w-full min-h-screen overflow-hidden" data-name="Home" data-node-id="13:15">
      <div className="absolute h-[832px] left-0 top-0 w-full max-w-[1149px]" data-name="HomePage" data-node-id="13:16">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgHomePage} />
        <div className="absolute bg-[rgba(99,80,68,0.68)] h-[650px] left-[126px] overflow-clip rounded-[64px] shadow-[0px_10px_0px_1px_#4f564c] top-[97px] w-[897px]" data-node-id="13:17">
          <div className="absolute h-[754px] left-[-126px] mix-blend-luminosity shadow-[0px_4px_0px_-31px_rgba(0,0,0,0.25)] top-[-30px] w-[1132px]" data-name="IMG_2595 1" data-node-id="13:18">
            <img alt="" className="absolute inset-0 max-w-none mix-blend-overlay object-50%-50% object-cover pointer-events-none size-full" src={imgImg25951} />
          </div>
        </div>
        <div className="absolute bg-[rgba(99,80,68,0.68)] h-[650px] left-[126px] overflow-clip rounded-[64px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[97px] w-[897px]" data-node-id="13:19">
          <div className="absolute h-[698px] left-0 top-[-15px] w-[1047px]" data-name="IMG_2595 1" data-node-id="13:20">
            <img alt="" className="absolute inset-0 max-w-none mix-blend-overlay object-50%-50% object-cover pointer-events-none size-full" src={imgImg25951} />
          </div>
          <div className="absolute font-poppins-extrabold leading-[0] left-[14px] not-italic text-[64px] text-black top-[119px] tracking-[-1.92px] whitespace-nowrap" data-node-id="13:24">
            <p className="leading-[1.197] mb-0">hello [name],</p>
            <p className="leading-[0.92] mb-0">you're in your</p>
            <p className="leading-[0.92]">
              <span className="text-[#458a32]">follicular</span>
              <span>{` phase!`}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[18px] items-center left-[201px] overflow-clip top-[53px]" data-node-id="1:2283">
        <div className="bg-[rgba(217,217,217,0.62)] h-[44px] rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="1:2284" />
        <div className="bg-[rgba(217,217,217,0.62)] h-[44px] rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="1:2296" />
        <div className="bg-[rgba(217,217,217,0.62)] h-[44px] rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="1:2298" />
        <div className="bg-[rgba(217,217,217,0.62)] h-[44px] rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-[169px]" data-node-id="1:2300" />
      </div>
    </div>
  )
}

export default HomePage
