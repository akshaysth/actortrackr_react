import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Actor from "./components/Actor";
import Homepage from "./components/Homepage";
import Layout from "./components/Layout";
import Report from "./components/Report";
import Ttp from "./components/Ttp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage title={`Dashboard`} />} />
          <Route path="/actors" element={<Actor />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/ttps" element={<Ttp />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
