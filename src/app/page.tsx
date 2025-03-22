import Image from 'next/image'

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div>
          <Image
            src="/bolt.gif"
            width={600}
            height={400}
            className="flex hidden md:block"
            alt="Boltsy Bear" />
        </div>
      </main>
    </>
  );
}
