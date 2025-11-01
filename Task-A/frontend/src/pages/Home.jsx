import React, { useEffect, useState } from 'react';
import API from '../api/api';
import Filters from '../components/Filters';
import DataTable from '../components/DataTable';
import ExportButton from '../components/ExportButton';

const Home = () => {
  const [filters, setFilters] = useState({ search: '', sort: '', order: 'asc' });
  const [records, setRecords] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const limit = import.meta.env.VITE_DEFAULT_LIMIT || 5;

  const fetchData = async () => {
    try {
      const { search, sort, order } = filters;
      const res = await API.get('/records', {
        params: { search, sort, order, page, limit },
      });
      setRecords(res.data.data);
      setTotalPages(res.data.pages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchData();
  };

  const handleReset = () => {
    setFilters({ search: '', sort: '', order: 'asc' });
    setPage(1);
    fetchData();
  };

  return (
    <div style={styles.container}>
      <h2>MERN Filtering, Sorting, and Pagination</h2>
      <Filters filters={filters} setFilters={setFilters} onSearch={handleSearch} onReset={handleReset} />
      <ExportButton data={records} />
      <DataTable data={records} />

      <div style={styles.pagination}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '90%',
    margin: '0 auto',
    textAlign: 'center',
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
};

export default Home;
