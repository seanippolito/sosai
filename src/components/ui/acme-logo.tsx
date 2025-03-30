import { lusitana } from "./fonts";
import Image from "next/image";

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
        src="/baddies.JPG"
        width={100}
        height={100}
        className="flex hidden md:block"
        alt="Baddies"
      />
    </div>
  );
}
