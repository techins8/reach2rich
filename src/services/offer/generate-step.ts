"use server";

import { merge } from "@/lib/objects/merge";
import { Offer } from "@/types/offer";
import { StepResponse } from "./types";
import { getStepConfigs } from "./step-configs";
import { openai } from "@/services/openai/openai";
import { updateOffer } from "@/services/supabase/offers/offerRepository";

export const generate = async (
  step: number,
  offer: Offer
): Promise<StepResponse> => {
  const steps = getStepConfigs(offer);

  const nextStep = steps[step + 1];

  if (!nextStep) {
    return { error: "Invalid step" };
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: nextStep.prompt ?? "" }],
      model: "gpt-4.1",
    });

    const openAiResponse = completion.choices[0].message.content;

    if (!openAiResponse) {
      return { error: "Aucun résultat de la part de OpenAI" };
    }

    const inputs = merge([
      offer,
      {
        offerJson: {
          generated: { [nextStep.key as string]: openAiResponse },
        },
      },
    ]);

    const updatedOffer = await updateOffer(inputs);

    if (!updatedOffer) {
      return { error: "Erreur lors de la mise à jour de l'offre" };
    }

    return {
      error: undefined,
      inputErrors: undefined,
      updatedOffer,
    };
  } catch {
    return {
      error: "Une erreur inconnue est survenue, veuillez réessayer plus tard.",
    };
  }
};
