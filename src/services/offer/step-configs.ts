import { Offer } from "@/types/offer";
import { StepConfig } from "./types";
import { z } from "zod";
import { getPrompts } from "./get-prompts";

export const getStepConfigs = (offer?: Offer | null): StepConfig[] => {
  return [
    {
      name: "Vos informations",
    },
    {
      key: "steps",
      name: "Le déroulé de l'offre",
      isGenerated: () => !!offer?.offerJson?.generated?.steps,
      schema: z.object({
        steps: z
          .string()
          .min(
            50,
            "Le résultat de l'étape 1 doit contenir au moins 50 caractères."
          ),
      }),
      prompt: offer ? getPrompts(offer)["steps"] : undefined,
    },
    {
      key: "whoAmI",
      name: "Qui suis-je ?",
      isGenerated: () => !!offer?.offerJson?.generated?.whoAmI,
      schema: z.object({
        whoAmI: z
          .string()
          .min(200, "Le champ 'whoAmI' doit contenir au moins 200 caractères."),
      }),
      prompt: offer ? getPrompts(offer)["whoAmI"] : undefined,
    },
    {
      key: "included",
      name: "Ce qui est inclus",
      isGenerated: () => !!offer?.offerJson?.generated?.included,
      schema: z.object({
        included: z
          .string()
          .min(
            200,
            "Le champ 'included' doit contenir au moins 200 caractères."
          ),
      }),
      prompt: offer ? getPrompts(offer)["included"] : undefined,
    },
    {
      key: "notIncluded",
      name: "Ce qui n'est pas inclus",
      isGenerated: () => !!offer?.offerJson?.generated?.notIncluded,
      schema: z.object({
        notIncluded: z
          .string()
          .min(
            200,
            "Le champ 'notIncluded' doit contenir au moins 200 caractères."
          ),
      }),
      prompt: offer ? getPrompts(offer)["notIncluded"] : undefined,
    },
    {
      key: "doneForYou",
      name: "Pour toi si...",
      isGenerated: () => !!offer?.offerJson?.generated?.doneForYou,
      schema: z.object({
        doneForYou: z
          .string()
          .min(
            200,
            "Le champ 'fait pour toi' doit contenir au moins 200 caractères."
          ),
      }),
      prompt: offer ? getPrompts(offer)["doneForYou"] : undefined,
    },
    {
      key: "notDoneForYou",
      name: "Pas pour toi si...",
      isGenerated: () => !!offer?.offerJson?.generated?.notDoneForYou,
      schema: z.object({
        notDoneForYou: z
          .string()
          .min(
            200,
            "Le champ 'notDoneForYou' doit contenir au moins 200 caractères."
          ),
      }),
      prompt: offer ? getPrompts(offer)["notDoneForYou"] : undefined,
    },
    {
      key: "FAQ",
      name: "Les questions fréquentes",
      isGenerated: () => !!offer?.offerJson?.generated?.FAQ,
      schema: z.object({
        FAQ: z
          .string()
          .min(200, "Le champ 'FAQ' doit contenir au moins 200 caractères."),
      }),
      prompt: offer ? getPrompts(offer)["FAQ"] : undefined,
    },
    {
      key: "painPoints",
      name: "Tu te reconnais ?",
      isGenerated: () => !!offer?.offerJson?.generated?.painPoints,
      schema: z.object({
        painPoints: z
          .string()
          .min(
            200,
            "Le champ 'painPoints' doit contenir au moins 200 caractères."
          ),
      }),
      prompt: offer ? getPrompts(offer)["painPoints"] : undefined,
    },
    {
      key: "doNothing",
      name: "Si tu ne fais rien",
      isGenerated: () => !!offer?.offerJson?.generated?.doNothing,
      schema: z.object({
        doNothing: z
          .string()
          .min(
            200,
            "Le champ 'doNothing' doit contenir au moins 200 caractères."
          ),
      }),
      prompt: offer ? getPrompts(offer)["doNothing"] : undefined,
    },
    {
      key: "fillTheForm",
      name: "Si tu remplis ce formulaire",
      isGenerated: () => !!offer?.offerJson?.generated?.fillTheForm,
      schema: z.object({
        fillTheForm: z
          .string()
          .min(
            200,
            "Le champ 'fillTheForm' doit contenir au moins 200 caractères."
          ),
      }),
      prompt: offer ? getPrompts(offer)["fillTheForm"] : undefined,
    },
  ];
};
