import React from 'react';

interface ITextFieldProps {
  label: string,
  value?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void
}

const TextField = (props: ITextFieldProps): JSX.Element => {
  return (
    <div>
      {props.label}: <input onChange={props.onChange}
        {...props.value ? { value: props.value } : {}}
        {...props.onClick ? { onClick: props.onClick } : {}}
      />
    </div>
  )
};

export default TextField;