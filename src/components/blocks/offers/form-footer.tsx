import { Button } from "@/components/ui/button";
import { useForm } from "@/contexts/form-context";
import { getStepConfigs } from "@/services/offer/step-configs";

interface FormFooterProps {
  stepNumber: number;
  onRegenerateClick: () => void;
}

export const FormFooter = ({
  stepNumber,
  onRegenerateClick,
}: FormFooterProps) => {
  const { offer, setStep, isFetching: isLoading } = useForm();

  const allSteps = getStepConfigs(offer);

  const currentStep = allSteps[stepNumber];
  const nextStep = allSteps[stepNumber + 1];

  const generatedValue =
    offer?.offerJson?.generated?.[
      currentStep?.key as keyof typeof offer.offerJson.generated
    ];

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
    <div className="flex justify-between">
      <div>
        {onPreviousClick && (
          <Button
            type="button"
            variant="outline"
            onClick={onPreviousClick}
            disabled={isLoading}
          >
            Précédent
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        {generatedValue && (
          <Button
            variant="outline"
            disabled={isLoading}
            loading={isLoading}
            onClick={onRegenerateClick}
          >
            Régénérer
          </Button>
        )}

        {isNextStepGenerated && (
          <Button onClick={goToNextStep} disabled={isLoading}>
            Suivant
          </Button>
        )}

        {!isNextStepGenerated && (
          <Button type="submit" disabled={isLoading} loading={isLoading}>
            Suivant
          </Button>
        )}
      </div>
    </div>
  );
};
