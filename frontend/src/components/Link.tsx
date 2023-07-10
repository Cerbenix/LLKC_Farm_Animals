import React from "react";

interface LinkProps {
  children: React.ReactNode;
  href: string;
}

const Link: React.FC<LinkProps> = ({ children, href }) => {
  return (
    <a href={href} className="hover:text-red-500 font-bold mr-5 whitespace-nowrap">
      {children}
    </a>
  );
};

export default Link;
