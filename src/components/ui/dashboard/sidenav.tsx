import Link from "next/link";
import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <div className="fixed top-20 flex flex-col opacity-80">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 md:w-40">
          <p>Add Logo here, Design with AI?</p>
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md md:block"></div>
      </div>
    </div>
  );
}
