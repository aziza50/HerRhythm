import React from "react";
import TopBanner from "../components/TopBanner";

// Background images
const bgImage =
  "https://www.figma.com/api/mcp/asset/a9c15f6e-7617-49ff-9189-de4819acab2b";
const paperTexture =
  "https://www.figma.com/api/mcp/asset/a13ec45d-162d-4fd5-9da5-32b47a0e084a";

// Figma design assets
const decorativeFlower =
  "https://www.figma.com/api/mcp/asset/edc5d53b-fee2-42c4-9dc8-6f36c2aeba15";
const paperClipIcon =
  "https://www.figma.com/api/mcp/asset/c275f69b-0ea7-495a-b171-36cdcea7ccb9";
const lutealPhaseStickyNote =
  "https://www.figma.com/api/mcp/asset/e5428677-02c2-4c57-b600-0e023bfe3cbf";
const cycleInsightsStickyNote =
  "https://www.figma.com/api/mcp/asset/15bd162d-c341-406f-8e99-22d6a17e825d";
const washiTapeDecoration =
  "https://www.figma.com/api/mcp/asset/7478b2be-3727-4413-b715-1627b8fd7f45";

function HomePage({ userName, onNavigate }) {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <img
        src={bgImage}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Navigation Banner */}
        <TopBanner onNavigate={onNavigate} />

        {/* Main Content Frame - This is your main white container */}
        <div className="relative w-[900px] h-[640px] bg-[rgba(255,255,255,0.85)] rounded-[64px] shadow-[0_10px_0_1px_#5A5A5A] overflow-hidden flex flex-col justify-center items-center -mt-4">
          {/* Paper Texture Background */}
          <img
            src={paperTexture}
            alt="paper texture"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply rounded-[64px]"
          />

          {/* Title - Left Aligned */}
          <div className="absolute left-[90px] top-[70px] w-[500px] z-20">
            <p
              className="font-unkempt-bold text-[32px] leading-tight mb-2"
              style={{ textAlign: "left" }}
            >
              Hello {userName?.split(" ")[0] || "Mysha"}, you're in your
            </p>
            <p
              className="font-unkempt-bold text-[48px] leading-tight"
              style={{ textAlign: "left", color: "#c57770" }}
            >
              Luteal Phase.
            </p>
          </div>

          {/* Cat Hearts Image - Top Right */}
          <div className="absolute h-[240px] right-[7px] top-[7px] w-[360px] z-20">
            <img
              src="/cathearts.png"
              alt="Cat with hearts"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Figma Design Content - Positioned inside the main frame */}
          <div className="relative z-10 bg-[rgba(255,255,255,0)] opacity-90 overflow-clip rounded-[83px] size-full max-w-[785px] max-h-[468px]">
            {/* Left Side: Luteal Phase Sticky Note */}
            {/* TO ADJUST POSITION: Change 'left-[30px]' and 'top-[52px]' - Shifted another 10px left from 40px */}
            <div className="absolute h-[468px] left-[30px] top-[52px] w-[350px]">
              <div className="absolute content-stretch flex h-[366px] items-start left-0 overflow-clip top-[51px] w-[364px]">
                {/* Luteal Phase Content Container */}
                <div className="absolute box-border content-stretch flex gap-[10px] items-start px-[80px] py-[32px] right-0 top-[38px] w-[364px]">
                  {/* Decorative Flower - Top Left */}
                  {/* TO ADJUST POSITION: Change 'left-0' and 'top-0' */}
                  <div className="h-[143px] relative shrink-0 w-[146px]">
                    <img
                      alt="decorative flower"
                      className="absolute inset-0 max-w-none mix-blend-soft-light object-50%-50% object-cover pointer-events-none size-full"
                      src={decorativeFlower}
                    />
                  </div>

                  {/* Luteal Phase Sticky Note Background */}
                  {/* TO ADJUST POSITION: Change 'left-[-15px]' and 'top-[-20.61px]' */}
                  <div className="absolute flex h-[calc(1px*((var(--transform-inner-width)*0.017452405765652657)+(var(--transform-inner-height)*0.9998476505279541)))] items-center justify-center left-[-15px] top-[-20.61px] w-[calc(1px*((var(--transform-inner-height)*0.017452405765652657)+(var(--transform-inner-width)*0.9998476505279541)))]">
                    <div className="flex-none rotate-[359deg] scale-y-[-100%]">
                      <div className="h-[354.892px] relative w-[406.413px]">
                        <img
                          alt="luteal phase sticky note"
                          className="block max-w-none size-full"
                          src={lutealPhaseStickyNote}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Luteal Phase Text Content */}
                  {/* TO ADJUST POSITION: Change 'left-[195px]' and 'top-[102px]' */}
                  <div className="absolute font-['Poppins',sans-serif] leading-[normal] left-[195px] not-italic text-[12px] text-black text-left top-[102px] tracking-[-0.36px] translate-x-[-50%] w-[320px] whitespace-pre-wrap px-4 py-2">
                    <p className="font-bold mb-1">Symptoms: </p>
                    <p className="mb-1">
                      PMS symptoms (e.g., bloating, breast tenderness),
                    </p>
                    <p className="mb-1">
                      {" "}
                      increased cravings, moodiness, fatigue
                    </p>
                    <p className="font-bold mb-1">Hormone levels: </p>
                    <p>
                      Progesterone levels rise, and then hormone levels began to
                      drop a week before period in preparation for menstruation
                    </p>
                  </div>

                  {/* Luteal Phase Title */}
                  {/* TO ADJUST POSITION: Change 'left-[122px]' and 'top-[52px]' */}
                  <p className="absolute font-unkempt-bold left-[122px] text-[43px] top-[52px]">
                    Luteal{" "}
                  </p>
                </div>

                {/* Paper Clip Decoration - Left Side */}
                {/* TO ADJUST POSITION: Change 'right-[280px]' and 'top-0' */}
                <div className="absolute content-stretch flex flex-col gap-[10px] items-start justify-center right-[280px] top-0">
                  <div className="h-[58px] relative shrink-0 w-[50px]">
                    <img
                      alt="paper clip decoration"
                      className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                      src={paperClipIcon}
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Cycle Insights Sticky Note */}
              {/* TO ADJUST POSITION: Change 'left-[390px]' and 'top-0' - Shifted another 10px left from 400px */}
              <div className="absolute h-[468px] left-[390px] overflow-clip top-0 w-[350px]">
                {/* Cycle Insights Sticky Note Background */}
                {/* TO ADJUST POSITION: Change 'right-0' and 'top-[108px]' */}
                <div className="absolute box-border content-stretch flex flex-col gap-[18px] h-[360px] items-start justify-center overflow-clip pl-[60px] pr-[40px] py-[31px] right-0 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] top-[108px] w-[385px]">
                  {/* Cycle Insights Sticky Note Image */}
                  <div className="absolute h-[306.042px] left-[15px] top-[31px] w-[341.017px]">
                    <div className="absolute bottom-[-0.13%] left-[-0.12%] right-0 top-0">
                      <img
                        alt="cycle insights sticky note"
                        className="block max-w-none size-full"
                        src={cycleInsightsStickyNote}
                      />
                    </div>
                  </div>

                  {/* Cycle Day Information */}
                  {/* TO ADJUST POSITION: Change 'h-[36px]' and 'w-[300px]' */}
                  <p className="font-['Poppins',sans-serif] h-[36px] leading-[normal] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.42px] w-[300px] whitespace-pre-wrap">
                    Day 24 of cycle (your cycle lasts 28 days)
                  </p>

                  {/* Phase Length Information */}
                  <p className="font-['Poppins',sans-serif] h-[36px] leading-[normal] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.42px] w-[300px] whitespace-pre-wrap">
                    Average length of this phase: 13 days
                  </p>

                  {/* Energy Forecast */}
                  <p className="font-['Poppins',sans-serif] h-[36px] leading-[normal] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.42px] w-[300px] whitespace-pre-wrap">
                    Energy forecast: "Next high-focus window: days 7–11
                    (follicular phase)
                  </p>

                  {/* Symptom Log Information */}
                  <p className="font-['Poppins',sans-serif] h-[36px] leading-[normal] not-italic relative shrink-0 text-[14px] text-black tracking-[-0.42px] w-[300px] whitespace-pre-wrap">
                    "Your most logged symptom is fatigue near day 25."
                  </p>
                </div>

                {/* Washi Tape Decoration - Top Right */}
                {/* TO ADJUST POSITION: Change 'right-[87px]' and 'top-0' */}
                <div className="absolute box-border content-stretch flex flex-col gap-[10px] items-start overflow-clip px-[6px] py-[84px] right-[87px] top-0 w-[250px]">
                  <div className="h-[82.11px] relative shrink-0 w-[237.5px]">
                    <div className="absolute bottom-[-9.74%] left-[-1.68%] right-[-1.68%] top-0">
                      <img
                        alt="washi tape decoration"
                        className="block max-w-none size-full"
                        src={washiTapeDecoration}
                      />
                    </div>
                  </div>
                  <div className="absolute inset-[62.4%_37.2%_-2.4%_22.8%]" />

                  {/* Cycle Insights Title */}
                  {/* TO ADJUST POSITION: Change 'inset-[43.2%_21.6%_46.4%_21.6%]' */}
                  <p className="absolute font-unkempt-bold inset-[43.2%_21.6%_46.4%_21.6%] text-[22px] tracking-[-0.66px] whitespace-pre-wrap">
                    Cycle Insights:
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Text - Center Bottom */}
            {/* TO ADJUST POSITION: Change 'left-[468.5px]' and 'top-[562px]' */}
            <p className="absolute font-['Poppins:Medium',sans-serif] leading-[normal] left-[468.5px] not-italic text-[22px] text-black text-center top-[562px] tracking-[-0.66px] translate-x-[-50%] w-[785px] whitespace-pre-wrap">
              we can maybe do a live cycle here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
