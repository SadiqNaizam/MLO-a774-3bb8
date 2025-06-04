import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import PlaylistViewPage from "./pages/PlaylistViewPage";
import AlbumViewPage from "./pages/AlbumViewPage";
import YourLibraryPage from "./pages/YourLibraryPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/playlist-view" element={<PlaylistViewPage />} /> {/* Static route for now */}
          {/* <Route path="/playlist/:playlistId" element={<PlaylistViewPage />} /> Alternative dynamic route */}
          <Route path="/album-view" element={<AlbumViewPage />} /> {/* Static route for now */}
          {/* <Route path="/album/:albumId" element={<AlbumViewPage />} /> Alternative dynamic route */}
          <Route path="/library" element={<YourLibraryPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;