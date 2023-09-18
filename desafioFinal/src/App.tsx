import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <div className="App bg-gray-600">
        <Routes>
          <Route path="/" element={<SearchForm />} />
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
