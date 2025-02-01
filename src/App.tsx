import { TopImage } from "./components/TopImage";
import { FlightResults } from "./components/FlightResults";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { useAppSelector } from "./hooks/useStoreHooks";
import { SearchForm } from "./components/SearchForm";
import { ToastContainer } from "react-toastify";

function App() {
  const flightsData = useAppSelector((s) => s.data.flightsData);
  const isLoadingFlights = useAppSelector((s) => s.data.isLoadingFlights);

  return (
    <main className="w-screen h-screen flex flex-col container mx-auto items-center justify-start">
      <TopImage />
      <SearchForm />

      {isLoadingFlights && (
        <div className="w-[95%] pt-20 md:w-4/5 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}

      {flightsData && !isLoadingFlights && (
        <div className="max-h-[50%] w-[95%] md:w-4/5">
          <FlightResults itineraries={flightsData} />
        </div>
      )}
      <ToastContainer position="bottom-center" />
    </main>
  );
}

export default App;
