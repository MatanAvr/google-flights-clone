import { IconInput } from "./IconInput";
import { MdLocationSearching } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdOutlineSearch } from "react-icons/md";
import { MdPersonOutline } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { GoArrowSwitch } from "react-icons/go";
import { useState } from "react";
import { ApiClient } from "../api/axios";
import { LoadingSpinner } from "./LoadingSpinner";
import { useAppDispatch } from "../hooks/useStoreHooks";
import { setFlightsData, setIsLoadingFlights } from "../store/data";
import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { SearchData, SearchDataKeys, AirportSuggestion } from "../types";
import { formatDate } from "../utils/utils";
import { validateSearchParams } from "../utils/validator";
import { Select } from "./Select";
import {
  adultsNumberArr,
  cabinClassArr,
  cabinClassDic,
  searchDataInit,
} from "../consts";
import { toast } from "react-toastify";

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export const SearchForm = () => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState<DateValueType>(null);
  const [endDate, setEndDate] = useState<DateValueType>(null);
  const [searchData, setSearchData] = useState<SearchData>(searchDataInit);

  const changeSearchDataHandler = (key: SearchDataKeys, value: string) => {
    setSearchData((prev) => ({ ...prev, [key]: value }));
  };

  const onSearch = async () => {
    const errors = validateSearchParams(searchData);
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill all the relevant fields");
      return;
    }
    dispatch(setIsLoadingFlights({ isLoading: true }));
    const {
      originSkyId,
      destinationSkyId,
      originEntityId,
      destinationEntityId,
      date,
      returnDate,
      adults,
      cabinClass,
    } = searchData;
    try {
      const response = await ApiClient.getInstance().searchFlights({
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        returnDate,
        adults,
        cabinClass,
      });
      dispatch(setFlightsData({ data: response }));
    } catch (error) {
      console.error(error);
    }
    dispatch(setIsLoadingFlights({ isLoading: false }));
  };

  const getSuggestions = async function (
    query: string
  ): Promise<AirportSuggestion[]> {
    const res = await ApiClient.getInstance().searchAirports(query);
    return res;
  };

  return (
    <div className="w-[95%] md:w-4/5 p-4 bg-white border border-gray-200 rounded-lg shadow-lg mb-5">
      <div>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
          <div className="col-span-full">
            <div className="w-fit flex gap-3">
              <Select
                id="type"
                title=""
                value={searchData.type}
                Icon={
                  searchData.type === "One-way"
                    ? IoIosArrowRoundForward
                    : GoArrowSwitch
                }
                options={["One-way", "Round trip"]}
                onChange={(value: string) =>
                  changeSearchDataHandler("type", value)
                }
              />
              <Select
                id="adults"
                title=""
                Icon={MdPersonOutline}
                value={searchData.adults}
                options={adultsNumberArr}
                onChange={(value: string) =>
                  changeSearchDataHandler("adults", value)
                }
              />
              <Select
                id="cabinClass"
                title=""
                value={searchData.cabinClass}
                options={cabinClassArr}
                dic={cabinClassDic}
                onChange={(value: string) =>
                  changeSearchDataHandler("cabinClass", value)
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <IconInput
              skyId="originSkyId"
              entityId="originEntityId"
              onChange={changeSearchDataHandler}
              placeholder="Where from?"
              Icon={MdLocationSearching}
              fetchOptions={getSuggestions}
            />
            <IconInput
              skyId="destinationSkyId"
              entityId="destinationEntityId"
              onChange={changeSearchDataHandler}
              placeholder="Where to?"
              Icon={MdOutlineLocationOn}
              fetchOptions={getSuggestions}
            />
          </div>
          <div className="flex gap-2">
            <Datepicker
              value={startDate}
              onChange={(newDate) => {
                if (!newDate) return;
                if (!newDate.startDate) return;
                changeSearchDataHandler("date", formatDate(newDate.startDate));
                setStartDate(newDate);
              }}
              useRange={false}
              asSingle={true}
              inputClassName="w-full p-4 ps-14 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Departure"
              disabledDates={[
                {
                  startDate: new Date("1900-01-01"),
                  endDate: yesterday,
                },
              ]}
              toggleClassName="absolute rounded-l-lg left-0 h-full px-3 text-gray-500"
            />

            {searchData.type === "Round trip" && (
              <Datepicker
                value={endDate}
                onChange={(newDate) => {
                  if (!newDate) return;
                  if (!newDate.startDate) return;
                  changeSearchDataHandler(
                    "returnDate",
                    formatDate(newDate.startDate)
                  );
                  setEndDate(newDate);
                }}
                useRange={false}
                asSingle={true}
                inputClassName="w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Return"
                disabledDates={[
                  {
                    startDate: new Date("1900-01-01"),
                    endDate: yesterday,
                  },
                ]}
                toggleClassName="absolute rounded-l-lg left-0 h-full px-3 text-gray-500"
              />
            )}
          </div>
        </form>
        <div className="h-[40px] relative flex flex-1items-center justify-center">
          <button
            type="button"
            className="absolute flex gap-2 items-center bottom-[-100%]  w-fit text-white bg-[#4285f4] hover:bg-[#174ea6]
          font-bold rounded-full px-5 py-2.5 text-center"
            onClick={onSearch}
          >
            {false ? (
              <LoadingSpinner />
            ) : (
              <>
                <MdOutlineSearch className="size-5" />
                Explore
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
