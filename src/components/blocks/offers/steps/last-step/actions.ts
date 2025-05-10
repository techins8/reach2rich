"use server";

import { z } from "zod";
import { merge } from "@/lib/objects/merge";

import { Offer, OfferError } from "@/types/offer";
import { updateOffer } from "@/services/supabase/offers/offerRepository";

const lastStepSchema = z.object({
  fillTheForm: z.string().min(50, {
    message: "Le champ doit contenir au moins 50 caractères.",
  }),
});

export type LastStepResponse = OfferError<{
  fillTheForm?: string[];
}>;

export async function saveOffer(
  offer: Offer,
  formData: FormData
): Promise<LastStepResponse> {
  if (!offer) {
    return {
      error: "Aucune offre n'a été trouvée",
    };
  }

  const fillTheForm = formData.get("fillTheForm") as string;

  if (!fillTheForm) {
    return {
      inputErrors: {
        fillTheForm: ["Le champ est requis"],
      },
    };
  }

  const validationResult = lastStepSchema.safeParse({ fillTheForm });

  if (!validationResult.success) {
    return {
      inputErrors: validationResult.error.flatten().fieldErrors,
    };
  }

  const inputs = merge([offer, { offerJson: { generated: { fillTheForm } } }]);

  try {
    const updatedOffer = await updateOffer(inputs);

    if (!updatedOffer) {
      return {
        error: "Erreur lors de la mise à jour de l'offre",
      };
    }

    return {
      error: undefined,
      inputErrors: undefined,
      updatedOffer,
    };
  } catch (error) {
    console.error("Error saving offer:", error);
    return {
      error: "Une erreur inconnue est survenue, veuillez réessayer plus tard.",
    };
  }
}
