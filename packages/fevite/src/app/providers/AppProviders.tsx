import { FC, ReactNode, Suspense } from 'react';
import { Spinner } from '@fluentui/react-components';

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <Suspense fallback={<Spinner size="large" label="Loading application..." />}>
      {children}
    </Suspense>
  );
};

export default AppProviders;