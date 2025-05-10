import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useForm as useFormContext } from "@/contexts/form-context";
import { generate } from "@/services/offer/generate-step";
import { getStepConfigs } from "@/services/offer/step-configs";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface GenericStepProps {
  stepNumber: number;
}

export function IntermediaryStep({ stepNumber }: GenericStepProps) {
  const { offer, setStep, isFetching, setOffer } = useFormContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const allSteps = getStepConfigs(offer);
  const currentStep = allSteps[stepNumber];
  const nextStep = allSteps[stepNumber + 1];

  type FormValues = {
    [key: string]: string;
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(currentStep.schema ?? z.object({})),
    defaultValues: {
      [currentStep.key as string]:
        offer?.offerJson?.generated?.[
          currentStep.key as keyof typeof offer.offerJson.generated
        ] ?? "",
    },
  });

  useEffect(() => {
    if (offer && currentStep.key) {
      form.reset({
        [currentStep.key]:
          offer.offerJson.generated[
            currentStep.key as keyof typeof offer.offerJson.generated
          ] ?? "",
      });
    }
  }, [stepNumber, offer, form, currentStep.key]);

  const handleSubmit = useCallback(async () => {
    if (!offer || !currentStep.key) return;
    setIsGenerating(true);

    try {
      const result = await generate(stepNumber, offer);

      if (result?.updatedOffer) {
        setStep((s) => s + 1);
        setOffer(result.updatedOffer);
      }
    } finally {
      setIsGenerating(false);
    }
  }, [offer, stepNumber, setStep, setOffer, currentStep.key]);

  const handleRegenerate = useCallback(async () => {
    if (!offer || !currentStep.key) return;
    setIsRegenerating(true);

    try {
      const result = await generate(stepNumber - 1, offer);

      if (result?.updatedOffer) {
        setOffer(result.updatedOffer);
        form.reset({
          [currentStep.key]:
            result.updatedOffer.offerJson.generated[
              currentStep.key as keyof typeof result.updatedOffer.offerJson.generated
            ] ?? "",
        });
      }
    } finally {
      setIsRegenerating(false);
    }
  }, [offer, stepNumber, setOffer, form, currentStep.key]);

  const isNextStepGenerated = nextStep?.isGenerated?.() ?? false;
  const isCurrentStepGenerated = currentStep?.isGenerated?.() ?? false;

  const goToNextStep = () => {
    setStep((stepNumber) =>
      stepNumber + 1 <= allSteps.length ? stepNumber + 1 : stepNumber
    );
  };

  const onPreviousClick = () => {
    setStep((stepNumber) => (stepNumber > 0 ? stepNumber - 1 : stepNumber));
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name={currentStep.key as string}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{currentStep.name}</FormLabel>
              <FormControl>
                <Textarea
                  rows={12}
                  loading={isFetching}
                  disabled={isFetching}
                  className="mt-2 min-h-60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
            {isCurrentStepGenerated && (
              <Button
                type="button"
                variant="outline"
                disabled={isRegenerating || isGenerating}
                loading={isRegenerating}
                onClick={handleRegenerate}
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
                type="button"
                disabled={isGenerating || isRegenerating}
                loading={isGenerating}
                onClick={form.handleSubmit(handleSubmit)}
              >
                Suivant
              </Button>
            )}
          </div>
        </div>
      </div>
    </Form>
  );
}
