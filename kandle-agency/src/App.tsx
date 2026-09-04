import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesPage from "./pages/ServicesPage";
import Work from "./pages/Work";
import ProjectDetail from "./pages/ProjectDetail";
import ApproachPage from "./pages/ApproachPage";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin is code-split into its own chunk — public visitors never download
// the CMS bundle, and it's only fetched the moment someone navigates to
// /admin/*.
const AdminGuard = lazy(() => import("./admin/AdminGuard"));
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const Login = lazy(() => import("./admin/pages/Login"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const Leads = lazy(() => import("./admin/pages/Leads"));
const Projects = lazy(() => import("./admin/pages/Projects"));
const Media = lazy(() => import("./admin/pages/Media"));
const Content = lazy(() => import("./admin/pages/Content"));

function AdminFallback() {
  return <div className="min-h-screen bg-ink" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<ProjectDetail />} />
          <Route path="approach" element={<ApproachPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<AdminFallback />}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<AdminFallback />}>
              <AdminGuard>
                <AdminLayout />
              </AdminGuard>
            </Suspense>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="projects" element={<Projects />} />
          <Route path="media" element={<Media />} />
          <Route path="content" element={<Content />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
