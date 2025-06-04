import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SongListItem from '@/components/SongListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlayCircle, Shuffle, Heart } from 'lucide-react';

const placeholderPlaylist = {
  id: 'pl1',
  name: 'Doraemon\'s Pocket Jams',
  description: 'All the best tunes from the 22nd century!',
  coverImageUrl: 'https://images.unsplash.com/photo-1542572230-1a50895a8995?auto=format&fit=crop&w=400&q=60',
  creator: 'Doraemon',
  trackCount: 2,
  totalDuration: '7:20',
};

const placeholderSongs = [
  { id: 'plsong1', title: 'Hopter Adventures', artist: 'Doraemon', album: 'Pocket Jams', duration: '3:30', imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id), isLiked: true },
  { id: 'plsong2', title: 'Small Light, Big World', artist: 'Nobita', album: 'Pocket Jams', duration: '3:50', imageUrl: 'https://images.unsplash.com/photo-1483000805330-4eaf0e019869?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id) },
];

const placeholderMusicPlayerTrack = {
  id: 'song1',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=60',
  durationSeconds: 195,
};


const PlaylistViewPage = () => {
  console.log('PlaylistViewPage loaded');

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60 overflow-hidden">
        <header className="h-16 flex-shrink-0 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex-1 max-w-md">
            <Input type="search" placeholder="Search within playlist..." className="bg-neutral-100 border-neutral-300 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <Avatar className="ml-4 h-9 w-9">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-b698ab2b3ea1?auto=format&fit=crop&w=50&q=60" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        <ScrollArea className="flex-1">
          <main className="p-6">
            <section className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
              <img 
                src={placeholderPlaylist.coverImageUrl} 
                alt={`${placeholderPlaylist.name} cover`}
                className="w-48 h-48 md:w-56 md:h-56 rounded-lg object-cover shadow-lg"
              />
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase text-neutral-500">Playlist</p>
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 my-2">{placeholderPlaylist.name}</h1>
                <p className="text-neutral-600 mb-1">{placeholderPlaylist.description}</p>
                <p className="text-sm text-neutral-500">
                  Created by <span className="font-medium text-blue-600">{placeholderPlaylist.creator}</span> &bull; {placeholderPlaylist.trackCount} songs, {placeholderPlaylist.totalDuration}
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                    <PlayCircle className="mr-2 h-5 w-5" /> Play
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Shuffle playlist">
                    <Shuffle className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Like playlist">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Album</TableHead>
                    <TableHead className="text-right">Duration</TableHead>
                    <TableHead className="w-[80px] text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {placeholderSongs.map((song, index) => (
                     // Using SongListItem within a TableCell that spans columns or adapting SongListItem structure.
                     // For now, assuming SongListItem renders as a "row".
                     // A proper table would list song.title, song.artist etc. in separate TableCells.
                     // Let's make it a list of SongListItem components.
                     <TableRow key={song.id} className="group">
                        <TableCell colSpan={5} className="p-0 hover:bg-transparent">
                           <SongListItem {...song} />
                        </TableCell>
                     </TableRow>
                  ))}
                </TableBody>
              </Table>
               {/* Fallback if direct SongListItem in Table isn't ideal:
                <div className="space-y-1">
                  {placeholderSongs.map((song, index) => (
                    <SongListItem 
                      key={song.id}
                      {...song}
                      // Minimal version props if needed
                    />
                  ))}
                </div>
              */}
            </section>
          </main>
        </ScrollArea>

        <MusicPlayerBar currentTrack={placeholderMusicPlayerTrack} />
      </div>
    </div>
  );
};

export default PlaylistViewPage;