import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Providers } from './providers';
import { AppRouter } from './router';
import { useStore } from './store';

const AppContent = observer(() => {
  const { authStore } = useStore();

  useEffect(() => {
    authStore.init();
  }, [authStore]);

  return <AppRouter />;
});

const App = () => {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
};

export default App;
