"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Offer } from "@/types/offer";
import { useParams } from "next/navigation";
import { fetchOfferData } from "@/services/supabase/offers/offerRepository";

interface FormContextType {
  offer: Offer | null;
  step: number;
  isFetching: boolean;
  isRegenerating: boolean;
  isGenerating: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setOffer: React.Dispatch<React.SetStateAction<Offer | null>>;
  setIsRegenerating: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchOffer = async () => {
      setIsFetching(true);

      const offer = await fetchOfferData(id as string);

      setOffer(offer);
      setIsFetching(false);
    };

    if (id) {
      fetchOffer();
    }
  }, [id]);

  return (
    <FormContext.Provider
      value={{
        offer,
        step,
        isFetching,
        isRegenerating,
        isGenerating,
        setStep,
        setOffer,
        setIsRegenerating,
        setIsGenerating,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);

  if (context === undefined) {
    throw new Error("useForm must be used within a FormProvider");
  }

  return context;
}
