import { useState } from "react";

export default function NativeAvatar({
  src,
  fallbackText,
  className,
  fallbackClassName,
}: {
  src?: string;
  fallbackText: string;
  className?: string;
  fallbackClassName?: string;
}) {
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
  };

  const showFallback = hasError || !src;

  return (
    <div
      className={`relative inline-flex shrink-0 overflow-hidden rounded-full ${className}`}>
      {!showFallback ? (
        <img
          src={src}
          alt="Avatar"
          onError={handleError}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <div
          className={`flex h-full w-full items-center justify-center rounded-full ${fallbackClassName}`}>
          {fallbackText}
        </div>
      )}
    </div>
  );
}