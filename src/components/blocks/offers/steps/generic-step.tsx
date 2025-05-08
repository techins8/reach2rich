import { useActionState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@/contexts/form-context";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/blocks/offers/form-message";
import { cn } from "@/lib/utils";
import { validateAndGenerate, generate } from "@/services/offer/generate-step";
import { getStepConfigs } from "@/services/offer/step-configs";
import { OfferError } from "@/types/offer";
import { Button } from "@/components/ui/button";
interface GenericStepProps {
  stepNumber: number;
}

export function GenericStep({ stepNumber }: GenericStepProps) {
  const { offer, setStep, isFetching, setOffer } = useForm();

  const allSteps = getStepConfigs(offer);

  const onGenerate = async (
    prevState: OfferError<Record<string, string[]>>,
    formData: FormData
  ) => {
    if (!offer) return prevState;

    const result = await validateAndGenerate(stepNumber, offer, formData);

    if (result?.updatedOffer) {
      setStep((s) => s + 1);
      setOffer(result?.updatedOffer);
    }

    return result;
  };

  const onRegenerate = async () => {
    if (!offer) return;

    const result = await generate(stepNumber - 1, offer);

    if (result?.updatedOffer) {
      setOffer(result?.updatedOffer);
    }

    return result;
  };

  const [state, formAction, isGenerating] = useActionState(onGenerate, {});
  const [, regenerateAction, isRegenerating] = useActionState(onRegenerate, {});

  const currentStep = allSteps[stepNumber];
  const nextStep = allSteps[stepNumber + 1];

  const generatedValue =
    offer?.offerJson?.generated?.[
      currentStep.key as keyof typeof offer.offerJson.generated
    ];

  const defaultValues =
    generatedValue ?? state?.inputValues?.[currentStep.key as string];

  const isNextStepGenerated = nextStep?.isGenerated?.() ?? false;

  const goToNextStep = () => {
    setStep((stepNumber) =>
      stepNumber + 1 <= allSteps.length ? stepNumber + 1 : stepNumber
    );
  };

  const onPreviousClick = () => {
    setStep((stepNumber) => (stepNumber > 0 ? stepNumber - 1 : stepNumber));
  };

  return (
    <form action={formAction} key={stepNumber}>
      <div className="space-y-4">
        <div>
          <Label htmlFor={currentStep.key}>{currentStep.name}</Label>
          <Textarea
            rows={12}
            name={currentStep.key}
            loading={isFetching}
            disabled={isFetching}
            defaultValue={defaultValues}
            className={cn("mt-2 min-h-60", {
              "border-red-500": state?.inputErrors?.[currentStep.key as string],
            })}
          />
          <FormMessage
            error={state?.inputErrors?.[currentStep.key as string]}
          />
        </div>

        <div className="flex justify-between">
          <div>
            {onPreviousClick && (
              <Button
                type="button"
                variant="outline"
                onClick={onPreviousClick}
                disabled={isGenerating || isRegenerating}
              >
                Précédent
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            {generatedValue && (
              <Button
                type="button"
                variant="outline"
                disabled={isRegenerating || isGenerating}
                loading={isRegenerating}
                onClick={regenerateAction}
              >
                Régénérer
              </Button>
            )}

            {isNextStepGenerated && (
              <Button
                onClick={goToNextStep}
                disabled={isRegenerating || isGenerating}
              >
                Suivant
              </Button>
            )}

            {!isNextStepGenerated && (
              <Button
                type="submit"
                disabled={isGenerating || isRegenerating}
                loading={isGenerating}
              >
                Suivant
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
