import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [jobPosting, setJobPosting] = useState(null);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: 'popup' });

    //port.postMessage({ type: 'get_job_posting' });

    port.onMessage.addListener((message) => {
      if (message.type === 'job_posting') {
        console.log("Job posting received:", message.jobPosting);
        setJobPosting(message.jobPosting);
      }
    });

    return () => {
      port.disconnect(); // Cleanup on unmount
    };
  }, []);

  return (
    <div>
      <h2>Cover Letter Genie</h2>
      <div>
        {jobPosting ? (
          <ul>
            {Object.entries(jobPosting).map(([key, value]) => (
              <li key={key}>
                <>
                  <strong>{key}:</strong> {value}
                </>
              </li>
            ))}
          </ul>
        ) : (
          <p>No job posting detected...</p>
        )}
      </div>
    </div>
  );
}

export default App;
