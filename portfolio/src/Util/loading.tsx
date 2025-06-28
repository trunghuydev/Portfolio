import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FC } from 'react';

type Props = {
  tip?: string;
  fullPage?: boolean;
};

const LoadingSpinner: FC<Props> = ({ tip = 'Đang tải...', fullPage = false }) => {
  return (
    <div className={`flex items-center justify-center ${fullPage ? 'h-screen' : 'py-10'} w-full`}>
      <Spin tip={tip} size="large" indicator={<LoadingOutlined style={{ fontSize: 32 }} spin />} />
    </div>
  );
};

export default LoadingSpinner;
