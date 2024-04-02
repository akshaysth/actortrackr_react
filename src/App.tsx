import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Actor from "./components/pages/Actors";
import Homepage from "./components/pages/Homepage";
import ReportsIndex from "./components/pages/Reports/ReportsIndex";
import Report from "./components/pages/Reports/report";
import Reports from "./components/pages/Reports/reports";
import ReportView from "./components/pages/Reports/view";
import Ttp from "./components/pages/Ttps";
import CreateReport from "./components/pages/Reports/create";

const sample_reports = [
  { id: 1, name: "Report 1", author: "admin" },
  { id: 2, name: "Report 2", author: "admin" },
  { id: 3, name: "Report 3", author: "admin" },
];

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage title={`Dashboard`} />} />
          <Route path="actors" element={<Actor title={`Actors`} />} />
          {/* <Route path="reports" element={<Reports />}> */}
          <Route path="reports" >
            <Route index element={<ReportsIndex reports={sample_reports} />} />
            <Route path=":reportId" element={<Report />} />
            <Route path="view" element={<ReportView />} />
            <Route path="create" element={<CreateReport />} />
          </Route>
          <Route path="/ttps" element={<Ttp title={`TTPs`} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
