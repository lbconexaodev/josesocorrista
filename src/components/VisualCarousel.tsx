import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { images } from "../data/images";

const slides = [
  { image: images.volunteer, label: "Liderança", title: "Mobilização que transforma" },
  {
    image: images.portrait,
    label: "Compromisso",
    title: "Experiência de quem vive a realidade",
    imageClass: "object-[64%_24%]",
  },
  { image: images.meeting, label: "Equipe", title: "Força coletiva por você" },
  { image: images.planning, label: "Gestão", title: "Planejamento com presença" },
];

export function VisualCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative group px-0 md:px-4">
      <div className="overflow-hidden rounded-3xl border border-hairline shadow-2xl" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-[42vh] md:h-[60vh]" key={slide.title}>
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover ${slide.imageClass ?? "object-center"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-8 left-6 right-6 md:bottom-12 md:left-12 md:right-12">
                <p className="label text-white mb-3 uppercase font-black hero-readable">
                  {slide.label}
                </p>
                <h3 className="display-copy hero-readable text-white text-3xl md:text-7xl leading-none">
                  {slide.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-4 rounded-full text-white hover:bg-primary hover:text-on-primary transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        aria-label="Slide anterior"
        type="button"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md p-4 rounded-full text-white hover:bg-primary hover:text-on-primary transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        aria-label="Próximo slide"
        type="button"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
