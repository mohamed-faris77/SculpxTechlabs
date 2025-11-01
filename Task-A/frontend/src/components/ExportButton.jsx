import React from 'react';

const ExportButton = ({ data }) => {
  const exportToCSV = () => {
    if (!data.length) return alert('No data to export');

    const header = Object.keys(data[0]).join(',');
    const rows = data.map((item) =>
      Object.values(item)
        .map((v) => `"${v}"`)
        .join(',')
    );

    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'export.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={exportToCSV} style={styles.button}>
      Export to CSV
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    cursor: 'pointer',
    borderRadius: '4px',
    marginLeft: '10px',
  },
};

export default ExportButton;
