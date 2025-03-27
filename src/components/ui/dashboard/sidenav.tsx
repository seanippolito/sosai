import Link from 'next/link';
import NavLinks from './nav-links';
import AcmeLogo from '@/components/ui/acme-logo';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/dashboard"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow bg-gray-50"></div>
      </div>
    </div>
  );
}