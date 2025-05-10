"use client";

import { Card } from "@/components/ui/card";
import { FormProgress } from "@/components/blocks/offers/form-progress";
import { FirstStep } from "@/components/blocks/offers/steps/first-step";
import { IntermediaryStep } from "@/components/blocks/offers/steps/intermediary-step";

import { FormProvider, useForm } from "@/contexts/form-context";
import { cn } from "@/lib/utils";
import { getStepConfigs } from "@/services/offer/step-configs";
import { StepConfig } from "@/services/offer/types";
import { LastStep } from "@/components/blocks/offers/steps/last-step";

const TOTAL_STEPS = 11;

export default function HomePage() {
  return (
    <FormProvider>
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-8 p-6">
          <FormContent />
        </Card>
        <Card className="col-span-4 p-6">
          <Stepper />
        </Card>
      </div>
    </FormProvider>
  );
}

function FormContent() {
  const { step } = useForm();

  return (
    <>
      <FormProgress currentStep={step} totalSteps={TOTAL_STEPS} />

      {step === 0 && <FirstStep />}
      {step > 0 && step < TOTAL_STEPS - 1 && (
        <IntermediaryStep stepNumber={step} />
      )}
      {step === TOTAL_STEPS - 1 && <LastStep />}
    </>
  );
}

function Stepper() {
  const { step, setStep, offer } = useForm();

  const steps = getStepConfigs(offer);

  const handleStepClick = (stepIndex: number, step: StepConfig) => {
    if (!step.isGenerated || step.isGenerated()) {
      setStep(stepIndex);
    }
  };

  return (
    <div className="flex flex-col relative">
      {steps.map((s, index) => (
        <div
          key={s.name}
          className="flex gap-4 cursor-pointer"
          onClick={() => handleStepClick(index, s)}
        >
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                {
                  "bg-primary text-white": step === index,
                  "bg-black text-white": step > index,
                  "bg-accent": step < index,
                }
              )}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn("h-5 border-l-4", {
                  "border-black": step > index,
                  "border-accent": step <= index,
                })}
              />
            )}
          </div>
          <div className="flex flex-col pt-2">
            <span
              className={cn("text-sm", {
                "font-semibold": step === index,
              })}
            >
              {s.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
