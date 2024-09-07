import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  //const [tabUrl, setTabUrl] = useState('');

  //useEffect(() => {
  //  // Listener for messages from background script
  //  const handleMessage = (message: any) => {
  //    if (message.type === 'TAB_UPDATED') {
  //      setTabUrl(message.url);
  //    }
  //  };
  //
  //  chrome.runtime.onMessage.addListener(handleMessage);
  //
  //  // Cleanup listener on component unmount
  //  return () => {
  //    chrome.runtime.onMessage.removeListener(handleMessage);
  //  };
  //}, []);

  return (
    <div>
      <h2>Hello World</h2>
    </div>
  );
}

export default App;
