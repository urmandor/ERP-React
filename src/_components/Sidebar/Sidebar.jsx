import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { tabs } from '../../_constants/tab.constants';
import { Sidebar, Menu, Accordion, Transition } from 'semantic-ui-react';

const tabNames = Object.keys(tabs);
console.log('TABS;', tabNames);
tabNames.map(val => {
  tabs[val].MAIN;
});

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
      {Object.keys(tabs).map(val => {
        return tabs[val].SUB ? (
          <Menu.Item key={val}>
            <Accordion.Title
              name={tabs[val].MAIN}
              active={
                tabs[val].MAIN === (tab.SUB && tab.SUB.name) && tab.SUB.status
              }
              content={tabs[val].MAIN}
              index={0}
              onClick={toggleMainTab}
            />
            <Transition
              visible={
                tabs[val].MAIN === (tab.SUB && tab.SUB.name) && tab.SUB.status
              }
              animation="slide down"
              duration={200}
            >
              <Accordion.Content
                active={
                  tabs[val].MAIN === (tab.SUB && tab.SUB.name) && tab.SUB.status
                }
                content={
                  // <React.Fragment>

                  Object.keys(tabs[val].SUB).map(sub => {
                    return (
                      <Menu.Item
                        key={sub}
                        name={tabs[val].SUB[sub]}
                        active={tabs[val].SUB[sub] === tab.MAIN}
                        onClick={changeTab}
                      >
                        {tabs[val].SUB[sub]}
                      </Menu.Item>
                    );
                  })
                  // </React.Fragment>
                }
              />
            </Transition>
          </Menu.Item>
        ) : (
          <Menu.Item
            key={val}
            name={tabs[val].MAIN}
            active={tabs[val].MAIN === tab.MAIN}
            onClick={changeTab}
          >
            {tabs[val].MAIN}
          </Menu.Item>
        );
      })}
    </Accordion>
  </Sidebar>
);
