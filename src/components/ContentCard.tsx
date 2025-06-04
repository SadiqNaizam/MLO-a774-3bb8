import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { PlayCircle } from 'lucide-react';

interface ContentCardProps {
  id: string | number;
  imageUrl?: string;
  title: string;
  subtitle?: string; // e.g., Artist name, Playlist type
  type: 'album' | 'playlist' | 'artist'; // To differentiate styling or actions
  onPlay?: (id: string | number) => void;
  onClick?: (id: string | number) => void; // For navigation
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  imageUrl,
  title,
  subtitle,
  type,
  onPlay,
  onClick,
}) => {
  console.log(`Rendering ContentCard: ${title} (Type: ${type})`);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click if play button is clicked
    onPlay?.(id);
    console.log(`Play clicked for ${type} ID: ${id}`);
  };

  const handleCardClick = () => {
    onClick?.(id);
    console.log(`Card clicked for ${type} ID: ${id}`);
  };

  return (
    <Card
      className="w-full overflow-hidden transition-all hover:shadow-lg cursor-pointer group"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1} className="bg-muted">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlay && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handlePlayClick}
            aria-label={`Play ${title}`}
          >
            <PlayCircle className="w-6 h-6" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-3">
        <CardTitle className="text-base font-semibold truncate" title={title}>{title}</CardTitle>
        {subtitle && <CardDescription className="text-xs truncate" title={subtitle}>{subtitle}</CardDescription>}
      </CardContent>
    </Card>
  );
}
export default ContentCard;