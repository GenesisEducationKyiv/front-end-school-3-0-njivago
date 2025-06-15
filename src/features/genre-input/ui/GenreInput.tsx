import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Controller } from "react-hook-form";
import { genresApi } from "shared/lib/api/main";
import { useTranslation } from "react-i18next";
import { cn } from "shared/lib/utils";
import type { GenreInputProps } from "../lib/genreInput.types";
import { isStringArray } from "shared/lib/utils";

const Tag = ({
  tag,
  index,
  onRemove,
}: {
  tag: string;
  index: number;
  onRemove: (index: number) => void;
}) => (
  <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
    <span>{tag}</span>
    <button
      type="button"
      className="ml-1 text-blue-600 hover:text-blue-800"
      onClick={(e) => {
        e.stopPropagation();
        onRemove(index);
      }}
    >
      <svg
        className="w-3 h-3"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
);

const SuggestionItem = ({
  suggestion,
  isActive,
  isSelected,
  onClick,
  onMouseEnter,
}: {
  suggestion: string;
  isActive: boolean;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  index: number;
}) => (
  <div
    className={cn(
      "px-4 py-2 cursor-pointer hover:bg-blue-50",
      isActive && "bg-blue-100",
      isSelected && "text-blue-700 font-medium"
    )}
    onClick={onClick}
    onMouseEnter={onMouseEnter}
  >
    {suggestion}
  </div>
);

export const GenreInput = <TFieldValues extends Record<string, unknown>>({
  name,
  control,
  label,
  placeholder,
  required,
}: GenreInputProps<TFieldValues>) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const { data: genresResponse } = genresApi.useGetGenresQuery();

  const genres = useMemo(() => genresResponse?.data || [], [genresResponse]);

  const filterSuggestions = useCallback(
    (input: string, genresList: string[]) => {
      if (!input.trim() || !genresList.length) return [];
      return genresList.filter((genre) =>
        genre.toLowerCase().includes(input.toLowerCase())
      );
    },
    []
  );

  useEffect(() => {
    const filtered = filterSuggestions(inputValue, genres);
    setSuggestions(filtered);
    setActiveIndex(-1);
  }, [inputValue, genres, filterSuggestions]);

  const handleSelectSuggestion = (
    suggestion: string,
    currentTags: string[],
    onChange: (value: string[]) => void
  ) => {
    if (!currentTags.includes(suggestion)) {
      onChange([...currentTags, suggestion]);
    }
    setInputValue("");
    setShowSuggestions(false);
    setError(null);
    inputRef.current?.focus();
  };

  const handleRemoveTag = (
    index: number,
    currentTags: string[],
    onChange: (value: string[]) => void
  ) => {
    onChange(currentTags.filter((_, i) => i !== index));
  };

  const validateInput = (
    input: string,
    genresList: string[],
    currentTags: string[],
    onChange: (value: string[]) => void
  ) => {
    if (!input.trim()) return;

    const exactGenre = genresList.find(
      (g) => g.toLowerCase() === input.toLowerCase()
    );

    if (exactGenre) {
      if (!currentTags.includes(exactGenre)) {
        onChange([...currentTags, exactGenre]);
      }
    } else {
      setError(t("genreInput.invalidGenre"));
    }

    setInputValue("");
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const value: string[] = isStringArray(field.value) ? field.value : [];

        const removeTagHandler = (index: number) => {
          handleRemoveTag(index, value, field.onChange);
        };

        return (
          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              {label || t("genreInput.label")}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <div
              className={cn(
                "flex flex-wrap items-center gap-2 p-2 border rounded-md min-h-[42px]",
                "border-gray-300 bg-white focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500",
                (fieldState.error || error) &&
                  "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
              )}
              onClick={() => inputRef.current?.focus()}
            >
              {value.map((tag: string, index: number) => (
                <Tag
                  key={tag + index}
                  tag={tag}
                  index={index}
                  onRemove={removeTagHandler}
                />
              ))}

              <input
                data-testid="genre-input"
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setError(null);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => {
                  setTimeout(() => {
                    if (document.activeElement !== inputRef.current) {
                      setShowSuggestions(false);
                      validateInput(inputValue, genres, value, field.onChange);
                    }
                  }, 150);
                }}
                placeholder={
                  value.length === 0
                    ? placeholder || t("genreInput.placeholder")
                    : ""
                }
                className="flex-1 min-w-[120px] outline-none text-sm bg-transparent"
              />
            </div>

            {(fieldState.error || error) && (
              <p className="mt-1 text-sm text-red-600">
                {error || fieldState.error?.message}
              </p>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-10 w-full max-w-[calc(100%-2rem)] mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
              >
                {suggestions.map((suggestion, index) => (
                  <SuggestionItem
                    key={suggestion}
                    suggestion={suggestion}
                    isActive={activeIndex === index}
                    isSelected={value.includes(suggestion)}
                    onClick={() =>
                      handleSelectSuggestion(suggestion, value, field.onChange)
                    }
                    onMouseEnter={() => setActiveIndex(index)}
                    index={index}
                  />
                ))}
              </div>
            )}

            {showSuggestions && inputValue && suggestions.length === 0 && (
              <div className="absolute z-10 w-full max-w-[calc(100%-2rem)] mt-1 bg-white border border-gray-200 rounded-md shadow-lg py-2 px-4 text-gray-500 italic">
                {t("genreInput.noResults")}
              </div>
            )}
          </div>
        );
      }}
    />
  );
};
