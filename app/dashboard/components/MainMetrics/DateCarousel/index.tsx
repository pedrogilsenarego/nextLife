import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div style={{ textAlign: "center" }}>
                    <span
                      style={{ fontSize: "2rem", fontWeight: "bold" }}
                      className="mb-2"
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
                  </div>
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
