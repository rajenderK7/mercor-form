import React from "react";

interface Props {
  children: React.ReactNode;
}

const CenterWrapper = ({ children }: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 lg:px-0 py-4">{children}</div>
  );
};

export default CenterWrapper;
