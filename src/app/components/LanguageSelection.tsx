"use client";

import useSWR from "swr";
import Select from "react-select";

const fetchLanguages = () => fetch("/api/getLanguages").then((res) => res.json());

function LanguageSelection() {
  const { data: languages, isLoading } = useSWR("languages", fetchLanguages);
  const { data: language, mutate: setLanguage } = useSWR("language", {
    fallbackData: "english",
  });
  return (
    <div className="mt-2">
      <Select
        className="mt-2"
        defaultValue={language}
        placeholder={language}
        isSearchable
        isLoading={isLoading}
        menuPosition="fixed"
        classNames={{
          control: (state) => "bg-[#434654] border-[#434654]",
        }}
        onChange={(e) => setLanguage(e.value)}
        options={languages?.languageOptions}
      />
    </div>
  );
}

export default LanguageSelection;
