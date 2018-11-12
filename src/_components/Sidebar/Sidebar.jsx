import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { tabs } from '../../_constants/tab.constants';
import { Sidebar, Menu, Accordion, Transition } from 'semantic-ui-react';

export const HorizontalSidebar = ({
  animation,
  direction,
  visible,
  tab,
  changeTab,
  toggleMainTab,
}) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    visible={visible}
    color="teal"
  >
    <Accordion as={Menu} fluid vertical>
      <Menu.Item
        name={tabs.DASHBOARD.MAIN}
        active={tabs.DASHBOARD.MAIN === tab.MAIN}
        onClick={changeTab}
      >
        Dashboard
      </Menu.Item>

      <Menu.Item>
        <Accordion.Title
          name={tabs.CONTRACT.MAIN}
          active={
            tabs.CONTRACT.MAIN === (tab.SUB && tab.SUB.name) && tab.SUB.status
          }
          content={'Contract'}
          index={0}
          onClick={toggleMainTab}
        />
        <Transition
          visible={
            tabs.CONTRACT.MAIN === (tab.SUB && tab.SUB.name) && tab.SUB.status
          }
          animation="slide down"
          duration={200}
        >
          <Accordion.Content
            active={
              tabs.CONTRACT.MAIN === (tab.SUB && tab.SUB.name) && tab.SUB.status
            }
            content={
              <React.Fragment>
                <Menu.Item
                  name={tabs.CONTRACT.SUB.VIEW}
                  active={tabs.CONTRACT.SUB.VIEW === tab.MAIN}
                  onClick={changeTab}
                >
                  View Contracts
                </Menu.Item>
                <Menu.Item
                  name={tabs.CONTRACT.SUB.TRACING}
                  active={tabs.CONTRACT.SUB.TRACING === tab.MAIN}
                  onClick={changeTab}
                >
                  Contract Tracing
                </Menu.Item>
              </React.Fragment>
            }
          />
        </Transition>
      </Menu.Item>
    </Accordion>
  </Sidebar>
);
