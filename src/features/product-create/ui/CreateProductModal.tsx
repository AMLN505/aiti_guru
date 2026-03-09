import { useCallback } from 'react';
import { Form, Input, InputNumber, Modal, notification } from 'antd';

interface ProductFormValues {
  title: string;
  brand?: string;
  sku: string;
  rating: number;
  price: number;
}

interface CreateProductModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateProductModal = ({ open, onClose }: CreateProductModalProps) => {
  const [form] = Form.useForm<ProductFormValues>();

  const handleFinish = useCallback(() => {
    form.resetFields();
    onClose();
    notification.success({ message: 'Продукт успешно добавлен' });
  }, [form, onClose]);

  const handleCancel = useCallback(() => {
    form.resetFields();
    onClose();
  }, [form, onClose]);

  return (
    <Modal
      title="Добавить товар"
      open={open}
      onOk={() => form.submit()}
      onCancel={handleCancel}
      okText="Добавить"
      cancelText="Отмена"
      destroyOnHidden
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Наименование"
          rules={[{ required: true, message: 'Введите наименование' }]}
        >
          <Input placeholder="Название товара" />
        </Form.Item>

        <Form.Item name="brand" label="Вендор">
          <Input placeholder="Производитель" />
        </Form.Item>

        <Form.Item
          name="sku"
          label="Артикул"
          rules={[{ required: true, message: 'Введите артикул' }]}
        >
          <Input placeholder="SKU-XXXXX" />
        </Form.Item>

        <Form.Item
          name="rating"
          label="Оценка (0–5)"
          rules={[{ required: true, message: 'Введите оценку' }]}
        >
          <InputNumber min={0} max={5} step={0.1} style={{ width: '100%' }} placeholder="4.5" />
        </Form.Item>

        <Form.Item
          name="price"
          label="Цена ($)"
          rules={[{ required: true, message: 'Введите цену' }]}
        >
          <InputNumber min={0.01} step={0.01} style={{ width: '100%' }} placeholder="99.99" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
