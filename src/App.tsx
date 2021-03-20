import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";
import { StatusTypes, DirectionTypes } from "./type";
import Profile from "./Profile";
import ClickRecord from "./ClickRecord";
import { BASE_URL, commonHeaders } from "./common";
import "./App.css";

interface IUser {
  id: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: string;
  registerDate?: string;
  phone?: string;
  picture?: string;
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>({ id: "" });
  const [checked, setChecked] = useState<boolean>(true);
  const [isClickRecord, setClickRecord] = useState<boolean>(false);
  const [isLike, setLike] = useState<boolean>(false);
  const [like, setLikeNumber] = useState<number>(0);
  const [likeUser, setLikeUser] = useState<boolean>(false);
  const [dislike, setDislikeNumber] = useState<number>(0);

  const handlers = useSwipeable({
    onSwipeStart: (data) => {
      data.dir === DirectionTypes.LEFT
        ? handleDislike(selectedUser.id)()
        : handleLike(selectedUser.id)();
    },
    trackMouse: true,
  });

  useEffect(() => {
    fetch(BASE_URL + "/user", {
      ...commonHeaders,
    })
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setSelectedUser(users[0]);
  }, [users, users.length]);

  const handleLike = (id: string) => () => {
    changeSelectedUser(id);
    setLikeNumber(like + 1);
    setLikeUser(true);
  };

  const handleDislike = (id: string) => () => {
    changeSelectedUser(id);
    setDislikeNumber(dislike + 1);
    setLikeUser(false);
  };

  const changeSelectedUser = (id: string) => {
    setClickRecord(false);
    const currUserIndex = users.reduce((acc, item, index) => {
      if (item.id === id) acc = index;
      return acc;
    }, 0);

    setChecked(false);

    if (currUserIndex < users.length && currUserIndex >= 0) {
      setSelectedUser(users[currUserIndex + 1]);
    }
  };

  const handleSelectRecordCard = (type: string) => () => {
    setClickRecord(true);
    setLike(type === StatusTypes.LIKE);
  };

  const handleBackToProfile = () => setClickRecord(false);

  return (
    <div className="App">
      {isClickRecord ? (
        <ClickRecord
          checked={checked}
          handleBackToProfile={handleBackToProfile}
          handleSelectRecordCard={handleSelectRecordCard}
          isLike={isLike}
          like={like}
          dislike={dislike}
        />
      ) : (
        selectedUser && (
          <div {...handlers} className="Profile__wrapper">
            <div>
              <Profile
                handleLike={handleLike}
                handleDislike={handleDislike}
                id={selectedUser.id}
                checked={checked}
                likeUser={likeUser}
                setChecked={setChecked}
                handleSelectRecordCard={handleSelectRecordCard}
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default App;
