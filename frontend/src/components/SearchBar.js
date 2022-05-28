import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import movieservice from "../services/movieservice";
import "../styles/SearchBar.css";

let queryBuffer = [];
const SearchBar = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  const handleQueryChange = (newValue) => {
    setQuery(newValue);

    if (newValue === null || newValue === "") {
      setItems([]);
      return;
    }

    const search = queryBuffer.find((search) => search.query === newValue);
    if (search) {
      setItems(search.results);
      return;
    }

    movieservice
      .getSearchResult(newValue)
      .then((response) => {
        console.log("Query result", newValue, response.data);
        setItems(response.data);
        queryBuffer.push({ query: newValue, results: response.data });
      })
      .catch((err) => console.log(err));
  };

  const handleNavigate = (item) => {
    navigate(`/${item.type}/${item._id}`);
    setQuery("");
  };

  return (
    <div>
      <input
        type="search"
        className="form-control search_bar"
        placeholder="Search for a movie, actor or director UPDATED"
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <ul
        style={isFocused ? {} : { visibility: "hidden" }}
        className="search_bar_list"
      >
        {items &&
          items.map((item) => {
            return (
              <li key={item._id} onMouseDown={() => handleNavigate(item)}>
                {item.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchBar;
