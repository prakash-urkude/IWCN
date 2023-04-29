import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([
    { "MONTH 1": "", "Onboarding Call": "", "Google Search Console Access": "", "Google Analytics Access": "", "Website Access": "", "Technical Audit": "", "Anchor Text/URL Mapping": "", "Google Data Studio Report + Local Reporting Suite": "", "Site Level Optimization": "", "On Page Optimization": "", "Content Publishing": "", "Premium Press Release": "", "Anthority Niche Placements": "", "Review Management": "", "Index Links": "", "Video Recap": "" },
    { "MONTH 1": "", "Onboarding Call": "", "Google Search Console Access": "", "Google Analytics Access": "", "Website Access": "", "Technical Audit": "", "Anchor Text/URL Mapping": "", "Google Data Studio Report + Local Reporting Suite": "", "Site Level Optimization": "", "On Page Optimization": "", "Content Publishing": "", "Premium Press Release": "", "Anthority Niche Placements": "", "Review Management": "", "Index Links": "", "Video Recap": "" },
    { "MONTH 1": "", "Onboarding Call": "", "Google Search Console Access": "", "Google Analytics Access": "", "Website Access": "", "Technical Audit": "", "Anchor Text/URL Mapping": "", "Google Data Studio Report + Local Reporting Suite": "", "Site Level Optimization": "", "On Page Optimization": "", "Content Publishing": "", "Premium Press Release": "", "Anthority Niche Placements": "", "Review Management": "", "Index Links": "", "Video Recap": "" },
    { "MONTH 1": "", "Onboarding Call": "", "Google Search Console Access": "", "Google Analytics Access": "", "Website Access": "", "Technical Audit": "", "Anchor Text/URL Mapping": "", "Google Data Studio Report + Local Reporting Suite": "", "Site Level Optimization": "", "On Page Optimization": "", "Content Publishing": "", "Premium Press Release": "", "Anthority Niche Placements": "", "Review Management": "", "Index Links": "", "Video Recap": "" }
  ]);

  const [headers, setHeaders] = useState([
    { name: "MONTH 1", key: "MONTH 1" },
    { name: "Onboarding Call", key: "Onboarding Call" },
    { name: "Google Search Console Access", key: "Google Search Console Access" },
    { name: "Google Analytics Access", key: "Google Analytics Access" },
    { name: "Website Access", key: "Website Access" },
    { name: "Technical Audit", key: "Technical Audit" },
    { name: "Anchor Text/URL Mapping", key: "Anchor Text/URL Mapping" },
    { name: "Google Data Studio Report + Local Reporting Suite", key: "Google Data Studio Report + Local Reporting Suite" },
    { name: "Site Level Optimization", key: "Site Level Optimization" },
    { name: "On Page Optimization", key: "On Page Optimization" },
    { name: "Content Publishing", key: "Content Publishing" },
    { name: "Premium Press Release", key: "Premium Press Release" },
    { name: "Anthority Niche Placements", key: "Anthority Niche Placements" },
    { name: "Review Management", key: "Review Management" },
    { name: "Index Links", key: "Index Links" },
    { name: "Video Recap", key: "Video Recap" }
  ]);

  const addRow = () => {
    const newRow = {};
    headers.forEach(header => {
      newRow[header.key] = "";
    });
    const newData = [...data, newRow];
    setData(newData);
  };

  const updateCell = (newValue, rowIndex, key) => {
    const newData = [...data];
    newData[rowIndex][key] = newValue;
    setData(newData);

    const boxId = `${rowIndex}-${key}`;

    axios.put('/api/update-box', { boxId, newValue })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  return (
    <div>
      
      <table>
        <thead>
          <tr>
            <th></th>
            {data.map((row, rowIndex) => (
              <th key={rowIndex}>{rowIndex + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {headers.map((header, headerIndex) => (
            <tr key={headerIndex}>
              <td>{header.name}</td>
              {data.map((row, rowIndex) => (
                <td
                  key={rowIndex}
                  contentEditable={true}
                  onBlur={e => updateCell(e.target.innerHTML, rowIndex, header.key)}
                >
                  {row[header.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addRow}>Add Row</button>
    </div>
  );
}

export default App;
