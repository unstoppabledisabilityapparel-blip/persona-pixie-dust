import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface CategorySelectProps {
  id: string;
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CategorySelect({
  id,
  label,
  options,
  value,
  onChange,
  className = ""
}: CategorySelectProps) {
  return (
    <div className={className}>
      <Label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
        {label}
      </Label>
      <Select key={`${id}-${value}`} value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full bg-card border-input">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="bg-card border-border z-50">
          {options.map((option) => (
            <SelectItem key={option} value={option} className="cursor-pointer">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
