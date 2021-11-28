import React from 'react';
import { ActionBtnModel } from '~/common/sharedModel';
import styles from './index.less';


interface Props {
  actions: ActionBtnModel[];
}

const ActionButtons = ({
  actions = [],
}: Props) => {
  const actionLastIndex = actions.length - 1;
  return (
    <div className={styles.actionButtons}>
      {
        actions.map((action, index) => (
          <>
            {action.content}
            {!action.content && (
              <span
                key={index}
                className={styles.actionBtn}
                onClick={() => {
                  if (action.onClick) {
                    action.onClick();
                  }
                }}
              >
                {action.text}
              </span>
            )}
            {
              actionLastIndex !== index && (
                <span className={styles.btnSlice}>|</span>
              )
            }
          </>
        ))
      }
    </div>
  )
}

export default ActionButtons
