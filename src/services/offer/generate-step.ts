"use server";

import { z } from "zod";
import { merge } from "@/lib/objects/merge";
import { Offer } from "@/types/offer";
import { StepResponse } from "./types";
import { getStepConfigs } from "./step-configs";
import { openai } from "@/services/openai/openai";
import { updateOffer } from "@/services/supabase/offers/offerRepository";

export const validateAndGenerate = async (
  step: number,
  offer: Offer,
  formData: FormData
): Promise<StepResponse> => {
  const steps = getStepConfigs(offer);
  const currentStep = steps[step];

  if (!currentStep) {
    return { error: "Invalid step" };
  }

  const fieldValue = formData.get(currentStep.key as string)?.toString() ?? "";

  const validationResult = currentStep.schema
    ? currentStep.schema.safeParse({
        [currentStep.key as string]: fieldValue,
      })
    : { success: true };

  if (!validationResult.success) {
    return {
      inputValues: { [currentStep.key as string]: fieldValue },
      inputErrors: (validationResult as z.SafeParseError<any>).error.flatten()
        .fieldErrors as Record<string, string[]>,
    };
  }

  return generate(step, offer);
};

export const generate = async (
  step: number,
  offer: Offer
): Promise<StepResponse> => {
  const steps = getStepConfigs(offer);
  const nextStep = steps[step + 1];

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
