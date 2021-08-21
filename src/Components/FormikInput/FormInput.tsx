import React from 'react';
import { connect, FormikContextType, getIn } from 'formik';
import FormInput, { FormInputType } from '../FormInput';

type FormikPartProps = {
  formik: FormikContextType<any>;
};

type FormikFormInputProps = {
  id: string,
  name: string,
  value: any,
  placeHolder?: string,
  type: FormInputType,
};

const FormikFormInput: React.FC<FormikPartProps & FormikFormInputProps> = ({
  id, name, type, placeHolder, formik,
}) => (
  <FormInput
    id={id}
    type={type}
    name={name}
    value={getIn(formik?.values || [], name)}
    onChange={formik?.handleChange}
    onBlur={formik?.handleBlur}
    placeHolder={placeHolder}
    isInvalid={getIn(formik?.errors || [], name) && getIn(formik?.touched || [], name)}
  />
);

export default connect<FormikFormInputProps, any>(FormikFormInput);
export { FormInputType };
