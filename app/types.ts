export interface ModesProps {
  modes: Modes[];
}

export interface Modes {
  id: string;
  label: string;
  icon: React.ComponentType;
  desc: string;
}

export interface ModeListProps {
  m: {
    id: string;
    label: string;
    icon: React.ComponentType;
    desc: string;
  };
  isLoading: boolean;
  setMode: (mode: string) => void;
  currentMode: string;
}

export interface AnalyzeProps {
  handleAnalyze: () => void;
  isLoading: boolean;
  isEmptyError: boolean;
}
