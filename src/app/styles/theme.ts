import { type ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#242EDB',
    // colorSuccess: '#52c41a',
    // colorWarning: '#faad14',
    // colorError: '#ff4d4f',
    // colorInfo: '#1677ff',
    fontFamily: 'Inter, sans-serif',
    fontSize: 18,
    borderRadius: 8,
    controlHeight: 48,
  },
  components: {
    Typography: {
      colorText: '#232323',
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Button: {
      fontWeight: 600,
      colorLink: '#242EDB',
    },
    Input: {
      colorBorder: '#ededed',
      colorIcon: '#cacaca',
    },
    Checkbox: {
      colorText: '#9C9C9C',
      colorPrimary: '#3C538E',
      colorPrimaryHover: '#3C538E',
    },
    Divider: {
      colorTextHeading: '#9C9C9C',
      colorSplit: '#9C9C9C',
      fontSizeLG: 16,
      margin: 0,
    },
    Table: {
      colorText: '#232323',
      colorTextHeading: '#B2B3B9',
      fontSize: 16,
    },
  },
};
