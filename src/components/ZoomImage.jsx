import React, { useState } from "react";

const ZoomImage = ({ src, alt }) => {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x, y });
  };

  return (
    <div
      className="relative w-full h-48 overflow-hidden cursor-zoom-in"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
    >
      {/* รูปปกติ */}
      <img
        src={src}
        alt={alt}
        className={`rounded-md w-full h-full object-cover transition-transform duration-200 ${
          isZoomed ? "scale-110" : "scale-100"
        }`}
      />
      {/* ซูม */}
      {isZoomed && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat rounded-md border border-gray-300"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
            transform: "scale(1.5)",
            zIndex: 10,
          }}
        ></div>
      )}
    </div>
  );
};

export default ZoomImage;
