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
    if (like) {
      if (checked) return "left";
      else return "right";
    } else {
      if (checked) return "right";
      else return "left";
    }
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
