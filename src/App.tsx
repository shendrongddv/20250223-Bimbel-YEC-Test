import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
