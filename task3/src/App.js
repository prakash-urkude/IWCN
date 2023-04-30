import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [responseHeaders, setResponseHeaders] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');

  

  const handleApiRequest = async (e) => {
    e.preventDefault();
    
    try {
      const { data } = await axios.post(
        "http://localhost:3005/task3",
        {phonenumber:phoneNumber}
      );
      console.log(data)
      setResponseHeaders(data);
      if (data?.status) {
        window.alert("success");
      }
    } catch (error) {
      window.alert(error.response.data.message);
    }
  };

 

  return (
    <div>
    <div style={{gap:"15px",maxWidth:"800px",marginLeft:"500px",marginTop:"20px",backgroundColor:"brown", borderStyle:"double", border:"solid",padding:"25px", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <input
    type="tel"
    value={phoneNumber}
    onChange={(e) => setPhoneNumber(e.target.value)}
    placeholder="Enter phone number"
    style={{
      padding: "10px",
      fontSize: "20px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#f4f4f4",
      color: "#333"
    }}
  />
  <button 
    style={{
      backgroundColor:"#4CAF50",
      color:"white",
      padding:"10px 20px",
      borderRadius:"5px",
      border:"none",
      cursor:"pointer",
      fontSize:"20px"
    }} 
    onClick={handleApiRequest}>
      Send Number
  </button>
  <pre  
    style={{
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      backgroundColor: '#f4f4f4',
      border: '1px solid #ccc',
      padding: '10px',
      marginTop: '10px',
      maxWidth: '800px',
      fontSize:"30px",
    }}>
    {JSON.stringify(responseHeaders.data)}
  </pre>
  <pre  
    style={{
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      backgroundColor: '#f4f4f4',
      border: '1px solid #ccc',
      padding: '10px',
      marginTop: '10px',
      maxWidth: '800px',
      fontSize:"30px",
    }}>
    phone Origin :{ JSON.stringify(responseHeaders.headerData)} 
  </pre>
  <pre  
    style={{
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      backgroundColor: '#f4f4f4',
      border: '1px solid #ccc',
      padding: '10px',
      marginTop: '10px',
      maxWidth: '800px',
      fontSize:"30px",
    }}>
    Date :{ JSON.stringify(responseHeaders.date)}
  </pre>
</div>

    </div>
  );
  };

export default App;
