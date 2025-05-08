import { useActionState } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@/contexts/form-context";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/blocks/offers/form-message";
import { OfferError } from "@/types/offer";
import { validateAndGenerate } from "@/services/offer/generate-step";
import { Button } from "@/components/ui/button";
import { getStepConfigs } from "@/services/offer/step-configs";

const offerPlaceholder = `Exemple : "J'aide les développeurs à trouver une mission en freelance grâce à la méthode Reach2Rich.
Il s'agit d'une méthode pratiquement 100% asynchrone pour un prix de 1000€ HT."`;

const stepsPlaceholder = `Exemple : "Étape 1 : On refait votre offre.
Étape 2 : On refait votre profil LinkedIn.
Étape 3 : On crée votre ligne éditoriale.
Étape 4 : On vous apprend à créer des posts qui convertissent."`;

export function FirstStep() {
  const { offer, setStep, setOffer, isFetching: isLoading } = useForm();

  const allSteps = getStepConfigs(offer);

  const onGenerate = async (
    prevState: OfferError<Record<string, string[]>>,
    formData: FormData
  ) => {
    if (!offer) return prevState;

    const result = await validateAndGenerate(1, offer, formData);

    if (result?.updatedOffer) {
      setStep((s) => s + 1);
      setOffer(result?.updatedOffer);
    }

    return result;
  };

  const [state, formAction, pending] = useActionState(onGenerate, {});

  const nextStep = allSteps[1];

  const isNextStepGenerated = nextStep?.isGenerated?.() ?? false;

  const goToNextStep = () => {
    setStep((stepNumber) =>
      stepNumber + 1 <= allSteps.length ? stepNumber + 1 : stepNumber
    );
  };

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="offer">
            Quelle est votre offre ? Qu&apos;est-ce que vous vendez et à qui ?
            Combien ?
          </Label>
          <Textarea
            rows={4}
            name="offer"
            defaultValue={offer?.offerJson?.userInput?.offer ?? ""}
            placeholder={offerPlaceholder}
            loading={isLoading}
            className={cn("mt-2 min-h-60 placeholder:text-gray-400/60", {
              "border-red-500": state?.inputErrors?.offer,
            })}
          />
          <FormMessage error={state?.inputErrors?.offer} />
        </div>

        <div>
          <Label htmlFor="steps">
            Quel est le déroulé de votre offre ? (Étape 1 ; Étape 2 ; ...)
          </Label>
          <Textarea
            rows={4}
            id="steps"
            name="steps"
            defaultValue={offer?.offerJson?.userInput?.steps ?? ""}
            placeholder={stepsPlaceholder}
            loading={isLoading}
            className={cn("mt-2 min-h-60 placeholder:text-gray-400/60", {
              "border-red-500": state?.inputErrors?.steps,
            })}
          />
          <FormMessage error={state?.inputErrors?.steps} />
        </div>

        <div>
          <Label htmlFor="cv">Votre CV</Label>
          <Textarea
            rows={8}
            name="cv"
            loading={isLoading}
            defaultValue={offer?.offerJson?.userInput?.cv}
            className={cn("mt-2 min-h-60", {
              "border-red-500": state?.inputErrors?.cv,
            })}
          />
          <FormMessage error={state?.inputErrors?.cv} />
        </div>

        <div className="flex justify-end">
          {isNextStepGenerated && (
            <Button onClick={goToNextStep} disabled={pending}>
              Suivant
            </Button>
          )}

          {!isNextStepGenerated && (
            <Button type="submit" disabled={pending} loading={pending}>
              Suivant
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
