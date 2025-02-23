import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">User Management Dashboard</h1>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
