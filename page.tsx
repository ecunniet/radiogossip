import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 gap-10">
        <Image
          src="/radio.svg"
          alt="Radio Gossip Logo"
          width={300}
          height={100}
          priority
        />
        <div>
          <h1 className="text-4xl font-bold mb-4 text-center">
            Bienvenue sur Radio Gossip
          </h1>
          <p className="text-lg text-center">
            La radio qui vous sert le thé tant qu&#39;il est chaud !
          </p>
          <Link
            href="/show/1"
            className="mt-8 inline-block bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
          >
            Commencer l&#39;écoute
          </Link>
        </div>
      </main>
    </div>
  );
}
