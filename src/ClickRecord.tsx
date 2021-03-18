import React from "react";
import "./Profile.css";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import SlideLayer from "./SlideLayer";

interface IClickRecordProps {
  checked: boolean;
  handleSelectRecordCard: (
    id: string
  ) => () => void;
  handleBackToProfile: () => void;
  isLike: boolean;
  like: number;
  dislike: number;
}

function ClickRecord({
  checked,
  handleSelectRecordCard,
  handleBackToProfile,
  isLike,
  like,
  dislike,
}: IClickRecordProps) {
  return (
    <div className="ClickRecord__container"> 
      <div className="ProfileAction__container__top">
        <IconButton
          onClick={handleSelectRecordCard("dislike")}
          className="ProfileAction__button"
        >
          <ThumbDown />
        </IconButton>
        <IconButton
          onClick={handleSelectRecordCard("like")}
          className="ProfileAction__button"
        >
          <ThumbUp />
        </IconButton>
      </div>
      <div className="ClickRecord__main">
        {isLike ? (
          <p>
            You like <strong className="ClickRecord__like">{like}</strong>{" "}
            people
          </p>
        ) : (
          <p>
            You dislike{" "}
            <strong className="ClickRecord__dislike">{dislike}</strong> people
          </p>
        )}
      </div>
      <div className="ProfileAction__container__bottom">
        <IconButton
          className="ProfileAction__button"
          onClick={handleBackToProfile}
        >
          <Close />
        </IconButton>
        <IconButton
          className="ProfileAction__button"
          onClick={handleBackToProfile}
        >
          <Favorite />
        </IconButton>
      </div>
    </div>
  );
}

export default ClickRecord;
