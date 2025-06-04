import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Play, Pause, MoreHorizontal, Heart } from 'lucide-react'; // Example icons

interface SongListItemProps {
  id: string | number;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  imageUrl?: string;
  isPlaying?: boolean;
  isLiked?: boolean;
  onPlayPause: (id: string | number) => void;
  onLikeToggle?: (id: string | number) => void;
  onOptionsClick?: (id: string | number, event: React.MouseEvent) => void;
}

const SongListItem: React.FC<SongListItemProps> = ({
  id,
  title,
  artist,
  album,
  duration,
  imageUrl,
  isPlaying = false,
  isLiked = false,
  onPlayPause,
  onLikeToggle,
  onOptionsClick,
}) => {
  console.log(`Rendering SongListItem: ${title} - ${artist}, isPlaying: ${isPlaying}`);

  return (
    <div
      className={`flex items-center p-2 space-x-3 rounded-md hover:bg-neutral-100 group ${
        isPlaying ? 'bg-green-100 hover:bg-green-200' : ''
      }`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="w-8 h-8"
        onClick={() => onPlayPause(id)}
        aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
      >
        {isPlaying ? <Pause className="h-5 w-5 text-green-600" /> : <Play className="h-5 w-5 group-hover:text-neutral-800" />}
      </Button>

      {imageUrl && (
        <Avatar className="h-10 w-10 rounded">
          <AvatarImage src={imageUrl} alt={album || title} />
          <AvatarFallback>{title.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      <div className="flex-1 min-w-0">
        <p className={`font-medium truncate ${isPlaying ? 'text-green-700' : 'text-neutral-800'}`}>{title}</p>
        <p className="text-xs text-neutral-500 truncate">{artist}</p>
      </div>

      {album && <p className="hidden md:block text-sm text-neutral-600 truncate w-1/4">{album}</p>}
      
      {onLikeToggle && (
        <Button
            variant="ghost"
            size="icon"
            className="hidden group-hover:flex w-8 h-8"
            onClick={() => onLikeToggle(id)}
            aria-label={isLiked ? `Unlike ${title}` : `Like ${title}`}
        >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-neutral-500 hover:text-red-500'}`} />
        </Button>
      )}

      <p className="text-sm text-neutral-600 w-12 text-right">{duration}</p>

      {onOptionsClick && (
        <Button
            variant="ghost"
            size="icon"
            className="hidden group-hover:flex w-8 h-8"
            onClick={(e) => onOptionsClick(id, e)}
            aria-label={`More options for ${title}`}
        >
            <MoreHorizontal className="h-5 w-5 text-neutral-500 hover:text-neutral-800" />
        </Button>
      )}
    </div>
  );
}
export default SongListItem;