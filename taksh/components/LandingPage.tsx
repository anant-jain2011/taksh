import React from "react";

const LandingPage = () => {
  return (
    <div
      className="absolute w-full top-0 -z-1 font-sans min-h-screen before:absolute before:inset-0 before:bg-black before:opacity-55 before:-z-1 before:pointer-events-none py-16"
      style={{
        backgroundImage: "url('/bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <span className="block mx-auto w-fit text-sm text-[#e5b574] border-2 border-[#732b14] px-3 py-1.5 rounded-2xl mt-8">
        ⚒️ Built by Developers, for Developers
      </span>
      <h1 className="text-7xl font-bold text-center text-[#ddd] mt-4">
        Where Developers
      </h1>
      <h1
        className="text-7xl font-bold text-center"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ca4929 40%, #db9a65 60%)",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        Craft the Future
      </h1>
    </div>
  );
};

export default LandingPage;
