'use client'
import React, { useState, useEffect } from 'react';
import './style.css';
import icon from '../../../favicon.ico';
import Image from 'next/image';
import { SearchResultsList } from '@/componets/searchResultsList';
import { logout } from '@/actions';
import { LPHStaffRole } from '@/app/enums';

interface SearchResult {
  ID: number;
  Amount: number;
  Date: string;
  FirstName: string;
  LastName: string;
  PaymentMethod: string;
  Treatment: string;
}

export default function Backstore() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input.trim()) {
        fetchData(input);
      } else {
        setResults([]);
        setError('Please enter a search query.');
      }
    }, 500); // Delay in milliseconds

    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const toggleProfile = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    setShowProfile(!showProfile);
  };

  const fetchData = async (query: string) => {
    setIsLoading(true);
    const queryParts = query.toLowerCase().split(' ');
    console.log('Query Parts:', queryParts); // Debug log

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/finance/${query}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: SearchResult[] = await response.json();
      console.log('API Response:', data);

      const filteredResults = data.filter((item) => {
        const fullName = (item.FirstName + ' ' + item.LastName).toLowerCase();
        console.log('Full Name:', fullName); // Debug log
        return queryParts.every(part => fullName.includes(part));
      });

      console.log('Filtered Results:', filteredResults); // Debug log

      if (filteredResults.length > 0) {
        setResults(filteredResults);
        setError('');
      } else {
        setResults([]);
        setError('Name not found');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
      setError('Name not found');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
    setError(''); // Clear error when user starts typing
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.FirstName === 'Name not found' || result.FirstName === 'Error fetching data') {
      alert(result.FirstName + result.LastName);
    } else {
      //  alert(`
      //   SEARCH RESULTS FOR: ${result.FirstName+'    '+result.LastName}!
      //    First Name: ${result.FirstName}
      //    Last Name: ${result.LastName}
      //    Treatment: ${result.Treatment}
      //    Amount: ${result.Amount}
      //    Payment Method: ${result.PaymentMethod}
      //    Date: ${formatDate(result.Date)}
      //  `);
    }
  };

  const handleLogout = async () => {
    logout(LPHStaffRole.FINANCE);
  };

  return (
    <div>
      <div id="dash">
        <header>Finance</header>
        <ul>
          <li>
            <a href="#" onClick={toggleProfile}>
              Profile
            </a>
          </li>
          <li>
            <a href="Summary">Day Summary</a>
          </li>
          <li>
            <a href="History">Transaction History</a>
          </li>
          <li>
            <a href="#">Creditors</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
      <div id="table">
        <div>
          <Image src={icon} alt="alt" width={100} height={100} />
        </div>
        <div id="searchbar" className="relative w-full max-w-md mb-4">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Search for patients"
              className={`flex-grow p-2 pl-8 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={() => fetchData(input)}
              className="p-2 bg-green-800 text-white rounded-r-md hover:bg-orange-400"
            >
              Search
            </button>
          </div>

          {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
          {isLoading ? (
            <p className="text-gray-700 text-sm mt-1">Loading...</p>
          ) : (
            results.length > 0 && (
              <div className="mt-4">
                {results.map((result, id) => (
                  <div
                    key={id}
                    className="p-4 mb-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleResultClick(result)}
                  >
                    <div><strong>First Name:</strong> {result.FirstName || 'N/A'}</div>
                    <div><strong>Last Name:</strong> {result.LastName || 'N/A'}</div>
                    <div><strong>Treatment:</strong> {result.Treatment || 'N/A'}</div>
                    <div><strong>Amount:</strong> {result.Amount || 'N/A'}</div>
                    <div><strong>Payment Method:</strong> {result.PaymentMethod || 'N/A'}</div>
                    <div><strong>Date:</strong> {formatDate(result.Date)}</div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
        <div className="button-container">
          <a href="ViewData">
            <div>
              <button className="button">TodaysData</button>
            </div>
          </a>
          <div>
            <a href="Record">
              <button className="button2">New Day</button>
            </a>

            {showProfile && (
              <div className="profile-popup absolute right-0 top-0 mt-2 mr-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <div className="profile-content p-4">
                  <div className="flex justify-center">
                    <div className="rounded-lg overflow-hidden h-32 w-32 mb-4">
                      <img
                        src="https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/440377891_847631457383615_2637721381328687699_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LbaLrq5mlXMQ7kNvgEYJP0J&_nc_ht=scontent-jnb2-1.xx&oh=00_AYA9O63tWIPYEEjJt0aOZcC17fF4VMAVTZjcAJL16fh_2A&oe=6676A9C3"
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <h2 className="text-lg font-semibold text-center">
                    User Profile
                  </h2>
                  <p className="text-sm">
                    <span className="font-semibold">Name:</span>Wakisa
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Age:</span> 25
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Position:</span>Cashier
                  </p>
                  <div className="text-center mt-4">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={toggleProfile}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
