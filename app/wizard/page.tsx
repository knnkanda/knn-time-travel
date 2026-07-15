"use client";

import { WizardProvider, useWizard } from "./WizardContext";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

const colors = {
  primary: "#FF69B4",
  secondary: "#FFB6D9",
  accent: "#E91E63",
  dark: "#333333",
  light: "#F5F5F5",
};

function WizardContent() {
  const { currentStep, setCurrentStep } = useWizard();

  const steps = [
    { num: 1, label: "いつ・どこで", component: Step1 },
    { num: 2, label: "登場人物", component: Step2 },
    { num: 3, label: "舞台・シチュエーション", component: Step3 },
    { num: 4, label: "ストーリー・作風", component: Step4 },
  ];

  const CurrentStep = steps[currentStep - 1].component;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.light }}
    >
      {/* Header */}
      <header
        className="text-white py-6 px-4 shadow-lg gradient-animate"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent}, ${colors.primary})`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            小説を作成する
          </h1>
          <p className="text-sm md:text-base">
            4つのステップで、あなただけの青春小説を生成します
          </p>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step.num}
                className="flex flex-col items-center"
                style={{ flex: 1 }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white mb-2 transition-all"
                  style={{
                    backgroundColor:
                      currentStep >= step.num ? colors.primary : "#ccc",
                  }}
                >
                  {step.num}
                </div>
                <p
                  className="text-xs md:text-sm text-center font-semibold"
                  style={{ color: colors.dark }}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>
          {/* Progress Line */}
          <div className="h-1 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                backgroundColor: colors.primary,
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8">
        <CurrentStep />
      </main>

      {/* Navigation Buttons */}
      <div className="bg-white border-t py-6 px-4">
        <div className="max-w-4xl mx-auto flex justify-between gap-4">
          <button
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            className="px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: colors.light,
              color: colors.dark,
              border: `2px solid ${colors.dark}`,
            }}
          >
            ← 戻る
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={currentStep === 4}
            className="px-8 py-3 rounded-lg font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: currentStep === 4 ? "#999" : colors.primary,
            }}
          >
            次へ →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WizardPage() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
