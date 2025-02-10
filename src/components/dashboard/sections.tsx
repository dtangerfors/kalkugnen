import clsx from "clsx";
import { Typography } from "../ui/typography";

type SectionProps = {
  children: React.ReactNode;
}

export const Hero = ({ title }: {title: string}) => (
  <header className="bg-primary pt-safe-top">
    <div className="p-6 h-52 pb-10 flex items-end">
      <Typography level="h1" variant="l" color="text-white">{title}</Typography>
    </div>
  </header>
)

export const Section = ({ children }: SectionProps) => (
  <section className="p-6 pt-0">
    {children}
  </section>
);

export const Main = ({children}: {children: React.ReactNode}) => (
  <div className="relative z-[2]">
    <div className="bg-background h-6 rounded-t-3xl -mt-6"></div>
    <div className={clsx("relative flex flex-col gap-2 md:gap-6 max-lg:pb-[6.5rem] bg-background")}>
      {children}
    </div>
  </div>
)