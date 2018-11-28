import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react';

export const InputWithUnits = props => {
  return (
    <Form.Input
      label={props.label}
      className="no-right-border"
      labelPosition="right"
      type={props.type || 'number'}
    >
      <Input
        icon={props.icon}
        iconPosition="left"
        type={props.type}
        placeholder={props.label}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
      <Label>{props.unit}</Label>
    </Form.Input>
  );
};
