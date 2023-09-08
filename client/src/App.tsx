import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";
import Form from "./components/Form";
import Login from "./components/Login";

function App() {
  return (
    <div>
      <Navbar />
      <main className="mt-14 md:p-0 mx-auto">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/form/:formId" element={<Form />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
