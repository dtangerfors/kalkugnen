import clsx from "clsx";

export function Tile({ number, text, icon }: { number: string | number; text: string, icon: React.ReactNode }) {
  return (
    <div className={clsx("flex flex-col gap-3 rounded-2xl bg-white p-3")}>
      <div className="relative">
        <span className="font-sans text-base font-medium leading-tight text-gray-600">{text}</span>
      </div>
      <div className="relative inline-flex gap-2 items-center">
        <span className="inline-block self-center *:size-6 *:stroke-gray-600 pt-1">{icon}</span>
        <span className="font-sans font-extrabold text-2xl xl:text-4xl text-black leading-none">
          {number}
        </span>
      </div>
    </div>
  )
}