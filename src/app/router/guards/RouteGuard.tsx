import { Navigate, Outlet } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Flex, Spin } from 'antd';
import { useStore } from '@/app/store';
import { ROUTES } from '../routes';
import styles from './RouteGuard.module.less';

interface RouteGuardProps {
  type: 'protected' | 'guest';
}

export const RouteGuard = observer(({ type }: RouteGuardProps) => {
  const { authStore } = useStore();

  if (!authStore.isInitialized) {
    return (
      <Flex align="center" justify="center" className={styles.loader}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (type === 'protected') {
    return authStore.isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.AUTH} replace />;
  }

  return authStore.isAuthenticated ? <Navigate to={ROUTES.HOME} replace /> : <Outlet />;
});
