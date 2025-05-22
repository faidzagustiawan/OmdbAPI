import React from 'react';

const SearchBar = ({ query, setQuery, onSearch }) => {
  const handleKey = (e) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        placeholder="Cari film..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKey}
        className="flex-grow border px-4 py-2 rounded-md"
      />
      <button
        onClick={onSearch}
        className="bg-blue-600 text-white px-4 rounded-md hover:bg-blue-700"
      >
        Cari
      </button>
    </div>
  );
};

export default SearchBar;
