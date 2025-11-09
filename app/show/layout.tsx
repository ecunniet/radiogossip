"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
export default function ShowLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const isTheEndPage = pathname === "/show/end";

  const onNextPage = useCallback(() => {
    const pathElements = pathname.split("/");
    const isQuestionPage = pathElements.includes("question");
    if (!isQuestionPage) {
      const lastElement = pathElements.pop();
      const numberlastElement = parseInt(lastElement || "1");
      if (numberlastElement === 4) return router.push("/show/4/question/1");
      else return router.push(`/show/${numberlastElement + 1}`);
    } else {
      const questionNumber = parseInt(pathElements.pop() || "1");
      if (questionNumber === 6) return router.push("/show/end");
      else return router.push(`/show/4/question/${questionNumber + 1}`);
    }
  }, [pathname, router]);

  return (
    <>
      <header className="w-full py-4! px-2! fixed top-0 left-0 bg-transparent flex items-center flex-row justify-between">
        <button onClick={() => router.back()} className="">
          <Image src="/back.svg" alt="Back Arrow" width={42} height={42} />
        </button>
        <h1 className="text-2xl font-semibold">Radio Gossip</h1>
        {isTheEndPage ? (
          <div />
        ) : (
          <button
            onClick={onNextPage}
            className="bg-[#cf392c] rotate-180 rounded-full text-lg font-semibold transition"
          >
            <Image
              src="/back.svg"
              alt="Back Arrow"
              width={42}
              height={42}
              style={{
                filter: "invert(100%)",
              }}
            />
          </button>
        )}
      </header>
      <div className="flex min-h-screen items-center justify-center">
        <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center px-8! gap-10">
          <Image
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
