import React, { useCallback } from 'react';
import { Button, Checkbox, Divider, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { type AuthFormValues, authSchema } from '../model/authSchema';
import styles from './AuthForm.module.less';

interface AuthFormProps {
  onSubmit: (values: AuthFormValues) => void;
  isLoading?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLoading }) => {
  const [form] = Form.useForm<AuthFormValues>();

  const handleFinish = useCallback(
    (values: AuthFormValues) => {
      const parsed = authSchema.safeParse(values);
      if (!parsed.success) {
        parsed.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof AuthFormValues;
          form.setFields([{ name: field, errors: [issue.message] }]);
        });
        return;
      }
      onSubmit(parsed.data);
    },
    [form, onSubmit],
  );

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      layout="vertical"
      requiredMark={false}
      className={styles.form}
    >
      <Form.Item
        name="username"
        label="Логин"
        rules={[{ required: true, message: 'Введите логин' }]}
      >
        <Input
          prefix={<UserOutlined className={styles.icon} />}
          placeholder="Введите логин"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[{ required: true, message: 'Введите пароль' }]}
      >
        <Input.Password
          prefix={<LockOutlined className={styles.icon} />}
          placeholder="Введите пароль"
          size="large"
        />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" initialValue={false}>
        <Checkbox>Запомнить данные</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block size="large">
          Войти
        </Button>
      </Form.Item>

      <Divider>или</Divider>
    </Form>
  );
};
