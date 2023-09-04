import React from "react";

interface Props {
  children: React.ReactNode;
}

const CenterWrapper = ({ children }: Props) => {
  return <div className="max-w-6xl mx-auto">{children}</div>;
};

export default CenterWrapper;
