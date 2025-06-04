import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  Heart,
  ListMusic
} from 'lucide-react';

interface CurrentTrack {
  id: string;
  title: string;
  artist: string;
  imageUrl?: string;
  durationSeconds: number; // Total duration in seconds
}

interface MusicPlayerBarProps {
  currentTrack?: CurrentTrack; // Undefined if no track is playing/loaded
  onPlayPause?: () => void;
  onNextTrack?: () => void;
  onPreviousTrack?: () => void;
  onSeek?: (value: number) => void; // Seek position in seconds
  onVolumeChange?: (value: number) => void;
  onToggleShuffle?: () => void;
  onToggleRepeat?: () => void;
  onToggleLike?: () => void;
  onToggleQueue?: () => void;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  currentTrack,
  onPlayPause,
  onNextTrack,
  onPreviousTrack,
  onSeek,
  onVolumeChange,
  // Add handlers for onToggleShuffle, onToggleRepeat, onToggleLike, onToggleQueue
}) => {
  console.log("Rendering MusicPlayerBar, current track:", currentTrack?.title);

  // Internal state for demo purposes, would be driven by props in a real app
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Current playback time in seconds
  const [volume, setVolume] = useState(0.75); // Volume 0 to 1
  const [isMuted, setIsMuted] = useState(false);

  // Mock playback progress for demo
  const intervalRef = useRef<number | null>(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onPlayPause?.();
    if (!isPlaying && currentTrack) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev < currentTrack.durationSeconds) return prev + 1;
          clearInterval(intervalRef.current!);
          setIsPlaying(false);
          return currentTrack.durationSeconds;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    onSeek?.(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    onVolumeChange?.(newVolume);
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    setVolume(newMutedState ? 0 : 0.75); // Restore volume or set to default if unmuting
    onVolumeChange?.(newMutedState ? 0 : 0.75);
  };


  if (!currentTrack) {
    // Render a minimal bar or nothing if no track is loaded
    return (
        <footer className="fixed bottom-0 left-0 right-0 h-20 bg-neutral-800 border-t border-neutral-700 text-neutral-300 flex items-center justify-center px-4">
            <p>No music playing.</p>
        </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 bg-neutral-900 border-t border-neutral-700 text-neutral-300 flex items-center justify-between px-4 md:px-6 py-2 z-50">
      {/* Left: Track Info */}
      <div className="flex items-center space-x-3 w-1/4 md:w-1/3 min-w-0">
        <Avatar className="h-12 w-12 rounded">
          <AvatarImage src={currentTrack.imageUrl} alt={currentTrack.title} />
          <AvatarFallback>{currentTrack.title.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="text-sm font-medium truncate text-white">{currentTrack.title}</p>
          <p className="text-xs text-neutral-400 truncate">{currentTrack.artist}</p>
        </div>
        <Button variant="ghost" size="icon" className="ml-2 text-neutral-400 hover:text-white">
          <Heart className="w-4 h-4" />
        </Button>
      </div>

      {/* Center: Player Controls & Seek Bar */}
      <div className="flex flex-col items-center justify-center w-1/2 md:w-2/5">
        <div className="flex items-center space-x-2 md:space-x-3 mb-1">
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <Shuffle className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPreviousTrack} className="text-neutral-400 hover:text-white">
            <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white text-neutral-900 hover:bg-neutral-200 rounded-full w-8 h-8 md:w-9 md:h-9"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Play className="w-4 h-4 md:w-5 md:h-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNextTrack} className="text-neutral-400 hover:text-white">
            <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
            <Repeat className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
        <div className="flex items-center w-full space-x-2">
            <span className="text-xs w-8 text-right">{formatTime(currentTime)}</span>
            <Slider
                defaultValue={[0]}
                value={[currentTime]}
                max={currentTrack.durationSeconds}
                step={1}
                onValueChange={handleSeek}
                className="w-full [&>span:first-child]:h-1 [&>span>span]:bg-white [&>span>span]:h-1 [&>span>span]:w-1"
                aria-label="Music progress"
            />
            <span className="text-xs w-8 text-left">{formatTime(currentTrack.durationSeconds)}</span>
        </div>
      </div>

      {/* Right: Volume & Queue */}
      <div className="flex items-center justify-end space-x-2 w-1/4 md:w-1/3">
        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
          <ListMusic className="w-5 h-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-neutral-400 hover:text-white">
          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
        <Slider
          defaultValue={[0.75]}
          value={[volume]}
          max={1}
          step={0.01}
          className="w-20 md:w-24 [&>span:first-child]:h-1 [&>span>span]:bg-white [&>span>span]:h-1 [&>span>span]:w-1"
          onValueChange={handleVolumeChange}
          aria-label="Volume control"
        />
      </div>
    </footer>
  );
}
export default MusicPlayerBar;