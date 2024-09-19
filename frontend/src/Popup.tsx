import React, { useEffect, useState } from 'react';
//import useStore from './store';

function Popup() {
  const [jobPosting, setJobPosting] = useState(null);

  useEffect(() => {
    const port = chrome.runtime.connect({ name: 'popup' });

    port.onMessage.addListener((message) => {
      if (message.type === 'job_posting') {
        setJobPosting(message.jobPosting);
      }
    });
    return () => {
      port.disconnect();
    };
  }, []);

  function login() {
    console.log('Logging in...');
  }

  return (
    <div>
      <h2>Cover Letter Genie</h2>
      <button onClick={login}>Login</button>
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

export default Popup;
