import React from 'react';

export default function FileItem({ file, onRename, onDelete }) {
  // Use import.meta.env for Vite and handle fallback
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  const downloadUrl = apiBase.replace('/api', '') + '/files/' + file.filename;

  return (
    <li className="file-item">
      <div className="file-meta">
        <a href={downloadUrl} target="_blank" rel="noreferrer" className="filename">
          {file.originalName}
        </a>
        <small className="muted">{Math.round(file.size / 1024)} KB</small>
      </div>
      <div className="file-actions">
        <button
          onClick={() => {
            const newName = prompt('New name?', file.originalName);
            if (newName) onRename(file._id, newName);
          }}
        >
          Rename
        </button>
        <button
          onClick={() => onDelete(file._id)}
          className="secondary"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
