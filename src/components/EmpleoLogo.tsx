import { cn } from "@/src/utilities/cn";

const LOGO_CLASSES = {
  light: {
    md: {
      classNames: "text-3xl",
      shadow: "2px 1.4px",
    },
    lg: {
      classNames: "text-4xl",
      shadow: "2.5px 1.45px",
    },
    xl: {
      classNames: "text-5xl",
      shadow: "2.8px 1.48px",
    },
  },
  dark: {
    md: {
      classNames: "text-3xl",
      shadow: "1px 1px",
    },
    lg: {
      classNames: "text-4xl",
      shadow: "1.5px 1.2px",
    },
    xl: {
      classNames: "text-5xl",
      shadow: "1.7px 1.3px",
    },
  },
};

interface EmpleoLogoProps {
  size?: "md" | "lg" | "xl";
  background?: "light" | "dark";
  className?: string;
}

const EmpleoLogo = ({
  size = "md",
  background = "light",
  className,
}: EmpleoLogoProps) => {
  return (
    <div
      className={cn(
        "font-black text-3xl font-patua text-indigo-500",
        LOGO_CLASSES[background][size].classNames,
        className
      )}
      style={{
        textShadow: `${LOGO_CLASSES[background][size].shadow} ${
          background === "light" ? "#312E81" : "#E0E7FF"
        }`,
      }}
      // 312E81 - 900
      // E0E7FF - 100
      // EEF2FF - 50
    >
      empleo
    </div>
  );
};

export default EmpleoLogo;
