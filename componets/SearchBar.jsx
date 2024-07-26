import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (query) => {
    if (!query.trim()) {
      setResults([]); // Clear results if query is empty
      return;
    }

    fetch(`http://localhost:3000/finance/${query}`)
      .then((response) => response.text())
      .then((text) => {
        console.log("Response text:", text);
        try {
          const json = JSON.parse(text);
          const results = json.filter((item) => {
            return (
              item &&
              (item.FirstName && item.FirstName.toLowerCase().includes(query.toLowerCase())) ||
              (item.LastName && item.LastName.toLowerCase().includes(query.toLowerCase()))
            );
          });
          setResults(results.length ? results : [{ FirstName: 'Name not found' }]);
        } catch (error) {
          console.error("Error parsing JSON:", error);
          setResults([{ FirstName: 'Name not found' }]);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setResults([{ FirstName: 'Name not found' }]);
      });
  };

  const handleChange = (query) => {
    setInput(query);
    fetchData(query);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};
