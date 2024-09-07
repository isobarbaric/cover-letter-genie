import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [jobPosting, setJobPosting] = useState(null);

  useEffect(() => {
    const messageListener = (message: any) => {
      if (message.type === 'job_posting') {
        console.log("Job posting received");
        setJobPosting(message.jobPosting);
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []); 

  return (
    <div>
      <h2>Cover Letter Genie</h2>
      <div>
        {jobPosting || "No job posting"}
      </div>
    </div>
  );
}

export default App;
