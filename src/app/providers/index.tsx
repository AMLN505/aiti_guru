import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { StoreProvider } from '../store';
import { theme } from '../styles/theme';

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ConfigProvider locale={ruRU} theme={theme}>
          {children}
        </ConfigProvider>
      </BrowserRouter>
    </StoreProvider>
  );
};
