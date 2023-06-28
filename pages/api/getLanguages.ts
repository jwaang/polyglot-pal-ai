import type { NextApiRequest, NextApiResponse } from "next";
import { capitalize } from "lodash";

type Option = {
  value: string;
  label: string;
};

type Data = {
  languageOptions: Option[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const languages = [
    { id: "english" },
    { id: "mandarin" },
    { id: "hindi" },
    { id: "spanish" },
    { id: "french" },
    { id: "bengali" },
    { id: "russian" },
    { id: "portuguese" },
    { id: "urdu" },
    { id: "indonesian" },
    { id: "german" },
    { id: "japanese" },
  ];
  const languageOptions = languages.map((language) => ({
    value: language.id,
    label: capitalize(language.id),
  }));
  res.status(200).json({
    languageOptions,
  });
}
