import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { H1 } from "@/components/ui/h1";

const DateCarousel = () => {
  const schedule = [
    {
      date: new Date(),
    },
    {
      date: new Date(),
    },
    {
      date: new Date(),
    },
    {
      date: new Date(),
    },
    {
      date: new Date(),
    },
  ];

  return (
    <Carousel
      style={{
        width: "500px",
        boxShadow: "0 0 20px 2px rgba(0, 0, 0, 0.15)",
        borderRadius: "6px",
        padding: "8px",
      }}
    >
      <CarouselContent>
        {schedule.map((day, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card style={{ borderRadius: "4px", cursor: "grab" }}>
                <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                  <span
                    style={{ fontSize: "200px", opacity: 0.2 }}
                    className="text-4xl font-semibold"
                  >
                    {day.date.getDate() + index}
                  </span>
                  <span className="text-sm">
                    {day.date.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default DateCarousel;
