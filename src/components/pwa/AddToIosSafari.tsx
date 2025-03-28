import React from "react";

import { X, Share, SquarePlus, ArrowDown } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToIosSafari(props: Props) {
  const { closePrompt, doNotShowAgain } = props;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[60%] z-50 pb-12 px-6">
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
          För bästa upplevelse och funktionalitet, spara ner Stenbrottsvägen till din hemskärm
        </p>
        <div className="flex gap-2 items-center">
          <p>Klicka på</p>
          <Share className="text-4xl" />
          <p>ikonen</p>
        </div>
        <div className="flex flex-col gap-2 items-center w-full px-4">
          <p>Scrolla ner och klicka på:</p>
          <div className="bg-gray-100 flex justify-between items-center w-full px-4 py-2 rounded-lg">
            <p>Lägg till på hemskärmen</p>
            <SquarePlus className="text-2xl" />
          </div>
        </div>
        <Button variant={"secondary"} onClick={doNotShowAgain}>
          Visa inte igen
        </Button>
        <ArrowDown className="text-4xl absolute -bottom-[50px] text-white -z-10 animate-bounce" />
      </div>
    </div>
  );
}
