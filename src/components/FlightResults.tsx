import { Itinerary } from "../types";
import { FlightCard } from "./FlightCard";

type FlightResultsProps = { itineraries: Itinerary[] };

export const FlightResults = ({ itineraries }: FlightResultsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Available Flights</h2>
        <p className="text-sm text-muted-foreground">
          {itineraries.length} flights found
        </p>
      </div>
      <div className="space-y-4">
        {itineraries.map((itinerary) => (
          <FlightCard key={itinerary.id} itinerary={itinerary} />
        ))}
      </div>
    </div>
  );
};
