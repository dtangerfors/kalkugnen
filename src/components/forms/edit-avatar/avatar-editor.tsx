"use client"

import { useState } from "react"
import Avatar, {genConfig} from "@/components/avatar"
import { AvatarFullConfig, NiceAvatarProps } from "@/components/avatar/types"
import { defaultOptions as _defaultOptions, DefaultOptions as IDefaultOptions } from "@/components/avatar/utils"
import Base from "@/components/avatar/layers/base"
import { Typography } from "@/components/ui/typography"
import Hair from "@/components/avatar/layers/hair"
import Eyes from "@/components/avatar/layers/eyes"
import Ear from "@/components/avatar/layers/ears"
import Nose from "@/components/avatar/layers/nose"
import Mouth from "@/components/avatar/layers/mouth"
import Shirt from "@/components/avatar/layers/shirt"
import { cn } from "@/lib/utils"

export default function AvatarEditor(props: NiceAvatarProps) {

  const options = props || genConfig

  const [config, setConfig] = useState<AvatarFullConfig>(options);
  const [defaultOptions] = useState(_defaultOptions);

  const updateConfig = (key: string, value: string) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  const switchConfig = (type: keyof IDefaultOptions , currentOpt: string) => {
    const opts = defaultOptions[type];
    const currentIdx = opts.findIndex((item) => item === currentOpt);
    const newIdx = (currentIdx + 1) % opts.length;
    updateConfig(type, opts[newIdx]);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <picture className="p-1 rounded-full aspect-square overflow-hidden bg-white">
        <Avatar className="size-32 rounded-full" {...config}/>
      </picture>

      <div className="grid grid-cols-5 gap-4">
        {/* Face */}
        <ButtonSwapper
          tip="Hudfärg"
          switchConfig={() => switchConfig('skinColor', config.skinColor!)}
          name="skinColor"
          value={config.skinColor!}
        >
          <Base color={config.skinColor!} />
        </ButtonSwapper>
        
        {/* Hair */}
        <ButtonSwapper
          tip="Frisyr"
          switchConfig={() => switchConfig('hairStyle', config.hairStyle!)}
          name="hairStyle"
          value={config.hairStyle!}
        >
          <Hair style={config.hairStyle!} color={config.hairColor!} />
        </ButtonSwapper>

        {/* Hair color */}
        <ButtonSwapper
          tip="Hårfärg"
          switchConfig={() => switchConfig('hairColor', config.hairColor!)}
          name="hairColor"
          value={config.hairColor!}
        >
          <span style={{background: config.hairColor}} className="block !size-[1.875rem] rounded-full"></span>
        </ButtonSwapper>
        
        {/* Eyes */}
        <ButtonSwapper
          tip="Ögon"
          switchConfig={() => switchConfig('eyeStyle', config.eyeStyle!)}
          name="eyeStyle"
          value={config.eyeStyle!}
        >
          <Eyes style={config.eyeStyle!} />
        </ButtonSwapper>
        
        {/* Ear */}
        <ButtonSwapper
          tip="Öron"
          switchConfig={() => switchConfig('earSize', config.earSize!)}
          name="earSize"
          value={config.earSize!}
        >
          <Ear style={config.earSize!} color={config.skinColor!} />
        </ButtonSwapper>
        
        {/* Nose */}
        <ButtonSwapper
          tip="Näsa"
          switchConfig={() => switchConfig('noseStyle', config.noseStyle!)}
          name="noseStyle"
          value={config.noseStyle!}
        >
          <Nose style={config.noseStyle!}/>
        </ButtonSwapper>
        
        {/* Mouth */}
        <ButtonSwapper
          tip="Mun"
          switchConfig={() => switchConfig('mouthStyle', config.mouthStyle!)}
          name="mouthStyle"
          value={config.mouthStyle!}
        >
          <Mouth style={config.mouthStyle!}/>
        </ButtonSwapper>
        
        {/* Shirt */}
        <ButtonSwapper
          tip="Topp"
          switchConfig={() => switchConfig('shirtStyle', config.shirtStyle!)}
          name="shirtStyle"
          value={config.shirtStyle!}
        >
          <Shirt style={config.shirtStyle!} color={config.shirtColor!} />
        </ButtonSwapper>
        
        {/* Shirt color */}
        <ButtonSwapper
          tip="Färg"
          switchConfig={() => switchConfig('shirtColor', config.shirtColor!)}
          name="shirtColor"
          value={config.shirtColor!}
        >
          <span style={{background: config.shirtColor}} className="block !size-[1.875rem] rounded-full"></span>
        </ButtonSwapper>

        {/* Bg color */}
        <ButtonSwapper
          tip="Bakgrund"
          switchConfig={() => switchConfig('bgColor', config.bgColor!)}
          name="bgColor"
          value={config.bgColor!}
        >
          <span className={cn("block !size-[1.875rem] rounded-full", `bg-${config.bgColor}-200`)}></span>
        </ButtonSwapper>
      </div>
    </div>
  )
}

function ButtonSwapper(props: {
  children: React.ReactNode,
  switchConfig: () => void,
  tip: string,
  name: string, 
  value: string
}) {
  const { children, switchConfig, tip, name, value } = props
  return (
    <div className="flex flex-col items-center gap-1">
    <input type="hidden" name={name} value={value} />
    <button
      type="button"
      className="w-12 h-12 rounded-full p-2 bg-gray-50 border border-gray-100"
      data-tip={tip}
      onClick={switchConfig}>
      <div className="relative w-full h-full ">
        <div className="relative flex items-center justify-center *:size-full">
          {children}
        </div>
      </div>
    </button>
    <Typography variant="body-sm" level="p">{tip}</Typography>
    </div>
  )
}