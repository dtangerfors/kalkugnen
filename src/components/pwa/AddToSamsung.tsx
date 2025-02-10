import React from "react";

import { X, ArrowDown, Menu, Plus } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToSamsung(props: Props) {
  const { closePrompt, doNotShowAgain } = props;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-[80%] z-50 pb-12 px-6">
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
        <div className="flex gap-2 items-center">
          <p>Klicka på</p>
          <Menu className="text-4xl" />
          <p>ikonen</p>
        </div>
        <div className="flex flex-col gap-2 items-center w-full px-4">
          <p>Scrolla ner och klicka på:</p>
          <div className="bg-white text-zinc-800 flex flex-col gap-2 items-center p-4 rounded-lg">
            <Plus className="text-2xl" />
            <p>Lägg till sida</p>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center w-full px-4">
          <p>Välj sedan:</p>
          <div className="bg-white text-zinc-800 flex flex-col gap-2 items-center py-2 px-4 rounded-lg">
            <p>Hemskärm</p>
          </div>
        </div>
        <Button variant={"secondary"} onClick={doNotShowAgain}>
          Visa inte igen
        </Button>
        <ArrowDown className="text-4xl absolute -bottom-[50px] right-[-3px] text-white z-10 animate-bounce" />
      </div>
    </div>
  );
}
