import React from "react";

import type { NiceAvatarProps } from "./types"

import { genConfig } from "./utils";

import Base from "./layers/base";
import Hair from "./layers/hair";
import Ears from "./layers/ears";
import Eyebrows from "./layers/eyebrows";
import Eye from "./layers/eyes";
import Nose from "./layers/nose";
import Mouth from "./layers/mouth";
import Shirt from "./layers/shirt";
import { cn } from "@/lib/utils";

export default function Avatar(props: NiceAvatarProps) {
  const { id, className, style, } = props;
  const config = genConfig(props);
 
  
    return (
      <div
        id={id}
        className={cn(`bg-${config.bgColor}-200`, className)}
        style={{
          background: config.bgColor,
          overflow: "hidden",
          ...style
        }}>
        <div className="relative aspect-square size-full *:size-full *:absolute *:inset-0">
            <Base color={config.skinColor} />
            
              <Hair
                color={config.hairColor}
                style={config.hairStyle}/>

            {/* Face detail */}
            
              <Eyebrows />
              <Eye style={config.eyeStyle} />
              <Ears color={config.skinColor} style={config.earSize} />
              <Nose style={config.noseStyle} />
              <Mouth style={config.mouthStyle} />

            <Shirt color={config.shirtColor} style={config.shirtStyle} />
          </div>
      </div>
    );
}

export { genConfig } from "./utils";