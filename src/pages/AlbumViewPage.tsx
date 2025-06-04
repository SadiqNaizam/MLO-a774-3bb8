import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SongListItem from '@/components/SongListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlayCircle, Heart, PlusCircle } from 'lucide-react';

const placeholderAlbum = {
  id: 'alb1',
  name: 'Adventures in Time',
  artist: 'The Time Travelers Ft. Doraemon',
  releaseYear: '2024',
  coverImageUrl: 'https://images.unsplash.com/photo-1462965326201-d02e4f455804?auto=format&fit=crop&w=400&q=60',
  trackCount: 2,
  totalDuration: '6:55',
};

const placeholderSongs = [
  { id: 'alsong1', title: 'Future Echoes', artist: placeholderAlbum.artist, album: placeholderAlbum.name, duration: '3:10', imageUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id), isLiked: false },
  { id: 'alsong2', title: 'Gadget Symphony', artist: placeholderAlbum.artist, album: placeholderAlbum.name, duration: '3:45', imageUrl: 'https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id), isLiked: true },
];

const placeholderMusicPlayerTrack = {
  id: 'song1',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=60',
  durationSeconds: 195,
};

const AlbumViewPage = () => {
  console.log('AlbumViewPage loaded');

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60 overflow-hidden">
        <header className="h-16 flex-shrink-0 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex-1 max-w-md">
            {/* Input might not be needed here, or could be for filtering album tracks */}
            {/* <Input type="search" placeholder="Filter tracks..." className="bg-neutral-100 border-neutral-300" /> */}
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
                src={placeholderAlbum.coverImageUrl} 
                alt={`${placeholderAlbum.name} cover`}
                className="w-48 h-48 md:w-56 md:h-56 rounded-lg object-cover shadow-lg"
              />
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase text-neutral-500">Album</p>
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 my-2">{placeholderAlbum.name}</h1>
                <p className="text-xl text-neutral-700 mb-1">
                  By <a href="#" className="font-medium text-blue-600 hover:underline">{placeholderAlbum.artist}</a>
                </p>
                <p className="text-sm text-neutral-500">
                  {placeholderAlbum.releaseYear} &bull; {placeholderAlbum.trackCount} songs, {placeholderAlbum.totalDuration}
                </p>
                <div className="mt-4 flex items-center space-x-3">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white">
                    <PlayCircle className="mr-2 h-5 w-5" /> Play Album
                  </Button>
                  <Button variant="outline" size="icon" aria-label="Like album">
                    <Heart className="h-5 w-5" />
                  </Button>
                   <Button variant="outline" size="icon" aria-label="Add to library">
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">Tracks</h2>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead>Title</TableHead>
                    {/* Artist column often omitted in album view as it's mostly the same */}
                    <TableHead className="text-right">Duration</TableHead>
                    <TableHead className="w-[80px] text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {placeholderSongs.map((song, index) => (
                     <TableRow key={song.id} className="group">
                        <TableCell colSpan={4} className="p-0 hover:bg-transparent">
                           <SongListItem 
                             {...song} 
                             album={undefined} // Album name is redundant per row in album view usually
                           />
                        </TableCell>
                     </TableRow>
                  ))}
                </TableBody>
              </Table>
            </section>
          </main>
        </ScrollArea>

        <MusicPlayerBar currentTrack={placeholderMusicPlayerTrack} />
      </div>
    </div>
  );
};

export default AlbumViewPage;