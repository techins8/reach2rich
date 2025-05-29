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

const offerPlaceholder = `Exemple : "J'aide les développeurs à trouver une mission en freelance grâce à la méthode Reach2Rich.
Je vends un accompagnement personnalisé pour 997€."`;

const stepsPlaceholder = `Exemple :
Étape 1 : On analyse votre profil et votre marché.
Étape 2 : On crée votre offre.
Étape 3 : On crée votre ligne éditoriale.
Étape 4 : On vous apprend à créer des posts qui convertissent."`;

const formSchema = z.object({
  offer: z.string().min(50, {
    message: "Le champ 'offre' doit contenir au moins 50 caractères.",
  }),
  steps: z.string().min(50, {
    message: "Le champ 'déroulé' doit contenir au moins 50 caractères.",
  }),
  cv: z.string().min(200, {
    message: "Le champ 'CV' doit contenir au moins 200 caractères.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function FirstStep() {
  const { offer, setStep, setOffer, isFetching: isLoading } = useFormContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasFormChanged, setHasFormChanged] = useState(false);

  const allSteps = getStepConfigs(offer);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offer: offer?.offerJson?.userInput?.offer ?? "",
      steps: offer?.offerJson?.userInput?.steps ?? "",
      cv: offer?.offerJson?.userInput?.cv ?? "",
    },
  });

  useEffect(() => {
    if (offer) {
      form.reset({
        offer: offer?.offerJson?.userInput?.offer ?? "",
        steps: offer?.offerJson?.userInput?.steps ?? "",
        cv: offer?.offerJson?.userInput?.cv ?? "",
      });
      setHasFormChanged(false);
    }
  }, [offer, form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (!offer?.offerJson?.userInput) return;
      setHasFormChanged(
        value.offer !== offer.offerJson.userInput.offer ||
          value.steps !== offer.offerJson.userInput.steps ||
          value.cv !== offer.offerJson.userInput.cv
      );
    });
    return () => subscription.unsubscribe();
  }, [form, offer]);

  const handleSubmit = useCallback(
    async (values: FormValues) => {
      if (!offer) return;
      setIsGenerating(true);

      try {
        const result = await generate(0, {
          ...offer,
          offerJson: {
            ...offer.offerJson,
            userInput: {
              ...offer.offerJson.userInput,
              ...values,
            },
          },
        });

        if (result?.updatedOffer) {
          setStep((s: number) => s + 1);
          setOffer(result.updatedOffer);
        }
      } finally {
        setIsGenerating(false);
      }
    },
    [offer, setStep, setOffer]
  );

  const nextStep = allSteps[1];
  const isNextStepGenerated = nextStep?.isGenerated?.() ?? false;

  const goToNextStep = () => {
    setStep((stepNumber: number) =>
      stepNumber + 1 <= allSteps.length ? stepNumber + 1 : stepNumber
    );
  };

  return (
    <Form {...form}>
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="offer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Quelle est votre offre ? Qu&apos;est-ce que vous vendez et à qui
                ? Combien ?
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  loading={isLoading}
                  className="mt-2 min-h-60 placeholder:text-gray-400/60"
                  placeholder={offerPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="steps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Quel est le déroulé de votre offre ? (Étape 1 ; Étape 2 ; ...)
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  loading={isLoading}
                  className="mt-2 min-h-60 placeholder:text-gray-400/60"
                  placeholder={stepsPlaceholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre CV</FormLabel>
              <FormControl>
                <Textarea
                  rows={8}
                  loading={isLoading}
                  className="mt-2 min-h-60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          {isNextStepGenerated && !hasFormChanged && (
            <Button onClick={goToNextStep} disabled={isGenerating}>
              Suivant
            </Button>
          )}

          {(hasFormChanged || !isNextStepGenerated) && (
            <Button
              type="button"
              disabled={isGenerating}
              loading={isGenerating}
              onClick={form.handleSubmit(handleSubmit)}
            >
              Suivant
            </Button>
          )}
        </div>
      </div>
    </Form>
  );
}
