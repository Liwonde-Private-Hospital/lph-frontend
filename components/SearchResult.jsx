import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options); // Use 'en-GB' for day-month-year format
  };

  const handleClick = () => {
    if (result.FirstName === 'Name not found' || result.FirstName === 'Error fetching data') {
      alert(result.FirstName);
    } else {
      alert(`
        You selected ${result.FirstName}!
        First Name: ${result.FirstName}
        Last Name: ${result.LastName}
        Treatment: ${result.Treatment}
        Amount: ${result.Amount}
        Payment Method: ${result.PaymentMethod}
        Date: ${formatDate(result.Date)}

      `);
    }
  };

  return (
    <div className="search-result" onClick={handleClick}>
      <div><strong>First Name:</strong> {result.FirstName || 'N/A'}</div>
      <div><strong>Last Name:</strong> {result.LastName || 'N/A'}</div>
      <div><strong>Treatment:</strong> {result.Treatment || 'N/A'}</div>
      <div><strong>Amount:</strong> {result.Amount || 'N/A'}</div>
      <div><strong>Payment Method:</strong> {result.PaymentMethod || 'N/A'}</div>
      <div><strong>Date:</strong> {formatDate(result.Date)}</div>
    </div>
  );
};
