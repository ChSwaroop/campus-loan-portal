
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";

// Counselor pages
import CounselorDashboard from "./pages/counselor/Dashboard";
import NewApplication from "./pages/counselor/NewApplication";
import ApplicationsList from "./pages/counselor/ApplicationsList";
import ApplicationDetail from "./pages/counselor/ApplicationDetail";

// Approver pages
import ApproverDashboard from "./pages/approver/Dashboard";
import ReviewApplication from "./pages/approver/ReviewApplication";
import PendingApplications from "./pages/approver/PendingApplications";
import ReviewedApplications from "./pages/approver/ReviewedApplications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Admin routes */}
        <Route path="/admin" element={<MainLayout requiredRole="admin" />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
        </Route>

        {/* Counselor routes */}
        <Route path="/counselor" element={<MainLayout requiredRole="counselor" />}>
          <Route index element={<CounselorDashboard />} />
          <Route path="new-application" element={<NewApplication />} />
          <Route path="applications" element={<ApplicationsList />} />
          <Route path="applications/:id" element={<ApplicationDetail />} />
        </Route>

        {/* Approver routes */}
        <Route path="/approver" element={<MainLayout requiredRole="approver" />}>
          <Route index element={<ApproverDashboard />} />
          <Route path="review/:id" element={<ReviewApplication />} />
          <Route path="pending" element={<PendingApplications />} />
          <Route path="reviewed" element={<ReviewedApplications />} />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
