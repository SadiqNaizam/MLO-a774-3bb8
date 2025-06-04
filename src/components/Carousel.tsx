import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface CarouselSlide {
  id: string | number;
  imageUrl?: string;
  title: string;
  subtitle?: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 4000 })]);

  console.log("Rendering Carousel with slides:", slides.length);

  if (!slides || slides.length === 0) {
    return <p>No slides to display.</p>;
  }

  return (
    <div className="embla overflow-hidden rounded-lg" ref={emblaRef}>
      <div className="embla__container flex">
        {slides.map((slide) => (
          <div className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.33%] min-w-0 p-2" key={slide.id}>
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 flex flex-col h-full">
                <AspectRatio ratio={16 / 9} className="bg-muted">
                  <img
                    src={slide.imageUrl || '/placeholder.svg'}
                    alt={slide.title}
                    className="object-cover w-full h-full"
                    onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
                  />
                </AspectRatio>
                <div className="p-4 flex-grow">
                  <h3 className="text-lg font-semibold">{slide.title}</h3>
                  {slide.subtitle && <p className="text-sm text-muted-foreground">{slide.subtitle}</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      {/* Add Prev/Next buttons or Dots if desired */}
    </div>
  );
}
export default Carousel;