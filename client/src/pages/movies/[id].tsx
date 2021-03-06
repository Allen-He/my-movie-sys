import React, { useState, useEffect } from 'react';
import MoviesForm from '@/components/MoviesForm';
import MovieService from '@/services/MovieService';

const detail = ({ match }: any) => {
  const [formValues, setFormValues] = useState();
  
  useEffect(() => {
    MovieService.findById(match.params.id).then(res => {
      res && setFormValues((res as any).data);
    });
  }, []);
  
  return (
    <>
      {formValues && <MoviesForm isEdit={true} initialValues={formValues} />}
    </>
  );
}

// detail.wrappers = ['@/wrappers/Admin'];

export default detail;
