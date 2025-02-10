import NoseCurve from "./nose-curve";
import NosePointed from "./nose-pointed";
import NoseRound from "./nose-round";

export default function Nose(props: { style: string}) {
  const { style } = props;
  switch (style) {
    case "curve": return <NoseCurve />;
    case "pointed": return <NosePointed />;
    case "round":
    default:
      return <NoseRound />;
  }
}