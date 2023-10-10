import Link from "next/link";
import Image from "next/image";
import KinoXPLogo from "@/public/kinoxp-logo-icon.png";

type Props = {
  actionText: string;
};

const HeaderSection = ({actionText} : Props) => {
  return (
    <header className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col">
      <Link href="/">
        <Image
          width={400}
          height={400}
          className="mx-auto h-20 w-auto cursor-pointer"
          src={KinoXPLogo}
          alt="IntelliOptima Logo"
        />
      </Link>
      <h2 className="mt-10 text-center text-2xl text-white font-bold leading-9 tracking-tight">
        {actionText}
      </h2>
    </header>
  );
}

export default HeaderSection;
