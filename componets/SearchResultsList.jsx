import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.length === 0 ? (
        <div className="no-results">Name not found</div>
      ) : (
        results.map((result, id) => (
          <SearchResult result={result} key={id} />
        ))
      )}
    </div>
  );
};
