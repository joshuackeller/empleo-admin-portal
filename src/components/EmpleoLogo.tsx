import { cn } from "@/src/utilities/cn";

const LOGO_CLASSES = {
  light: {
    md: {
      classNames: "text-3xl",
      shadow: "1.4px 1.4px",
    },
    lg: {
      classNames: "text-4xl",
      shadow: "1.25px 1.25px",
    },
    xl: {
      classNames: "text-5xl",
      shadow: "1.5px 1.5px",
    },
  },
  dark: {
    md: {
      classNames: "text-3xl",
      shadow: "1px 1px",
    },
    lg: {
      classNames: "text-4xl",
      shadow: "1.25px 1.25px",
    },
    xl: {
      classNames: "text-5xl",
      shadow: "1.5px 1.5px",
    },
  },
};

interface EmpleoLogoProps {
  size?: "md" | "lg" | "xl";
  background?: "light" | "dark";
}

const EmpleoLogo = ({ size = "md", background = "light" }: EmpleoLogoProps) => {
  return (
    <div
      className={cn(
        "font-black text-3xl font-patua text-indigo-500",
        LOGO_CLASSES[background][size].classNames
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
