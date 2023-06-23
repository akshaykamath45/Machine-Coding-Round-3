import "./styles.css";
import { snacks } from "./data/snackData";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [sortedSnack, setSortedSnack] = useState({ key: "", direction: "" });

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  //sorting table on header click
  const handleHeaderClick = (key) => {
    const newDirection =
      sortedSnack.key === key && sortedSnack.direction === "asc"
        ? "desc"
        : "asc";
    setSortedSnack({ key, direction: newDirection });
  };

  //sorting process
  const sortedSnacks = [...snacks].sort((a, b) => {
    const { key, direction } = sortedSnack;

    if (a[key] < b[key]) {
      return direction === "asc" ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return direction === "asc" ? 1 : -1;
      // return direction === "desc" ? -1 : 1;
    }
    return 0;
  });

  //filtering items on search input
  const filteredSnacks = sortedSnacks.filter((item) => {
    const productName = item.product_name;
    const ingredients = item.ingredients;
    const hasProductName = productName
      .toLowerCase()
      .includes(input.toLowerCase());
    const hasIngredients = ingredients.reduce(
      (acc, ingredient) =>
        acc || ingredient.toLowerCase().includes(input.toLowerCase()),
      false
    );

    return hasProductName || hasIngredients;
  });

  return (
    <div className="App">
      <h1>Snack Table</h1>
      <input
        style={{
          padding: "1px",
          marginBottom: "8px",
          width: "300px",
          height: "20px",
          borderRadius: "5px"
        }}
        onChange={handleInputChange}
        placeholder="Search with Products or Ingredients..."
      />
      <table className="snack-table">
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick("id")} className="sortable">
              ID
            </th>
            <th onClick={() => handleHeaderClick("product_name")}>
              Product Name
            </th>
            <th onClick={() => handleHeaderClick("product_weight")}>
              Product Weight
            </th>
            <th onClick={() => handleHeaderClick("price")} className="sortable">
              Price (INR)
            </th>
            <th onClick={() => handleHeaderClick("calories")}>Calories</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {filteredSnacks.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_name}</td>
              <td>{item.product_weight}</td>
              <td>{item.price}</td>
              <td>{item.calories}</td>
              <td>{item.ingredients.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
