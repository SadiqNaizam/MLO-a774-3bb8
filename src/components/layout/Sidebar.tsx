import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Search, Library, PlusSquare } from 'lucide-react'; // Example icons

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label }) => (
  <a
    href={href} // In a real app, this would be <Link to={href}> from react-router-dom
    className="flex items-center space-x-3 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </a>
);

const Sidebar: React.FC = () => {
  console.log("Rendering Sidebar");

  // Placeholder navigation items
  const mainNavItems: NavItemProps[] = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/search", icon: Search, label: "Search" },
    { href: "/library", icon: Library, label: "Your Library" },
  ];

  const playlistItems: NavItemProps[] = [
    { href: "/playlist/create", icon: PlusSquare, label: "Create Playlist" },
    // Add dynamically generated playlists here
    { href: "/playlist/1", icon: Library, label: "Liked Songs" },
    { href: "/playlist/2", icon: Library, label: "My Epic Mix" },
  ];


  return (
    <aside className="w-60 h-screen bg-neutral-50 border-r border-neutral-200 flex flex-col fixed top-0 left-0">
      <div className="p-4">
        {/* Placeholder for Logo */}
        <h1 className="text-2xl font-bold text-neutral-800">MusicApp</h1>
      </div>
      <nav className="flex-grow px-2 space-y-1">
        {mainNavItems.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>
      <div className="px-2 py-4 border-t border-neutral-200">
        <ScrollArea className="h-[calc(100vh-20rem)]"> {/* Adjust height as needed */}
            <nav className="space-y-1">
                {playlistItems.map((item) => (
                    <NavItem key={item.label} {...item} />
                ))}
            </nav>
        </ScrollArea>
      </div>
       {/* Optional: User profile section at the bottom */}
    </aside>
  );
}

export default Sidebar;