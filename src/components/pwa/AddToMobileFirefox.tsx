import React from "react";
import Image from "next/image";

import { X, EllipsisVertical, SquareArrowDownRight } from "lucide-react";
import ffIcon from "@/assets/img/icons/firefox-install.png";
import { Button } from "../ui/button";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToMobileFirefox(props: Props) {
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
        <div className="flex gap-2 items-center text-lg">
          <p>Klicka på</p>
          <EllipsisVertical className="text-4xl" />
          <p>ikonen</p>
        </div>
        <div className="flex flex-col gap-2 items-center text-lg w-full px-4">
          <p>Scrolla ner och klicka på:</p>
          <div className="bg-gray-100 flex justify-around items-center w-full px-4 py-2 rounded-lg">
            <div className="flex gap-6 items-center">
              <Image
                src={ffIcon}
                alt="Firefox install icon"
                width={32}
                height={32}
              />
              <p>Installera</p>
            </div>
          </div>
        </div>
        <Button variant={"secondary"} onClick={doNotShowAgain}>
          Visa inte igen
        </Button>
        <SquareArrowDownRight className="text-4xl absolute -bottom-[50px] right-1 text-white z-10 animate-bounce" />
      </div>
    </div>
  );
}
