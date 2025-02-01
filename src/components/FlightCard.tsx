import { Itinerary } from "../types";
import { formatDuration, formatTimeAMPM } from "../utils/utils";

type FlightCardProps = {
  itinerary: Itinerary;
};

export const FlightCard = ({ itinerary }: FlightCardProps) => {
  const startTime = formatTimeAMPM(itinerary.legs[0].segments[0].departure);
  const endTime = formatTimeAMPM(itinerary.legs[0].segments[0].arrival);
  const carrier = itinerary.legs[0].carriers.marketing[0].name;
  const durationFormatted = formatDuration(itinerary.legs[0].durationInMinutes);
  const originDisplayCode = itinerary.legs[0].origin.displayCode;
  const destinationDisplayCode = itinerary.legs[0].destination.displayCode;
  const priceFormatted = itinerary.price.formatted;

  return (
    <div className="flight-card bg-white border border-gray-200 rounded-lg shadow-lg">
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-1 space-y-2">
            <div className="flex items-center justify-between space-x-12">
              <div className="flex flex-col flex-1">
                <p className="font-semibold w-max">
                  {startTime}-{endTime}
                </p>
                <p className="text-sm text-muted-foreground">{carrier}</p>
              </div>

              <div className="text-center hidden md:block">
                <div className="w-24 h-px bg-border my-2 relative">
                  <div className="absolute -right-1 top-1/2 w-2 h-2 rounded-full bg-primary -translate-y-1/2" />
                </div>
              </div>

              <div className="flex flex-col flex-1">
                <p className="font-semibold w-max">{durationFormatted}</p>
                <p className="text-muted-foreground">
                  {originDisplayCode}-{destinationDisplayCode}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold">{priceFormatted}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
