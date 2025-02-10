import HairFull from "./hair-full";
import HairFonze from "./hair-fonze";
import HairDanny from "./hair-danny";
import HairPixie from "./hair-pixie";

export default function Hair(props: { style: string, color: string}) {
  const { style, color } = props;
  switch (style) {
    case "full": return <HairFull color={color} />;
    case "fonze": return <HairFonze color={color}/>;
    case "danny": return <HairDanny color={color} />;
    case "pixie": return <HairPixie color={color} />;
    case "normal":
    default:
      return <HairFonze color={color} />;
  }
}