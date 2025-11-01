import React from 'react';

const DataTable = ({ data }) => {
  return (
    <table style={styles.table}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {data.length ? (
          data.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>${item.price}</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: 'center', padding: '15px' }}>
              No records found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
  },
};

export default DataTable;
