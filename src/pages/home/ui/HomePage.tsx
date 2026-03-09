import { useEffect, useCallback, useRef, useState } from 'react';
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, Input, Table, Tooltip, Typography } from 'antd';
import {
  PlusCircleOutlined,
  PlusOutlined,
  MoreOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import type { TableProps } from 'antd';
import type { SorterResult } from 'antd/lib/table/interface';
import { useStore } from '@/app/store';
import type { Product, SortField } from '@/entities/product';
import { CreateProductModal } from '@/features/product-create';
import styles from './HomePage.module.less';

const { Title, Text } = Typography;

const columns: TableProps<Product>['columns'] = [
  {
    title: 'Наименование',
    key: 'title',
    render: (_, product: Product) => (
      <div className={styles.productCell}>
        <Avatar src={product.thumbnail} shape="square" size={48} alt={product.title} />
        <div className={styles.productCellTitle}>
          <Title level={5} className={styles.cellTitle}>
            {product.title}
          </Title>
          <Text type="secondary" className={styles.category}>
            {product.category}
          </Text>
        </div>
      </div>
    ),
  },
  {
    title: 'Вендор',
    dataIndex: 'brand',
    key: 'brand',
    render: (brand?: string) => (
      <Text strong className={styles.cellTitle}>
        {brand ?? '—'}
      </Text>
    ),
  },
  {
    title: 'Артикул',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'Оценка',
    dataIndex: 'rating',
    key: 'rating',
    sorter: true,
    render: (rating: number) => (
      <Text className={styles.cellTitle} type={rating < 3 ? 'danger' : undefined}>
        {rating.toFixed(1)}/5
      </Text>
    ),
  },
  {
    title: 'Цена',
    dataIndex: 'price',
    key: 'price',
    sorter: true,
    render: (price: number) =>
      price.toLocaleString('ru-RU', { style: 'currency', currency: 'USD' }),
  },
  {
    key: 'actions',
    render: () => (
      <div className={styles.actions}>
        <Tooltip title="В разработке">
          <Button
            size="small"
            icon={<PlusOutlined />}
            type="primary"
            className={styles.plusButton}
          />
        </Tooltip>
        <Tooltip title="В разработке">
          <Button size="small" icon={<MoreOutlined />} className={styles.moreButton} />
        </Tooltip>
      </div>
    ),
  },
];

export const HomePage = observer(() => {
  const { authStore, productStore } = useStore();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    productStore.fetchProducts();
  }, [
    productStore,
    productStore.page,
    productStore.pageSize,
    productStore.search,
    productStore.sortBy,
    productStore.sortOrder,
  ]);

  const handleTableChange = useCallback<NonNullable<TableProps<Product>['onChange']>>(
    (pagination, _filters, sorter, extra) => {
      if (extra.action === 'sort') {
        const s = sorter as SorterResult<Product>;
        if (s.order) {
          productStore.setSort(s.columnKey as SortField, s.order === 'ascend' ? 'asc' : 'desc');
        } else {
          productStore.setSort(undefined, undefined);
        }
      } else {
        if (pagination.current) productStore.setPage(pagination.current);
        if (pagination.pageSize) productStore.setPageSize(pagination.pageSize);
      }
    },
    [productStore],
  );

  const handleSearch = useCallback(
    (value: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        productStore.setSearch(value);
      }, 400);
    },
    [productStore],
  );

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Title level={4} className={styles.title}>
          Товары
        </Title>
        <Input
          placeholder="Найти"
          allowClear
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.search}
          prefix={<SearchOutlined />}
        />
        <Button danger onClick={() => authStore.logout()}>
          Выйти
        </Button>
      </div>

      <div className={styles.content}>
        <div className={styles.toolbar}>
          <Title level={5} className={styles.title}>
            Все позиции
          </Title>
          <div className={styles.toolbarButtons}>
            <Button
              icon={<ReloadOutlined />}
              loading={productStore.isLoading}
              onClick={() => productStore.fetchProducts()}
            />
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              Добавить
            </Button>
          </div>
        </div>

        <Table<Product>
          rowKey="id"
          columns={columns}
          dataSource={productStore.products}
          loading={productStore.isLoading}
          onChange={handleTableChange}
          scroll={{ x: 'max-content', y: '100%' }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            current: productStore.page,
            pageSize: productStore.pageSize,
            total: productStore.total,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '50'],
            showTotal: (total, range) => (
              <div>
                <span className={styles.paginationTotalText}>Показано </span>
                <span>
                  {range[0]}-{range[1]}
                </span>
                <span className={styles.paginationTotalText}> из </span> <span>{total}</span>
              </div>
            ),
          }}
        />
      </div>

      <CreateProductModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
});
