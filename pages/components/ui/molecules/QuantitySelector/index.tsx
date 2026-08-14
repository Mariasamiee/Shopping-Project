import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { IconButton } from "@/pages/components/ui/atoms/IconButton";
import { cn } from "@/pages/core/lib/cn";

export type QuantitySelectorSize = "sm" | "md";

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  size?: QuantitySelectorSize;
  className?: string;
}

const buttonSizeMap: Record<QuantitySelectorSize, "sm" | "md"> = {
  sm: "sm",
  md: "md"
};

const numberBoxClasses: Record<QuantitySelectorSize, string> = {
  sm: "w-6 h-6 text-sm",
  md: "w-10 h-9 text-base"
};

export function QuantitySelector({ value, onChange, min = 1, max = 99, size = "md", className }: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (value > min) onChange(value - 1);
  };

  const handleIncrease = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className={cn("inline-flex items-center border border-neutral-300 rounded-md overflow-hidden", className)}>
      <IconButton
        icon={<Plus size={size === "sm" ? 12 : 16} />}
        label="+"
        variant="ghost"
        size={buttonSizeMap[size]}
        disabled={value >= max}
        onClick={handleIncrease}
        className="rounded-none"
      />
      

      <span className={cn("text-center font-medium select-none border-x border-neutral-300 flex items-center justify-center", numberBoxClasses[size])}>
        {value}
      </span>

      <IconButton
        icon={<Minus size={size === "sm" ? 12 : 16} />}
        label="-"
        variant="ghost"
        size={buttonSizeMap[size]}
        disabled={value <= min}
        onClick={handleDecrease}
        className="rounded-none"
      />
    </div>
  )
}