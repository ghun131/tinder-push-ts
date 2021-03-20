import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import IconButton from "@material-ui/core/IconButton";
import Favorite from "@material-ui/icons/Favorite";
import Close from "@material-ui/icons/Close";
import ThumbUp from "@material-ui/icons/ThumbUp";
import ThumbDown from "@material-ui/icons/ThumbDown";
import { StatusTypes } from "./type";
import { BASE_URL, commonHeaders } from "./common";
import SlideLayer from "./SlideLayer";
import "./Profile.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface IProfileProps {
  id: string;
  handleLike: (id: string) => () => void;
  handleDislike: (id: string) => () => void;
  checked: boolean;
  likeUser: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  handleSelectRecordCard: (type: string) => () => void;
}

function Profile({
  id,
  handleLike,
  handleDislike,
  checked,
  likeUser,
  setChecked,
  handleSelectRecordCard,
}: IProfileProps) {
  const [age, setAge] = useState<string>("");
  const [picture, setPicture] = useState<string>();
  const [name, setName] = useState("");

  useEffect(() => {
    if (id)
      fetch(BASE_URL + "/user/" + id, {
        ...commonHeaders,
      })
        .then((res) => res.json())
        .then((json) => {
          if (json) {
            setName(json.firstName);
            setPicture(json.picture);
            const ageStr = dayjs(json.dateOfBirth).fromNow();
            setAge(ageStr.split(" ")[0]);
            setChecked(true);
          }
        });
  }, [id, setChecked]);

  return (
    <SlideLayer like={likeUser} checked={checked}>
      <div className="ProfileAction__container__top">
        <IconButton
          onClick={handleSelectRecordCard(StatusTypes.DISLIKE)}
          className="ProfileAction__button"
        >
          <ThumbDown />
        </IconButton>
        <IconButton
          onClick={handleSelectRecordCard(StatusTypes.LIKE)}
          className="ProfileAction__button"
        >
          <ThumbUp />
        </IconButton>
      </div>
      <div className="UserProfile__container">
        {picture && (
          <div>
            <div
              style={{ backgroundImage: `url(${picture})` }}
              className="Profile__picture"
            />
            <div className="Profile__text">
              <span className="Profile__name">{name}</span>, &nbsp;
              <span>{age}</span>
            </div>
          </div>
        )}
      </div>
      <div className="ProfileAction__container__bottom">
        <IconButton
          className="ProfileAction__button"
          onClick={handleDislike(id)}
        >
          <Close />
        </IconButton>
        <IconButton className="ProfileAction__button" onClick={handleLike(id)}>
          <Favorite />
        </IconButton>
      </div>
    </SlideLayer>
  );
}

export default Profile;
