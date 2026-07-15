"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface WizardData {
  // STEP 1: Year & Place
  year: number;
  era: string;
  prefecture: string;
  city: string;

  // STEP 2: Characters
  mainCharacter: {
    name: string;
    birthDate: string;
    gender: "male" | "female" | "other";
  };
  lover: {
    name: string;
    type?: "恋人" | "片思い" | "初恋";
  };
  admiration?: {
    name: string;
    type?: "憧れの人" | "好きなタレント" | "スポーツ選手";
  };
  friend: {
    name: string;
    character: string;
  };

  // STEP 3: Setting
  locations: string[];
  media: string[];
  season: string;
  event: string;
  freeKeywords: string;
  japaneseMovie: string;

  // STEP 4: Story & Style
  storyTheme: string;
  writingStyle: string;
  authorName: string;
}

const defaultData: WizardData = {
  year: new Date().getFullYear(),
  era: "",
  prefecture: "",
  city: "",
  mainCharacter: { name: "", birthDate: "", gender: "other" },
  lover: { name: "", type: "恋人" },
  admiration: { name: "", type: "憧れの人" },
  friend: { name: "", character: "" },
  locations: [],
  media: [],
  season: "",
  event: "",
  freeKeywords: "",
  japaneseMovie: "",
  storyTheme: "",
  writingStyle: "",
  authorName: "",
};

interface WizardContextType {
  data: WizardData;
  setData: (data: WizardData) => void;
  updateData: (partial: Partial<WizardData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export function WizardProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<WizardData>(defaultData);
  const [currentStep, setCurrentStep] = useState(1);

  const updateData = (partial: Partial<WizardData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  };

  return (
    <WizardContext.Provider value={{ data, setData, updateData, currentStep, setCurrentStep }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within WizardProvider");
  }
  return context;
}
