import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import ContentCard from '@/components/ContentCard';
import SongListItem from '@/components/SongListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const placeholderSongs = [
  { id: 'srsong1', title: 'Doraemon\'s Bell', artist: 'Doraemon', album: 'Gadget Grooves', duration: '2:50', imageUrl: 'https://images.unsplash.com/photo-1516223725307-6d7652ba0970?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id) },
  { id: 'srsong2', title: 'Time Machine Pop', artist: 'Nobita & The Gang', album: 'Future Sounds', duration: '3:20', imageUrl: 'https://images.unsplash.com/photo-1611068813580-b07ef920964b?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id), isLiked: true },
];

const placeholderAlbums = [
  { id: 'sralbum1', title: 'Gadget Grooves', subtitle: 'Doraemon', type: 'album' as const, imageUrl: 'https://images.unsplash.com/photo-1587883599947-68910057039e?auto=format&fit=crop&w=300&q=60', onPlay: () => console.log('Play sralbum1'), onClick: () => console.log('Navigate to sralbum1') },
];

const placeholderArtists = [
   { id: 'srartist1', title: 'Doraemon', subtitle: 'Artist', type: 'artist' as const, imageUrl: 'https://images.unsplash.com/photo-1560820289-9cb11989381f?auto=format&fit=crop&w=300&q=60', onClick: () => console.log('Navigate to srartist1') },
];

const placeholderMusicPlayerTrack = {
  id: 'song1',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=60',
  durationSeconds: 195,
};


const SearchPage = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60 overflow-hidden">
        <header className="h-16 flex-shrink-0 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex-1 max-w-md">
            <Input 
              type="search" 
              placeholder="Search songs, artists, albums..." 
              className="bg-neutral-100 border-neutral-300 focus:border-blue-500 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Avatar className="ml-4 h-9 w-9">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-b698ab2b3ea1?auto=format&fit=crop&w=50&q=60" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        <ScrollArea className="flex-1">
          <main className="p-6">
            {searchTerm ? (
              <h1 className="text-2xl font-semibold text-neutral-800 mb-6">Results for "{searchTerm}"</h1>
            ) : (
              <h1 className="text-2xl font-semibold text-neutral-800 mb-6">Search for your favorite music</h1>
            )}
            <Tabs defaultValue="songs" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="songs">Songs</TabsTrigger>
                <TabsTrigger value="albums">Albums</TabsTrigger>
                <TabsTrigger value="artists">Artists</TabsTrigger>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
              </TabsList>
              <TabsContent value="songs">
                <div className="space-y-2">
                  {placeholderSongs.map(song => <SongListItem key={song.id} {...song} />)}
                  {placeholderSongs.length === 0 && <p>No songs found for "{searchTerm}".</p>}
                </div>
              </TabsContent>
              <TabsContent value="albums">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {placeholderAlbums.map(album => <ContentCard key={album.id} {...album} />)}
                  {placeholderAlbums.length === 0 && <p>No albums found for "{searchTerm}".</p>}
                </div>
              </TabsContent>
              <TabsContent value="artists">
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {placeholderArtists.map(artist => <ContentCard key={artist.id} {...artist} />)}
                  {placeholderArtists.length === 0 && <p>No artists found for "{searchTerm}".</p>}
                </div>
              </TabsContent>
              <TabsContent value="playlists">
                <p>Playlist search results would appear here.</p>
                {/* Example: <ContentCard type="playlist" ... /> */}
              </TabsContent>
            </Tabs>
          </main>
        </ScrollArea>

        <MusicPlayerBar currentTrack={placeholderMusicPlayerTrack} />
      </div>
    </div>
  );
};

export default SearchPage;