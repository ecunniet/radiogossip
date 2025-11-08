"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function ShowLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <>
      <header className="w-full py-4! px-2! fixed top-0 left-0 bg-transparent flex items-center flex-row justify-between">
        <button onClick={() => router.back()} className="">
          <Image src="/back.svg" alt="Back Arrow" width={42} height={42} />
        </button>
        <h1 className="text-2xl font-semibold">Radio Gossip</h1>
        <div />
      </header>
      <div className="flex min-h-screen items-center justify-center">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 gap-10">
          <Image
            className="dark:invert"
            src={"/radio.svg"}
            alt="Radio Gossip Logo"
            width={500}
            height={100}
            priority
          />
          {children}
        </main>
      </div>
    </>
  );
}
