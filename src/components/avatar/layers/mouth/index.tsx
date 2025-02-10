import MouthLaughing from "./mouth-laughing";
import MouthPucker from "./mouth-pucker";
import MouthSmile from "./mouth-smile";

export default function Mouth(props: { style: string}) {
  const { style } = props;
  switch (style) {
    case "smile": return <MouthSmile />;
    case "pucker": return <MouthPucker />;
    case "laughing": return <MouthLaughing />;
    case "normal":
    default:
      return <MouthSmile />;
  }
}