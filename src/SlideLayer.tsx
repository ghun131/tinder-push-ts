import React from "react";
import Slide from "@material-ui/core/Slide";
import "./SlideLayer.css";

interface ISlideLayerProps {
  checked: boolean;
  like: boolean;
}

const SlideLayer: React.FC<ISlideLayerProps> = ({
  checked,
  children,
  like,
}) => {
  function generateDir(checked: boolean, like: boolean) {
    //Read about XOR binary operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_XOR
    return (Number(checked) ^ Number(like)) ? "left" : "right"
  }
  return (
    <Slide
      direction={generateDir(checked, like)}
      in={checked}
      timeout={500}
      mountOnEnter
      unmountOnExit
    >
      <div className="SlideLayer__container">{children}</div>
    </Slide>
  );
};

export default SlideLayer;
