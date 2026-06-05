import { useState } from "react";

export const useClipboard = (duration = 2000) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
    } catch (err) {
      console.error("Error al copiar al portapapeles:", err);
    }
  };

  return { copied, copyToClipboard };
};
