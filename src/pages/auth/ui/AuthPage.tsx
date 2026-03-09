import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { Alert, Button, Tooltip, Typography } from 'antd';
import { AuthForm, type AuthFormValues } from '@/features/auth';
import { useStore } from '@/app/store';
import logo from '@/shared/assets/logo.svg';
import styles from './AuthPage.module.less';

const { Title, Text } = Typography;

export const AuthPage: React.FC = observer(() => {
  const { authStore } = useStore();

  const handleSubmit = useCallback(
    async (values: AuthFormValues) => {
      await authStore.login(
        { username: values.username, password: values.password },
        values.remember,
      );
    },
    [authStore],
  );

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.content}>
          <img src={logo} alt="Логотип" className={styles.logo} />
          <div className={styles.header}>
            <Title level={2} className={styles.title}>
              Добро пожаловать!
            </Title>
            <Text type="secondary">Пожалуйста, авторизируйтесь</Text>
          </div>
          {authStore.error && <Alert title={authStore.error} type="error" showIcon />}
          <AuthForm onSubmit={handleSubmit} isLoading={authStore.isLoading} />
          <div className={styles.footer}>
            <Text type="secondary">Нет аккаунта?</Text>
            <Tooltip title="Находится в разработке">
              <Button type="link" size="small" className={styles.link}>
                Создать
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
});
