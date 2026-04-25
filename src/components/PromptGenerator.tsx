import { useState, useEffect, useCallback } from "react";
import { Shuffle, RotateCcw, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategorySelect } from "./CategorySelect";
import { PromptCard } from "./PromptCard";
import { ThemeToggle } from "./ThemeToggle";
import {
  categories,
  categoryLabels,
  generatePrompt,
  getRandomChoice,
  type CategoryKey,
  type GeneratedPrompt
} from "@/lib/promptData";

export function PromptGenerator() {
  const [promptCount, setPromptCount] = useState(5);
  const [selections, setSelections] = useState<Record<CategoryKey, string>>(() => {
    const initial: Partial<Record<CategoryKey, string>> = {};
    (Object.keys(categories) as CategoryKey[]).forEach((key) => {
      initial[key] = categories[key][0];
    });
    return initial as Record<CategoryKey, string>;
  });
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompt[]>([]);
  const [allCopied, setAllCopied] = useState(false);

  const handleSelectionChange = (category: CategoryKey, value: string) => {
    setSelections((prev) => ({ ...prev, [category]: value }));
  };

  const resetSelections = () => {
    const reset: Partial<Record<CategoryKey, string>> = {};
    (Object.keys(categories) as CategoryKey[]).forEach((key) => {
      reset[key] = categories[key][0];
    });
    setSelections(reset as Record<CategoryKey, string>);

    // Clear previous results so the next generate is a fresh batch
    setGeneratedPrompts([]);
    setAllCopied(false);
  };

  const generatePrompts = useCallback(() => {
    const usedCombinations = new Set<string>();
    const newPrompts: GeneratedPrompt[] = [];

    for (let i = 0; i < promptCount; i++) {
      let attempts = 0;
      const maxAttempts = 100;
      let newSelections: Record<CategoryKey, string>;
      let combinationKey: string;

      do {
        newSelections = {} as Record<CategoryKey, string>;
        
        (Object.keys(categories) as CategoryKey[]).forEach((category) => {
          // Randomize each category to create variety
          newSelections[category] = getRandomChoice(categories[category]);
        });

        combinationKey = Object.values(newSelections).join("|");
        attempts++;
      } while (usedCombinations.has(combinationKey) && attempts < maxAttempts);

      usedCombinations.add(combinationKey);
      newPrompts.push(generatePrompt(newSelections));
    }

    setGeneratedPrompts(newPrompts);
  }, [promptCount]);

  const copyAllPrompts = async () => {
    if (generatedPrompts.length === 0) return;

    let allPromptsText = `Generated Prompts (${generatedPrompts.length})\n\n`;
    generatedPrompts.forEach((prompt, index) => {
      allPromptsText += `Prompt ${index + 1}:\n${prompt.full_prompt}\n\n`;
    });

    try {
      await navigator.clipboard.writeText(allPromptsText);
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = allPromptsText;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setAllCopied(true);
      setTimeout(() => setAllCopied(false), 2000);
    }
  };

  // Generate initial prompts on mount
  useEffect(() => {
    generatePrompts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="gradient-hero text-primary-foreground py-10 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Unstoppable Adaptive Character Style Pack
              </h1>
            </div>
            <ThemeToggle />
          </div>
          <p className="text-lg md:text-xl opacity-90">
            Generate diverse, inclusive prompts for African-American male wheelchair users
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Controls Card */}
        <div className="bg-card rounded-xl card-elevated p-6 mb-8">
          {/* Top Controls */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Label htmlFor="promptCount" className="font-medium text-foreground whitespace-nowrap">
                Number of prompts:
              </Label>
              <Input
                type="number"
                id="promptCount"
                value={promptCount}
                onChange={(e) => setPromptCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                min={1}
                max={50}
                className="w-20"
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={resetSelections}
                className="gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset All
              </Button>
              <Button
                onClick={generatePrompts}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Shuffle className="w-4 h-4" />
                Generate Prompts
              </Button>
              <Button
                variant="default"
                onClick={copyAllPrompts}
                disabled={generatedPrompts.length === 0}
                className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                {allCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    All Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy All
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Category Dropdowns */}
          <div className="border-t border-border pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Customize Character Attributes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {(Object.keys(categories) as CategoryKey[]).map((category) => (
                <CategorySelect
                  key={category}
                  id={category}
                  label={categoryLabels[category]}
                  options={categories[category]}
                  value={selections[category]}
                  onChange={(value) => handleSelectionChange(category, value)}
                  className={
                    category === "mobility_device" || category === "style_details"
                      ? "md:col-span-2"
                      : ""
                  }
                />
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        {generatedPrompts.length > 0 && (
          <div className="bg-card rounded-xl card-elevated p-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Generated Prompts ({generatedPrompts.length})
            </h2>
            <div className="space-y-4">
              {generatedPrompts.map((prompt, index) => (
                <PromptCard key={index} prompt={prompt} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
