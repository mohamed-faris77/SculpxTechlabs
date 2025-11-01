import React from 'react';

const Filters = ({ filters, setFilters, onSearch, onReset }) => {
  return (
    <div style={styles.filterContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        style={styles.input}
      />
      <select
        value={filters.sort}
        onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
        style={styles.select}
      >
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="date">Date</option>
      </select>
      <select
        value={filters.order}
        onChange={(e) => setFilters({ ...filters, order: e.target.value })}
        style={styles.select}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
      <button onClick={onSearch} style={styles.button}>
        Apply
      </button>
      <button onClick={onReset} style={{ ...styles.button, backgroundColor: '#ccc' }}>
        Reset
      </button>
    </div>
  );
};

const styles = {
  filterContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '1rem',
  },
  input: {
    flex: 1,
    padding: '8px',
  },
  select: {
    padding: '8px',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default Filters;
