import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Create from "./components/Create";
import Form from "./components/Form";
import Login from "./components/Login";
import Responded from "./components/Responded";
import Landing from "./components/Landing";

function App() {
  return (
    <div>
      <Navbar />
      <main className="mt-14 md:p-0 mx-auto">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create" element={<Create />} />
          <Route path="/form/:formId" element={<Form />} />
          <Route path="/responded/" element={<Responded />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
