import React, { useState } from 'react';
import styles from './index.less'

type Props = {
  value: string;  // 想要隐藏的值
  count: number;  // 隐藏字符的个数
  hideStr?: string; // 隐藏的字符，例如*
};

const SecretContent = ({
  value,
  count,
  hideStr
}: Props) => {
  const [showValue, setShowValue] = useState(false);
  if (!hideStr) {
    hideStr = '*';
  }
  let hideString = '';
  for (let i = 0; i < count; ++i) {
    hideString += hideStr;
  }
  return (
    <>
      <span>{!showValue ? hideString : value}</span>
      <span
        style={{ marginLeft: 10 }}
        className={styles.actionBtn}
        onClick={() => setShowValue(!showValue)}
      >
        {!showValue ? '显示' : '隐藏'}
      </span>
    </>
  );
}

export default SecretContent;