import Logo from "@/components/logo";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative w-full h-dvh flex max-md:flex-col justify-end bg-white">
      <figure className="absolute inset-0 w-full h-dvh">
        <Image src="/digerhuvud-desktop.jpg" alt="Ett grönt fält med blåeld" quality={100} width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0 w-full h-dvh bg-primary opacity-50"></div>
      </figure>
      <div className="relative flex-1 grid place-items-center overflow-hidden max-md:-mb-6 max-md:pb-6 min-h-40">
        <div className="fill-white size-24">
          <Logo />
        </div>
      </div>
      <div className="relative md:h-full w-full grid place-items-center max-lg:max-h-[30rem] lg:max-w-screen-sm bg-white p-6 max-md:self-end max-md:rounded-t-2xl max-md:pb-12 md:rounded-l-2xl overflow-y-scroll transition-all duration-500">
        <div className="flex flex-col justify-center items-center">
          {children}
        </div>
      </div>
    </main>
  );
}
