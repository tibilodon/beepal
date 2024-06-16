import { ColorTypes } from "../../Helpers/Types/commonTypes";
import ButtonA from "./ButtonA";

type Direction = "top" | "bottom";

interface Props {
  direction: Direction;
  label: string;
  color: ColorTypes;
}

function ScrollToBtn({ direction, label, color }: Props) {
  function scrollToCreate() {
    window.scroll({
      top:
        direction === "bottom"
          ? document.body.offsetHeight
          : document.body.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <ButtonA label={label} color={color} onClick={scrollToCreate} />
    </>
  );
}
export default ScrollToBtn;
