export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}
