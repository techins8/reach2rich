import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@/contexts/form-context";
import { useActionState } from "react";
import { saveOffer, LastStepResponse as LestStepResponse } from "./actions";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormMessage } from "@/components/blocks/offers/form-message";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const initialState: LestStepResponse = {};

export function LastStep() {
  const { offer, setStep, isFetching: isLoading } = useForm();

  const [state, formAction, pending] = useActionState(
    async (prevState: LestStepResponse, formData: FormData) => {
      if (!offer) return prevState;

      const result = await saveOffer(offer, formData);

      if (result?.updatedOffer) {
        toast.success("Offre finalisée avec succès");

        redirect(`/dashboard/offers/${offer.id}`);
      }

      return result;
    },
    initialState
  );

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="fillTheForm">Si tu remplis ce formulaire :</Label>
          <Textarea
            rows={12}
            name="fillTheForm"
            loading={isLoading}
            defaultValue={offer?.offerJson.generated.fillTheForm}
            className={cn("mt-2 min-h-60", {
              "border-red-500": state?.inputErrors?.fillTheForm,
            })}
          />
          <FormMessage error={state?.inputErrors?.fillTheForm} />
        </div>

        <div className="flex justify-between">
          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(9)}
              disabled={pending}
            >
              Précédent
            </Button>
          </div>

          <div className="flex gap-2">
            {/* {generatedValue && (
              <Button
                type="button"
                variant="outline"
                disabled={isRegenerating || isGenerating}
                loading={isRegenerating}
                onClick={regenerateAction}
              >
                Régénérer
              </Button>
            )} */}

            <Button type="submit" loading={pending} disabled={pending}>
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
