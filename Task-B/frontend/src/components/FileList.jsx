import React from 'react';
import FileItem from './FileItem';

export default function FileList({ files, onRename, onDelete }) {
  if (!files.length) return <p>No files yet.</p>;
  return (
    <ul className="file-list">
      {files.map(f => (
        <FileItem
          key={f._id}
          file={f}
          onRename={onRename}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
