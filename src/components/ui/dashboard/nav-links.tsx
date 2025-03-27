'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

  
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    { name: 'Home', href: '/dashboard' },
    { name: 'Invoices', href: '/dashboard/invoices' },
    { name: 'Chat', href: '/dashboard/chat' },
  ];
   
  export default function NavLinks() {
    const pathname = usePathname();
    
    return (
      <>
        {links.map((link) => {
          // const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'items-center justify-center gap-2 bg-gray-50 p-3 text-sm text-black font-medium hover:bg-sky-100 hover:text-blue-600',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
            >
              {/* <LinkIcon className="w-6" /> */}
              <p>{link.name}</p>
            </Link>
          );
        })}
      </>
    );
  }