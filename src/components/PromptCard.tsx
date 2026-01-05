import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GeneratedPrompt } from "@/lib/promptData";

interface PromptCardProps {
  prompt: GeneratedPrompt;
  index: number;
}

export function PromptCard({ prompt, index }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.full_prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = prompt.full_prompt;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="prompt-card">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg text-foreground">
          Prompt {index + 1}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="text-primary hover:text-primary/80 hover:bg-primary/10"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      
      <p className="text-muted-foreground leading-relaxed mb-4">
        {prompt.full_prompt}
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 text-sm">
        <div>
          <span className="font-medium text-muted-foreground">Skin:</span>{" "}
          <span className="text-foreground">{prompt.skin_tone}</span>
        </div>
        <div>
          <span className="font-medium text-muted-foreground">Age:</span>{" "}
          <span className="text-foreground">{prompt.age_range}</span>
        </div>
        <div>
          <span className="font-medium text-muted-foreground">Build:</span>{" "}
          <span className="text-foreground">{prompt.body_build}</span>
        </div>
        <div>
          <span className="font-medium text-muted-foreground">Expression:</span>{" "}
          <span className="text-foreground">{prompt.expression}</span>
        </div>
        <div>
          <span className="font-medium text-muted-foreground">Activity:</span>{" "}
          <span className="text-foreground">{prompt.activity}</span>
        </div>
        <div>
          <span className="font-medium text-muted-foreground">Environment:</span>{" "}
          <span className="text-foreground">{prompt.environment}</span>
        </div>
      </div>
    </div>
  );
}
