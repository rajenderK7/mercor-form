import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div>
      <Navbar />
      <main className="mt-14 p-2 md:p-0 mx-auto">
        <Routes>
          <Route path="/login" element={<p>Login</p>} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<p>Create</p>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
