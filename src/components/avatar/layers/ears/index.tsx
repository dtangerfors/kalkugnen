import EarsAttached from "./ears-attached";
import EarsDetached from "./ears-detached";

export default function Ear(props: { style: string, color: string}) {
  const { style, color } = props;
  switch (style) {
    case "detached": return <EarsDetached color={color} />;
    case "attached":
    default:
      return <EarsAttached color={color} />;
  }
}