import React from "react";
import Link from "next/link";

import { X } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToOtherBrowser(props: Props) {
  const { closePrompt, doNotShowAgain } = props;
  const searchUrl = `https://www.google.com/search?q=add+to+home+screen+for+common-mobile-browsers`;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60%] z-50 pb-12 px-6 flex flex-col items-center justify-around">
      <div className="relative bg-white p-4 h-full rounded-xl flex flex-col justify-around items-center text-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          className="absolute top-0 right-0"
          onClick={closePrompt}
        >
          <X className="text-2xl" />
        </Button>
        <p>
          För bästa upplevelse och funktionalitet, spara ner Stenbrottsvägen
          till din hemskärm
        </p>
        <div className="flex flex-col gap-4 items-center">
          <p>
            Tyvärr kunde vi inte avgöra vilken webbläsare du använder. Vänligen
            sök efter hur du installerar en webbapp för din webbläsare.
          </p>
          <Link className="text-blue-800" href={searchUrl} target="_blank">
            Sök på google
          </Link>
        </div>
        <Button variant={"secondary"} onClick={doNotShowAgain}>
          Visa inte igen
        </Button>
      </div>
    </div>
  );
}
