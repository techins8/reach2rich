import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { useForm as useFormContext } from "@/contexts/form-context";
import { saveOffer } from "./actions";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generate } from "@/services/offer/generate-step";

const formSchema = z.object({
  fillTheForm: z.string().min(50, {
    message: "Le champ doit contenir au moins 50 caractères.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function LastStep() {
  const { offer, setStep, isFetching: isLoading, setOffer } = useFormContext();
  const [isSaving, setIsSaving] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fillTheForm: offer?.offerJson.generated.fillTheForm ?? "",
    },
  });

  useEffect(() => {
    if (offer) {
      form.reset({
        fillTheForm: offer.offerJson.generated.fillTheForm ?? "",
      });
    }
  }, [offer, form]);

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      if (!offer) return;
      setIsSaving(true);

      try {
        const formData = new FormData();
        formData.append("fillTheForm", values.fillTheForm);

        const result = await saveOffer(offer, formData);

        if (result?.updatedOffer) {
          toast.success("Offre finalisée avec succès");
          redirect(`/dashboard/offers/${offer.id}`);
        } else if (result?.error) {
          toast.error(result.error);
        }
      } finally {
        setIsSaving(false);
      }
    },
    [offer]
  );

  const handleRegenerate = useCallback(async () => {
    if (!offer) return;
    setIsRegenerating(true);

    try {
      const result = await generate(9, offer);

      if (result?.updatedOffer) {
        setOffer(result.updatedOffer);
        form.reset({
          fillTheForm:
            result.updatedOffer.offerJson.generated.fillTheForm ?? "",
        });
      }
    } finally {
      setIsRegenerating(false);
    }
  }, [offer, setOffer, form]);

  const isCurrentStepGenerated = offer?.offerJson.generated.fillTheForm != null;

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="fillTheForm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Si tu remplis ce formulaire :</FormLabel>
              <FormControl>
                <Textarea
                  rows={12}
                  loading={isLoading}
                  disabled={isLoading}
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
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(9)}
              disabled={isSaving || isRegenerating}
            >
              Précédent
            </Button>
          </div>

          <div className="flex gap-2">
            {isCurrentStepGenerated && (
              <Button
                type="button"
                variant="outline"
                disabled={isRegenerating || isSaving}
                loading={isRegenerating}
                onClick={handleRegenerate}
              >
                Régénérer
              </Button>
            )}

            <Button
              type="button"
              loading={isSaving}
              disabled={isSaving || isRegenerating}
              onClick={form.handleSubmit(handleSubmit)}
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
}
