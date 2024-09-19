import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Popup from './Popup';
import Onboarding from './Onboarding';
import './App.css';

console.log('App.tsx');

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Popup />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  );
};

export default App;
