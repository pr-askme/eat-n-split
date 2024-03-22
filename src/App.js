import { useState } from "react";

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

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

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
        />
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {friend.balance}$
        </p>
      )}

      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {-friend.balance}$
        </p>
      )}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !imageUrl) return;
    const id = Date.now();

    const newFriend = {
      id,
      name,
      imageUrl: `${imageUrl}/?u=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);
    setName("");
    setImageUrl("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label htmlFor="name">😊Friend</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="url">👌Image URL</label>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, onSetFriends }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const friendExpense = bill ? bill - userExpense : "";
  const [whoIsPaying, setwhoIsPaying] = useState("user");

  function handleSplitBill(e) {
    e.preventDefault();
    if (!bill || !friendExpense) return;
    const amountOwed = whoIsPaying === "user" ? friendExpense : -userExpense;

    onSetFriends(amountOwed);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Split bill with {selectedFriend.name}</h2>
      <label htmlFor="bill">💵 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label htmlFor="your expense">😎 Your expense</label>
      <input
        type="number"
        value={userExpense}
        onChange={(e) =>
          bill < e.target.value
            ? userExpense
            : setUserExpense(Number(e.target.value))
        }
      />
      <label htmlFor="friend expense">🧑‍🤝‍🧑 {selectedFriend.name} expense</label>
      <input type="number" value={friendExpense} disabled />
      <label htmlFor="payment">🍴 Who is paying for this meal?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setwhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
