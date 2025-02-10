import chroma from "chroma-js";

import ShirtCollared from "./shirt-collared";
import ShirtCrew from "./shirt-crew";
import ShirtOpen from "./shirt-open";

export default function Shirt(props: { color: string, style: string }) {
  const { style, color } = props;
  const secondColor = chroma(color).brighten(1).hex();
  switch (style) {
    case "collared": return <ShirtCollared color={color} lightColor={secondColor} />;
    case "crew": return <ShirtCrew color={color} lightColor={secondColor} />;
    case "open":
    default:
      return <ShirtOpen color={color} />;
  }
}