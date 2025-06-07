import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
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
      <PWAInstallPrompt />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Index />
            </Suspense>
          } />
          <Route path="/vehicules" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Vehicules />
            </Suspense>
          } />
          <Route path="/vehicle/:id" element={
            <Suspense fallback={<div>Loading...</div>}>
              <VehicleDetails />
            </Suspense>
          } />
          <Route path="/vendre" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Vendre />
            </Suspense>
          } />
          <Route path="/about" element={
            <Suspense fallback={<div>Loading...</div>}>
              <About />
            </Suspense>
          } />
          <Route path="/login" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          } />
          <Route path="/profile" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Profile />
            </Suspense>
          } />
          <Route path="/seller-dashboard" element={
            <Suspense fallback={<div>Loading...</div>}>
              <SellerDashboard />
            </Suspense>
          } />
          <Route path="/chat/:vehicleId" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Chat />
            </Suspense>
          } />
          <Route path="/view-all" element={
            <Suspense fallback={<div>Loading...</div>}>
              <ViewAll />
            </Suspense>
          } />
          <Route path="*" element={
            <Suspense fallback={<div>Loading...</div>}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
