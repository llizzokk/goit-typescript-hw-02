import styles from "./SearchBar.module.css";
import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { toast } from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast.error("Enter your search query", {
        style: {
          color: "rgb(63, 71, 78)",
        },
        duration: 2000,
        position: "top-right",
      });
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos..."
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          <IoIosSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
