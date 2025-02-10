import EyesEyes from "./eyes-eyes";
import EyesRound from "./eyes-round";
import EyesSmiling from "./eyes-smiling";

export default function Eyes(props: { style: string}) {
  const { style } = props;
  switch (style) {
    case "eyes": return <EyesEyes />;
    case "round": return <EyesRound />;
    case "smiling": return <EyesSmiling />;
    case "normal":
    default:
      return <EyesEyes />;
  }
}