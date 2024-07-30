'use client';
import React from 'react';

interface SearchResult {
  ID: number;
  Amount: number;
  Date: string;
  FirstName: string;
  LastName: string;
  PaymentMethod: string;
  Treatment: string;
}

interface SearchResultsListProps {
  results: SearchResult[];
}

export const SearchResultsList: React.FC<SearchResultsListProps> = ({ results }) => {
  const handleClick = (result: SearchResult) => {
    alert(`ID: ${result.ID}\nName: ${result.FirstName} ${result.LastName}\nAmount: ${result.Amount}\nDate: ${result.Date}\nPayment Method: ${result.PaymentMethod}\nTreatment: ${result.Treatment}`);
  };

  return (
    <ul className="search-results">
      {results.map(result => (
        <li key={result.ID} onClick={() => handleClick(result)}>
          {result.FirstName} {result.LastName}
        </li>
      ))}
    </ul>
  );
};