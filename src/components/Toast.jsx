import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Toast() {
  const { toastMsg, toastShow } = useStore();
  return (
    <div className={'toast' + (toastShow ? ' show' : '')}>
      <span>{toastMsg}</span>
    </div>
  );
}
