import Image from "next/image";
import React from "react";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="flex justify-center items-center space-x-3">
      <Image
        src="/logo/inquiro.svg"
        alt="inquiro-logo"
        width={48}
        height={48}
      />
      <h1 className="text-3xl text-white font-semibold">Inquiro</h1>
    </div>
  );
};

export default Header;
