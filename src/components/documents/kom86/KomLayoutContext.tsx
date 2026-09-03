import React, { createContext, useContext, useState } from 'react';

export type KomLayoutMode = 'CONTINUOUS' | 'PAGINATED';

interface KomLayoutContextType {
  layoutMode: KomLayoutMode;
  setLayoutMode: (mode: KomLayoutMode) => void;
}

export const KomLayoutContext = createContext<KomLayoutContextType>({
  layoutMode: 'CONTINUOUS',
  setLayoutMode: () => {},
});

export const useKomLayout = () => useContext(KomLayoutContext);

interface ProviderProps {
  children: React.ReactNode;
  initialMode?: KomLayoutMode;
}

export const KomLayoutProvider: React.FC<ProviderProps> = ({
  children,
  initialMode = 'CONTINUOUS',
}) => {
  const [layoutMode, setLayoutMode] = useState<KomLayoutMode>(() => {
    try {
      const saved = localStorage.getItem('kom_layout_mode');
      if (saved === 'PAGINATED' || saved === 'CONTINUOUS') {
        return saved;
      }
    } catch {
      // ignore
    }
    return initialMode;
  });

  const handleSetMode = (mode: KomLayoutMode) => {
    setLayoutMode(mode);
    try {
      localStorage.setItem('kom_layout_mode', mode);
    } catch {
      // ignore
    }
  };

  return (
    <KomLayoutContext.Provider value={{ layoutMode, setLayoutMode: handleSetMode }}>
      {children}
    </KomLayoutContext.Provider>
  );
};
