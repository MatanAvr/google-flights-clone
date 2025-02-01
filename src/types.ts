export type SearchDataKeys =
  | "type"
  | "returnDate"
  | "originSkyId"
  | "destinationSkyId"
  | "originEntityId"
  | "destinationEntityId"
  | "date"
  | "cabinClass"
  | "adults";

export type FlightType = "One-way" | "Round trip";
export type SearchData = {
  type: FlightType;
  returnDate: string;
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  cabinClass: CabinClass;
  adults: string;
};

export type CabinClass = "economy" | "premium_economy" | "business" | "first";

export type AirportSuggestion = {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
};

export type Itinerary = {
  id: string;
  price: {
    raw: number;
    formatted: string;
    pricingOptionId: string;
  };
  legs: {
    id: string;
    origin: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
      isHighlighted: boolean;
    };
    destination: {
      id: string;
      entityId: string;
      name: string;
      displayCode: string;
      city: string;
      country: string;
      isHighlighted: boolean;
    };
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
      marketing: {
        id: number;
        alternateId: string;
        logoUrl: string;
        name: string;
      }[];
      operationType: string;
    };
    segments: {
      id: string;
      origin: {
        flightPlaceId: string;
        displayCode: string;
        parent: {
          flightPlaceId: string;
          displayCode: string;
          name: string;
          type: string;
        };
        name: string;
        type: string;
        country: string;
      };
      destination: {
        flightPlaceId: string;
        displayCode: string;
        parent: {
          flightPlaceId: string;
          displayCode: string;
          name: string;
          type: string;
        };
        name: string;
        type: string;
        country: string;
      };
      departure: string;
      arrival: string;
      durationInMinutes: number;
      flightNumber: string;
      marketingCarrier: {
        id: number;
        name: string;
        alternateId: string;
        allianceId: number;
        displayCode: string;
      };
      operatingCarrier: {
        id: number;
        name: string;
        alternateId: string;
        allianceId: number;
        displayCode: string;
      };
    }[];
  }[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  fareAttributes: {};
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
};
