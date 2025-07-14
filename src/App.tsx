import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminQuotation from "@/pages/AdminQuotation";
import AdminHistory from "@/pages/AdminHistory";
import AdminProducts from "@/pages/AdminProducts";
import SupplierDashboard from "@/pages/SupplierDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/quotation" element={<AdminQuotation />} />
              <Route path="/admin/history" element={<AdminHistory />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/supplier" element={<SupplierDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
