import { Offer, OfferError } from "@/types/offer";
import { z } from "zod";

export type StepConfig = {
  name: string;
  isGenerated?: () => boolean;
  key?: keyof Offer["offerJson"]["generated"];
  schema?: z.ZodTypeAny;
  prompt?: string;
  canGoToNext?: (offer: Offer) => boolean;
};

export type StepResponse = OfferError<Record<string, string[]>>;
