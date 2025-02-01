import { IconType } from "react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { AirportSuggestion, SearchDataKeys } from "../types";

type IconInputProps = {
  skyId: SearchDataKeys;
  entityId: SearchDataKeys;
  onChange: (key: SearchDataKeys, value: string) => void;
  Icon: IconType;
  placeholder: string;
  fetchOptions: (query: string) => Promise<AirportSuggestion[]>;
};

export const IconInput = ({
  skyId,
  entityId,
  onChange,
  Icon,
  placeholder,
  fetchOptions,
}: IconInputProps) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AirportSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const debounceTimer = useRef<number | null>(null);

  const fetchSuggestions = useCallback(
    async (searchTerm: string) => {
      try {
        if (!searchTerm.trim()) {
          setSuggestions([]);
          return;
        }
        setIsLoading(true);
        const results = await fetchOptions(searchTerm);
        setSuggestions(results);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [fetchOptions]
  );

  const onChangeQuery = (newQuery: string) => {
    setQuery(newQuery);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(newQuery);
    }, 300);
  };

  const onSelectOption = (option: AirportSuggestion) => {
    onChange(skyId, option.skyId);
    onChange(entityId, option.entityId);
    setQuery(option.skyId);
    setSuggestions([]);
    setIsSelected(true);
    setIsFocused(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      if (!isSelected) {
        setQuery("");
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative flex flex-1" ref={inputRef}>
      <div className="relative flex flex-1">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          {isLoading ? (
            <AiOutlineLoading className="size-5 text-gray-500 animate-spin" />
          ) : (
            <Icon className="size-5 text-gray-500" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => {
            const newValue = e.target.value;
            onChangeQuery(newValue);
          }}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 
          rounded-lg bg-gray-50"
          placeholder={placeholder}
          required
        />
      </div>
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-20 top-14 left-0 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {suggestions.map((option, index) => (
            <li
              key={`option-` + index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelectOption(option)}
            >
              {option.presentation.suggestionTitle}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
