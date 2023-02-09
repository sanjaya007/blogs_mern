import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import IndexPage from "./pages/IndexPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
