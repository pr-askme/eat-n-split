import { useState } from "react";
import Button from "./Components/Button";
import FriendsList from "./Components/FriendsList";
import FormAddFriend from "./Components/FormAddFriend";
import FormSplitBill from "./Components/FormSplitBill";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function addFriend(friend) {
    setFriends([...friends, friend]);
  }

  function onSelectingFriend(friend) {
    setSelectedFriend((current) => (current?.id === friend.id ? null : friend));

    setShowAddFriend(false);
  }

  function onSetFriends(value) {
    setFriends((friends) =>
      friends.map((frd) =>
        frd.id === selectedFriend.id
          ? { ...frd, balance: frd.balance + value }
          : frd
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          onSelection={onSelectingFriend}
          selectedFriend={selectedFriend}
        />
        {showAddFriend && <FormAddFriend onAddFriend={addFriend} />}
        <Button onClick={() => setShowAddFriend((show) => !show)}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSetFriends={onSetFriends}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
