import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSetFriends }) {
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
