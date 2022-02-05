import React from 'react';
import MoviesForm from '@/components/MoviesForm';

const add = () => {
  return <MoviesForm initialValues={{
    isComing: false,
    isHot: false,
    isClassic: false
  }} />
}

// add.wrappers = ['@/wrappers/Admin'];

export default add;
