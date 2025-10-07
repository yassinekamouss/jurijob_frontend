import React from "react";
import * as LucideIcons from "lucide-react";
import { HelpCircle } from "lucide-react";

type IconName = keyof typeof LucideIcons;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Nom de l'icône Lucide (ex: "User", "Search", "Bell"...) */
  name: IconName;
  /** Taille de l'icône (par défaut 24) */
  size?: number;
  /** Couleur de l'icône (par défaut currentColor) */
  color?: string;
  /** Épaisseur du trait (par défaut 2) */
  strokeWidth?: number;
  /** Classes CSS additionnelles */
  className?: string;
}

/**
 * Composant d'icône générique basé sur lucide-react.
 * Utilisation :
 * ```tsx
 * <Icon name="User" size={32} color="blue" />
 * ```
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = "currentColor",
  className = "",
  strokeWidth = 2,
  ...props
}) => {
  const IconComponent = LucideIcons[name] as React.FC<React.SVGProps<SVGSVGElement>>;

  if (!IconComponent) {
    return (
      <HelpCircle
        size={size}
        color="gray"
        strokeWidth={strokeWidth}
        className={className}
        {...props}
      />
    );
  }

  return (
    <IconComponent
      width={size}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
      {...props}
    />
  );
};

export default Icon;
