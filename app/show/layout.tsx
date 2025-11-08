import Image from "next/image";

const isProd = process.env.NODE_ENV === "production";
export default function ShowLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 gap-10">
        <Image
          className="dark:invert"
          src={`${isProd ? "/radiogossip" : ""}/radio.svg`}
          alt="Radio Gossip Logo"
          width={300}
          height={100}
          priority
        />
        <div>{children}</div>
      </main>
    </div>
  );
}
