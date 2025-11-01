import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  listFiles,
  uploadFile,
  renameFile,
  deleteFile
} from '../api/files';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const [files, setFiles] = useState([]);
  const nav = useNavigate();
  const { logout } = useAuth();

  const fetchFiles = async () => {
    let mounted = true;
    try {
      const { data } = await listFiles();
      if (mounted) setFiles(data);
    } catch (e) {
      // Let the axios interceptor / auth context handle 401 globally if desired.
      console.error(e);
    }
    return () => {
      mounted = false;
    };
  };

  useEffect(() => {
    // call fetchFiles and cleanup via returned cleanup flag
    const cleanup = fetchFiles();
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const handleUpload = (file, onProg) =>
    uploadFile(file, onProg).then(res => {
      setFiles(f => [res.data, ...f]);
    });

  const handleRename = (id, newName) =>
    renameFile(id, newName).then(res => {
      setFiles(f => f.map(x => (x._id === id ? res.data : x)));
    });

  const handleDelete = id =>
    deleteFile(id).then(() => {
      setFiles(f => f.filter(x => x._id !== id));
    });

  const handleLogout = () => {
    // use AuthContext to clear token and trigger navigation from App
    logout();
    nav('/login');
  };

  return (
    <div className="app-container">
      <div className="header">
        <h2>Your Files</h2>
        <div className="controls right">
          <button className="secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="card">
        <FileUpload onUploaded={handleUpload} />
        <FileList
          files={files}
          onRename={handleRename}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
