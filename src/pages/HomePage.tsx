import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Carousel from '@/components/Carousel';
import ContentCard from '@/components/ContentCard';
import SongListItem from '@/components/SongListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button'; // Used for example play button

const placeholderCarouselSlides = [
  { id: 'slide1', title: 'Doraemon\'s Awesome Mix', subtitle: 'Hits from the future!', imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=60' },
  { id: 'slide2', title: 'Nobita\'s Study Beats', subtitle: 'Focus tunes', imageUrl: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?auto=format&fit=crop&w=600&q=60' },
  { id: 'slide3', title: 'Shizuka\'s Relaxing Melodies', subtitle: 'Chill vibes only', imageUrl: 'https://images.unsplash.com/photo-1507838153414-b4b7ba330536?auto=format&fit=crop&w=600&q=60' },
];

const placeholderContentCards = [
  { id: 'album1', title: 'Future Funk', subtitle: 'Gian Grooves', type: 'album' as const, imageUrl: 'https://images.unsplash.com/photo-1587883599947-68910057039e?auto=format&fit=crop&w=300&q=60', onPlay: () => console.log('Play album1'), onClick: () => console.log('Navigate to album1') },
  { id: 'playlist1', title: 'Anywhere Door Adventures', subtitle: 'Playlist by Suneo', type: 'playlist' as const, imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=300&q=60', onPlay: () => console.log('Play playlist1'), onClick: () => console.log('Navigate to playlist1') },
  { id: 'album2', title: 'Memory Bread Anthems', subtitle: 'Dorami\'s Picks', type: 'album' as const, imageUrl: 'https://images.unsplash.com/photo-1619983081563-436f63e0229f?auto=format&fit=crop&w=300&q=60', onPlay: () => console.log('Play album2'), onClick: () => console.log('Navigate to album2') },
  { id: 'artist1', title: 'Doraemon', subtitle: 'Artist', type: 'artist' as const, imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=60', onClick: () => console.log('Navigate to artist1 Doraemon') },
];

const placeholderSongs = [
  { id: 'song1', title: 'Doraemon no Uta', artist: 'Kumiko Osugi', album: 'Doraemon OST', duration: '3:15', imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id), isLiked: true },
  { id: 'song2', title: 'Yume wo Kanaete Doraemon', artist: 'MAO', album: 'Doraemon New OST', duration: '4:05', imageUrl: 'https://images.unsplash.com/photo-1458560871784-56d23406c791?auto=format&fit=crop&w=100&q=60', onPlayPause: (id:string|number) => console.log('Play/pause song', id) },
];

const placeholderMusicPlayerTrack = {
  id: 'song1',
  title: 'Doraemon no Uta',
  artist: 'Kumiko Osugi',
  imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=100&q=60',
  durationSeconds: 195,
};

const HomePage = () => {
  console.log('HomePage loaded');

  return (
    <div className="flex h-screen bg-neutral-50 text-neutral-900">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60 overflow-hidden">
        <header className="h-16 flex-shrink-0 bg-white border-b border-neutral-200 px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex-1 max-w-md">
            <Input type="search" placeholder="Search for your favorite gadgets..." className="bg-neutral-100 border-neutral-300 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <Avatar className="ml-4 h-9 w-9">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-b698ab2b3ea1?auto=format&fit=crop&w=50&q=60" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        <ScrollArea className="flex-1 bg-gradient-to-br from-blue-50 via-red-50 to-yellow-50">
          <main className="p-6 space-y-8">
            <section aria-labelledby="featured-carousel">
              <h2 id="featured-carousel" className="text-2xl font-semibold text-neutral-800 mb-4">Featured Playlists</h2>
              <Carousel slides={placeholderCarouselSlides} />
            </section>

            <section aria-labelledby="discover-content">
              <h2 id="discover-content" className="text-2xl font-semibold text-neutral-800 mb-4">Discover New Music</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {placeholderContentCards.map(card => (
                  <ContentCard key={card.id} {...card} />
                ))}
              </div>
            </section>
            
            <section aria-labelledby="recently-played">
              <h2 id="recently-played" className="text-2xl font-semibold text-neutral-800 mb-4">Recently Played</h2>
              <div className="space-y-2">
                {placeholderSongs.map(song => (
                  <SongListItem key={song.id} {...song} />
                ))}
              </div>
            </section>
          </main>
        </ScrollArea>

        <MusicPlayerBar currentTrack={placeholderMusicPlayerTrack} />
      </div>
    </div>
  );
};

export default HomePage;