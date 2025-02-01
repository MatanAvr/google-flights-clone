type TopImageProps = {};

export const TopImage = ({}: TopImageProps) => {
  return (
    <div
      className="flex h-[140px] md:h-[300px] w-full relative
      justify-end items-end"
      style={{
        backgroundImage:
          "url(https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1 className="w-full text-4xl md:text-6xl mx-auto text-center pb-5 md:pb-10">
        Flights
      </h1>
    </div>
  );
};
