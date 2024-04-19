import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import UserNav from './userNav';


const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const[credits,setCredits] = useState(null);
  const [loading,setLoading]=useState(null)

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };
  useEffect(() => {
  
    fetchData();
  }, []); 

  const fetchData = () => {
    const formData = new FormData();
    const accessToken = localStorage.getItem('accessToken');
    formData.append('authorization', accessToken);
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };
   
    axios.post('/credits',formData,config)
      .then(response => {
      
        console.log('Data fetched successfully:', response);
        setCredits(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const handleUploadToServer = () => {
    if (selectedFile) {
      const formData = new FormData();
      const accessToken = localStorage.getItem('accessToken');
      formData.append('authorization', accessToken);
      formData.append('files', selectedFile);
      console.log(accessToken);
  
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };
      setLoading(true)
  
      axios.post('/summarize', formData, config)
        .then(response => {
          console.log('File uploaded successfully:', response.data);
          setResponseData(response.data[0].choices[0].message.content);
           fetchData();
           setLoading(false)
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
      <UserNav/>
      <h1>Welcome to landing page</h1>
      <p>Credits:{credits}</p>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
      />
 <button onClick={handleUploadToServer}>Summarize Pdf</button>
<div>
  {loading ? (
    <div className="spinner">
   <div class="spinner-border" role="status">

</div>
   
    </div>
  ) : (
    responseData && (
      <div className="pdfSummary">
        <h2>Summarized PDF</h2>
        {JSON.stringify(responseData, null, 2)}
      </div>
    )
  )}
</div>
    </div>
  );
};

export default Home;
