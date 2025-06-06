
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VehicleDetails from "./pages/VehicleDetails";
import SellerDashboard from "./pages/SellerDashboard";
import Chat from "./pages/Chat";
import Vendre from "./pages/Vendre";
import Vehicules from "./pages/Vehicules";
import About from "./pages/About";
import Login from "./pages/Login";
import ViewAll from "./pages/ViewAll";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/dashboard" element={<SellerDashboard />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/vendre" element={<Vendre />} />
          <Route path="/vehicules" element={<Vehicules />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/view-all" element={<ViewAll />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
