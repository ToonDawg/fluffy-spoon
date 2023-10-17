import { useEffect, useState } from "react";

export const TrafficLight = () => {
  const [lightColour, setLightColour] = useState<"red" | "green" | "orange">(
    "red"
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      switch (lightColour) {
        case "red":
          setLightColour("green");
          break;
        case 'green':
          setLightColour('orange')
          break;
        case 'orange':
          setLightColour('red');
          break;
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [lightColour]);

  return (
    <>
      <h2>Traffic Light</h2>
      <div className="traffic-light">
        <div className={`light ${lightColour === "red" ? "red" : ""}`} />
        <div className={`light ${lightColour === "orange" ? "orange" : ""}`} />
        <div className={`light ${lightColour === "green" ? "green" : ""}`} />
      </div>
    </>
  );
};
