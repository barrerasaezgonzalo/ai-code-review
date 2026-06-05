export type HistorialItem = {
  id: string;
  timestamp: number;
  inputCode: string;
  result: {
    explicacion: string;
    codigo_sugerido: string;
    complejidad_ciclomatica: number;
    roast: string;
  };
};
