import React, { useState } from 'react';
import axios from 'axios';
import './Home.css';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  const handleUploadToServer = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('files', selectedFile);

      axios.post('/summarize', formData)
        .then(response => {
          console.log('File uploaded successfully:', response.data);
          setResponseData(response.data[0].choices[0].message.content); // Store response data in state
        })
        .catch(error => {
          console.error('Error uploading file:', error);
        });
    } else {
      alert('Please select a PDF file first.');
    }
  };

  return (
    <div>
      <h1>Welcome to landing page</h1>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
      />
      <button onClick={handleUploadToServer}>Upload to Server</button>
      <div>
        {responseData && (
          <div className="pdfSummary">
            <h2>Summarized PDF</h2>
            {JSON.stringify(responseData, null, 2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
