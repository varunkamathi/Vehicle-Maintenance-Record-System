import React, { useState, useEffect } from "react";
import axios from "axios";

const AddDocument = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        alert("User ID is missing. Please log in again.");
        return;
      }

      await axios.post(
        `http://localhost:8000/api/vehicles/upload?userId=${storedUserId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("File uploaded successfully");
      fetchDocuments(); // Fetch the updated list
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  const fetchDocuments = async () => {
    try {
      const storedUserId = localStorage.getItem("userId");
      if (!storedUserId) {
        console.error("User ID is missing. Cannot fetch documents.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8000/api/vehicles/documents?userId=${storedUserId}`
      );
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
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
    <div className="p-[22px] bg-gray-50 rounded-lg shadow-lg space-y-4">
      {/* Add Document Section */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Add Document
        </h2>
        <div className="flex flex-col items-start space-y-4">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 bg-gray-100 rounded border border-gray-300 p-2"
          />
          <button
            onClick={handleUpload}
            className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition-all self-center"
          >
            Upload
          </button>
        </div>
      </div>
      <hr />
      {/* Uploaded Documents Section */}
      <div>
        <p className="font-semibold text-gray-800 mb-4">Uploaded Documents</p>
        <div className="space-y-4">
          {documents.length > 0 ? (
            documents.map((doc) => (
              <div
                key={doc._id}
                className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
              >
                <p className="text-gray-700 font-medium">{doc.fileName}</p>
                <a
                  href={`data:${doc.contentType};base64,${arrayBufferToBase64(
                    doc.fileData.data
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline font-medium hover:text-blue-600"
                >
                  View PDF
                </a>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm">
              No documents uploaded yet. Start by adding a document.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddDocument;
