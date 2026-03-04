"use client";

import ImageTrail from "@/components/ImageTrail";

export default function ImageHover() {

  const key = 7; // example (remove if not needed)

  return (
    <div style={{ height: "clamp(300px, 60vw, 600px)", position: "relative", overflow: "hidden", backgroundColor: "transparent" }}>
      <ImageTrail
        key={key}
        items={[
          "https://picsum.photos/id/287/300/300",        
          "https://picsum.photos/id/1001/300/300",
          "https://picsum.photos/id/1025/300/300",
          "https://picsum.photos/id/1026/300/300",
          "https://picsum.photos/id/1027/300/300",
          "https://picsum.photos/id/1028/300/300",
          "https://picsum.photos/id/1029/300/300",
          "https://picsum.photos/id/1030/300/300",
        ]}
        variant={1}
      />
    </div>
  );
}
