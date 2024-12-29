import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddDocument = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        alert('User ID is missing. Please log in again.');
        return;
      }

      await axios.post(
        `http://localhost:8000/api/vehicles/upload?userId=${storedUserId}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      alert('File uploaded successfully');
      fetchDocuments(); // Fetch the updated list
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const fetchDocuments = async () => {
    try {
      const storedUserId = localStorage.getItem('userId');
      if (!storedUserId) {
        console.error('User ID is missing. Cannot fetch documents.');
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/vehicles/documents?userId=${storedUserId}`
      );
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Document</h2>
      <div className="flex flex-col space-y-4">
        {/* File Upload Input */}
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Upload
        </button>
      </div>

      {/* Uploaded Documents */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
        {documents.map((doc) => (
          <div key={doc._id} className="flex items-center space-x-4 mb-4">
            <p className="text-gray-800">{doc.fileName}</p>
            <a
              href={`data:${doc.contentType};base64,${arrayBufferToBase64(doc.fileData.data)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddDocument;
