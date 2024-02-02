import * as React from "react";

import { Card, CardContent } from "../card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../carousel";

export function CarouselCard() {
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
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card style={{ borderRadius: "4px", cursor: "grab" }}>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span
                    style={{ fontSize: "200px", opacity: 0.2 }}
                    className="text-4xl font-semibold"
                  >
                    {index + 1}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
