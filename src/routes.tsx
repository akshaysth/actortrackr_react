import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import CreateActor from "./components/pages/Actors/create";
import ActorList from "./components/pages/Actors/list";
import Homepage from "./components/pages/Homepage";
import CreateReport from "./components/pages/Reports/create";
import ReportsIndex from "./components/pages/Reports/list";
import Report from "./components/pages/Reports/report";
import ReportView from "./components/pages/Reports/view";
import TTPCreate from "./components/pages/Ttps/create";
import TTPList from "./components/pages/Ttps/index";
import TTPView from "./components/pages/Ttps/view";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Homepage title={`Dashboard`} />} />
      <Route path="actors">
        <Route index element={<ActorList />} />
        <Route path="create" element={<CreateActor />} />
      </Route>
      <Route path="reports">
        <Route index element={<ReportsIndex />} />
        <Route path=":reportId" element={<Report />} />
        <Route path="view" element={<ReportView />} />
        <Route path="create" element={<CreateReport />} />
      </Route>
      <Route path="ttps">
        <Route index element={<TTPList />} />
        <Route path=":ttpId" element={<TTPView />} />
        <Route path="view" element={<TTPView />} />
        <Route path="create" element={<TTPCreate />} />
      </Route>
    </Route>
  </Routes>
);
