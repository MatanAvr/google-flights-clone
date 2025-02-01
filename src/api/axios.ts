import axios, { AxiosInstance, AxiosResponse } from "axios";

const BASE_URL = "https://sky-scrapper.p.rapidapi.com/api";
const SEARCH_AIRPORTS_ENDPOINT = "/v1/flights/searchAirport";
const SEARCH_FLIGHTS_ENDPOINT = "/v2/flights/searchFlights";
const HEADERS = {
  "x-rapidapi-key": "e0bcf90e38mshc44098db2209ad8p19e306jsne039995c92fd",
  "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
};

// ---------------------------------------------------------------------------------------------

export class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  async searchAirports(query: string): Promise<any> {
    const options = {
      params: {
        query,
        locale: "en-US",
      },
      headers: HEADERS,
    };
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.get(
        SEARCH_AIRPORTS_ENDPOINT,
        options
      );

      return response.data.data;
    } catch (error) {
      console.error(`searchAirports, error:${error}`);
      return undefined;
    }
  }

  async searchFlights({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
    returnDate,
    cabinClass,
    adults,
  }: any): Promise<any> {
    const options = {
      params: {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        returnDate,
        cabinClass,
        adults,
      },
      headers: HEADERS,
    };
    try {
      const response: AxiosResponse<any> = await this.axiosInstance.get(
        SEARCH_FLIGHTS_ENDPOINT,
        options
      );
      return response.data.data.itineraries;
    } catch (error) {
      console.error(`searchFlights, error:${error}`);
      return undefined;
    }
  }
}
