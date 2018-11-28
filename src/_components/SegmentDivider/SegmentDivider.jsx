import React from 'react';
import { Divider, Header } from 'semantic-ui-react';
export const SegmentDivider = props => {
  return (
    <Divider horizontal style={{ paddingTop: props.padding ? 40 : 0 }}>
      <Header size="small" color="teal">
        {props.heading}
      </Header>
    </Divider>
  );
};
