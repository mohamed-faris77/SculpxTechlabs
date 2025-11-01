import React, { useState } from 'react';

export default function FileUpload({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = e => {
    e.preventDefault();
    if (!file) return;
    onUploaded(file, setProgress)
      .then(() => {
        setFile(null);
        setProgress(0);
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }} className="file-upload">
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="file"
          onChange={e => setFile(e.target.files[0])}
        />
        <button type="submit" disabled={!file}>
          Upload
        </button>
        {progress > 0 && (
          <div style={{ minWidth: 120 }}>
            <div className="progress">
              <i style={{ width: `${progress}%` }} />
            </div>
            <small>{progress}%</small>
          </div>
        )}
      </div>
    </form>
  );
}
