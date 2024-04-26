import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import NotesPage from "./pages/NotesPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/notes" element={<NotesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
