import { useState } from "react";

export const useCopy = () => {
  const [copied, setCopied] = useState(false);
  const handleCopy = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return { copied, handleCopy };
};
