import React from 'react'

// Figma asset URLs
const imgHomePage = "https://www.figma.com/api/mcp/asset/0085e713-15f6-423a-9328-a1984f01701b";
const imgImg25951 = "https://www.figma.com/api/mcp/asset/7fe2684f-8c62-42a7-a929-e4c2f7772c36";
const imgFlower2StreamlineSymbolsFlourishes = "https://www.figma.com/api/mcp/asset/cddf775a-5248-481f-9514-83b0be8e9863";
const imgClip1StreamlineDoodlesClassic = "https://www.figma.com/api/mcp/asset/6809782a-a0bf-42fe-8585-e50907d59aa2";
const imgNotePadFlipColorBorder4StreamlineStickyNotesFree = "https://www.figma.com/api/mcp/asset/41eb8ee8-8edf-4871-a9cb-b4645b02a6ec";
const imgFrame2 = "https://www.figma.com/api/mcp/asset/82b294f5-26e2-42a2-8d72-2f8087653c0d";
const imgVector = "https://www.figma.com/api/mcp/asset/a50645d1-5aa5-42a2-a333-a2d88c474c83";

function TestHomePage() {
  return (
    <div className="w-full min-h-screen relative overflow-hidden" data-node-id="42:3036">
      {/* Background Page Component */}
      <div className="bg-[#b5d96c] h-[832px] relative w-full" data-name="pageComponent" data-node-id="35:2706">
        {/* Background images */}
        <div className="absolute inset-0 w-full h-full">
          <img alt="" className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" src={imgHomePage} />
        </div>

        {/* Main content frame */}
        <div className="absolute bg-[rgba(99,80,68,0.68)] h-[650px] left-1/2 top-[97px] translate-x-[-50%] w-[897px] overflow-hidden rounded-[64px] shadow-[0px_10px_0px_1px_#4f564c]">
          <div className="absolute h-[754px] left-[-126px] mix-blend-luminosity shadow-[0px_4px_0px_-31px_rgba(0,0,0,0.25)] top-[-30px] w-[1132px]">
            <img alt="" className="absolute inset-0 max-w-none mix-blend-overlay object-cover object-center pointer-events-none w-full h-full" src={imgImg25951} />
          </div>
        </div>

        {/* Inner content frame */}
        <div className="absolute bg-[rgba(99,80,68,0.68)] h-[650px] left-1/2 top-[97px] translate-x-[-50%] w-[897px] overflow-hidden rounded-[64px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <div className="absolute h-[698px] left-0 top-[-15px] w-[1047px]">
            <img alt="" className="absolute inset-0 max-w-none mix-blend-overlay object-cover object-center pointer-events-none w-full h-full" src={imgImg25951} />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute flex gap-[18px] items-center justify-center left-[116px] top-[38px]" data-name="navigation" data-node-id="1:2283">
        <div className="h-[44px] relative w-[169px]" data-name="homeNav" data-node-id="35:2681">
          <div className="absolute bg-[rgba(217,217,217,0.62)] h-[44px] left-0 rounded-[16px] top-0 w-[169px]" data-node-id="1:2284" />
          <p className="absolute font-poppins-medium left-1/2 not-italic text-[22px] text-black text-center top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[-0.66px] w-[169px] whitespace-nowrap">Home</p>
        </div>
        <div className="h-[44px] relative w-[169px]" data-name="checkinNav" data-node-id="35:2690">
          <div className="absolute bg-[rgba(217,217,217,0.62)] h-[44px] left-0 rounded-[16px] top-0 w-[169px]" data-node-id="35:2691" />
          <p className="absolute font-poppins-medium left-1/2 not-italic text-[22px] text-black text-center top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[-0.66px] w-[169px] whitespace-nowrap">Check-In</p>
        </div>
        <div className="h-[44px] relative w-[169px]" data-name="calenderNav" data-node-id="35:2694">
          <div className="absolute bg-[rgba(217,217,217,0.62)] h-[44px] left-0 rounded-[16px] top-0 w-[169px]" data-node-id="35:2695" />
          <p className="absolute font-poppins-medium left-1/2 not-italic text-[22px] text-black text-center top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[-0.66px] w-[169px] whitespace-nowrap">Calender</p>
        </div>
        <div className="h-[44px] relative w-[169px]" data-name="tipsNav" data-node-id="35:2698">
          <div className="absolute bg-[rgba(217,217,217,0.62)] h-[44px] left-0 rounded-[16px] top-0 w-[169px]" data-node-id="35:2699" />
          <p className="absolute font-poppins-medium left-1/2 not-italic text-[22px] text-black text-center top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[-0.66px] w-[169px] whitespace-nowrap">Tips</p>
        </div>
        <div className="h-[44px] relative w-[169px]" data-name="profileNav" data-node-id="35:2702">
          <div className="absolute bg-[rgba(217,217,217,0.62)] h-[44px] left-0 rounded-[16px] top-0 w-[169px]" data-node-id="35:2703" />
          <p className="absolute font-poppins-medium left-1/2 not-italic text-[22px] text-black text-center top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-[-0.66px] w-[169px] whitespace-nowrap">Profile</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute left-[133px] top-[93px] px-[10px] py-[10px] w-[1169px]">
        {/* Inner frame with decorative elements */}
        <div className="bg-transparent flex flex-col gap-[42px] items-center pb-[61px] pl-[76px] pr-[39px] pt-[52px] rounded-[83px] w-[900px]">
          {/* Top section with decorative elements */}
          <div className="flex items-center pr-[136px] w-full relative">
            {/* Left side - Luteal phase card with flower */}
            <div className="h-[366px] overflow-hidden mr-[-136px] w-[364px] relative">
              <div className="absolute px-[109px] py-[32px] right-0 top-[38px] w-[364px]">
                <div className="h-[143px] relative w-[146px]">
                  <img alt="" className="absolute inset-0 mix-blend-soft-light object-cover object-center pointer-events-none w-full h-full" src={imgFlower2StreamlineSymbolsFlourishes} />
                </div>
                <p className="absolute font-srisakdi-bold left-[122px] not-italic text-[43px] text-black top-[52px] tracking-[-1.29px]">Luteal</p>
                <div className="absolute font-poppins-medium left-[195px] not-italic text-[15px] text-black text-center top-[112px] -translate-x-1/2 w-[320px] tracking-[-0.45px]">
                  <p className="font-poppins-bold mb-0">Symptoms: </p>
                  <p className="mb-0">PMS symptoms (e.g., bloating, breast tenderness),</p>
                  <p className="mb-0"> increased cravings, moodiness, fatigue</p>
                  <p className="font-poppins-bold mb-0">Hormone levels: </p>
                  <p>Progesterone levels rise, and then hormone levels began to drop a week before period in preparation for menstruation</p>
                </div>
              </div>
              {/* Clip icon */}
              <div className="absolute flex items-center justify-center right-[280px] top-0">
                <div className="h-[58px] relative w-[50px]">
                  <img alt="" className="absolute inset-0 object-cover object-center pointer-events-none w-full h-full" src={imgClip1StreamlineDoodlesClassic} />
                </div>
              </div>
            </div>

            {/* Right side - Welcome message and cycle insights */}
            <div className="flex-1 min-h-px mr-[-136px] overflow-hidden relative">
              {/* Welcome message */}
              <div className="absolute flex gap-[10px] items-center justify-center right-[265px] top-[3px]">
                <p className="font-srisakdi-bold not-italic text-[39px] text-black text-center tracking-[-1.17px]">Welcome Mysha!</p>
              </div>

              {/* Cycle insights tape */}
              <div className="absolute px-[6px] py-[84px] right-[87px] top-0 w-[250px]">
                <div className="h-[82.11px] relative w-[237.5px]">
                  <img alt="" className="block max-w-none w-full h-full" src={imgVector} />
                </div>
                <p className="absolute inset-[43.2%_21.6%_46.4%_21.6%] font-srisakdi-bold not-italic text-[22px] text-black text-center tracking-[-0.66px] whitespace-nowrap">Cycle Insights:</p>
              </div>

              {/* Cycle info card */}
              <div className="absolute flex flex-col gap-[18px] h-[360px] justify-center overflow-hidden px-[39px] py-[31px] right-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[108px] w-[385px]">
                <div className="absolute h-[306.042px] left-[15px] top-[31px] w-[341.017px]">
                  <img alt="" className="block max-w-none w-full h-full" src={imgFrame2} />
                </div>
                <p className="font-poppins-regular relative text-[14px] text-black tracking-[-0.42px] w-[312px]">Day  24 of  cycle (your cycle lasts 28 days)</p>
                <p className="font-poppins-regular relative text-[14px] text-black tracking-[-0.42px] w-[312px]">Average length of this phase: 13 days</p>
                <p className="font-poppins-regular relative text-[14px] text-black tracking-[-0.42px] w-[290px]">Energy forecast: "Next high-focus window: days 7–11 (follicular phase)</p>
                <p className="font-poppins-regular relative text-[14px] text-black tracking-[-0.42px] w-[290px]">"Your most logged symptom is fatigue near day 25."</p>
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <p className="font-poppins-medium not-italic text-[22px] text-black text-center tracking-[-0.66px] w-full whitespace-nowrap">we can maybe do a live cycle  here</p>
        </div>
      </div>
    </div>
  )
}

export default TestHomePage
