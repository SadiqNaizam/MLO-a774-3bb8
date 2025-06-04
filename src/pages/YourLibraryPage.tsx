import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ContentCard from '@/components/ContentCard';
import SongListItem from '@/components/SongListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PlusSquare } from 'lucide-react';

const placeholderPlaylists = [
  { id: 'libpl1', title: 'My Time Travel Mix', subtitle: 'Playlist', type: 'playlist' as const, imageUrl: 'https://images.unsplash.com/photo-1567629588097-c13c00863455?auto=format&fit=crop&w=300&q=60', onPlay: () => {}, onClick: () => {} },
  { id: 'libpl2', title: 'Gadget Inspection Grooves', subtitle: 'Playlist', type: 'playlist' as const, imageUrl: 'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=300&q=60', onPlay: () => {}, onClick: () => {} },
];

const placeholderLikedSongs = [
  { id: 'libsong1', title: 'Doraemon no Uta (Liked)', artist: 'Kumiko Osugi', album: 'Doraemon OST', duration: '3:15', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id), isLiked: true },
  { id: 'libsong2', title: 'Yume wo Kanaete Doraemon (Liked)', artist: 'MAO', album: 'Doraemon New OST', duration: '4:05', imageUrl: 'https://images.unsplash.com/photo-1458560871784-56d23406c791?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id), isLiked: true },
];

const placeholderAlbums = [
  { id: 'libalbum1', title: 'Future Sounds (Saved)', subtitle: 'Nobita & The Gang', type: 'album' as const, imageUrl: 'https://images.unsplash.com/photo-1611068813580-b07ef920964b?auto=format&fit=crop&w=300&q=60', onPlay: () => {}, onClick: () => {} },
];

const placeholderMusicPlayerTrack = {
  id: 'song1',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=60',
  durationSeconds: 195,
};

const YourLibraryPage = () => {
  console.log('YourLibraryPage loaded');

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60 overflow-hidden">
        <header className="h-16 flex-shrink-0 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex-1 max-w-md">
            <Input type="search" placeholder="Filter in library..." className="bg-neutral-100 border-neutral-300 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <div className="flex items-center">
            <Button variant="ghost" className="mr-2">
                <PlusSquare className="mr-2 h-4 w-4" /> Create Playlist
            </Button>
            <Avatar className="ml-4 h-9 w-9">
                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-b698ab2b3ea1?auto=format&fit=crop&w=50&q=60" alt="User Avatar" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </header>

        <ScrollArea className="flex-1">
          <main className="p-6">
            <h1 className="text-3xl font-bold text-neutral-800 mb-6">Your Library</h1>
            <Tabs defaultValue="playlists" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
                <TabsTrigger value="songs">Liked Songs</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
              </TabsList>
              <TabsContent value="playlists">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {placeholderPlaylists.map(item => <ContentCard key={item.id} {...item} />)}
                </div>
              </TabsContent>
              <TabsContent value="songs">
                <div className="space-y-2">
                  {placeholderLikedSongs.map(song => <SongListItem key={song.id} {...song} />)}
                </div>
              </TabsContent>
              <TabsContent value="albums">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {placeholderAlbums.map(item => <ContentCard key={item.id} {...item} />)}
                </div>
              </TabsContent>
               <TabsContent value="artists">
                <p>Followed artists would appear here.</p>
                {/* Example: <ContentCard type="artist" ... /> */}
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>

        <MusicPlayerBar currentTrack={placeholderMusicPlayerTrack} />
      </div>
    </div>
  );
};

export default YourLibraryPage;