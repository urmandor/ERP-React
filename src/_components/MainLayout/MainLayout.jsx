import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { tabActions, userActions } from '../../_actions';

import { HorizontalSidebar } from '../Sidebar';
import { Topbar } from '../Topbar';

import { Sidebar, Segment, Label, Table, Progress } from 'semantic-ui-react';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSideBarVisible: true,
    };
    this.toggleSideBarVisibility = this.toggleSideBarVisibility.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.toggleMainTab = this.toggleMainTab.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {}

  logout() {
    const { dispatch } = this.props;
    dispatch(userActions.logout());
  }

  toggleSideBarVisibility() {
    const { isSideBarVisible } = this.state;
    this.setState({ isSideBarVisible: !isSideBarVisible });
  }

  changeTab(e, { name }) {
    const { dispatch } = this.props;
    dispatch(tabActions.changeTab(name));
  }

  toggleMainTab(e, { name }) {
    const { dispatch } = this.props;
    dispatch(tabActions.toggleSubTab(name));
  }

  render() {
    const { isSideBarVisible } = this.state;

    return (
      <React.Fragment>
        <Topbar
          toggleVisibility={this.toggleSideBarVisibility}
          logout={this.logout}
        />
        <div className="main-content">
          <Sidebar.Pushable
            style={{ minHeight: '100vh', background: 'transparent' }}
            as={Segment}
            attached="bottom"
          >
            <HorizontalSidebar
              visible={isSideBarVisible}
              animation="overlay"
              direction="left"
              tab={this.props.tab}
              changeTab={this.changeTab}
              toggleMainTab={this.toggleMainTab}
            />
            <Sidebar.Pusher>
              <div
                style={{
                  paddingLeft: isSideBarVisible ? 260 : 0,
                }}
              >
                <Segment basic>{this.props.children}</Segment>
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { tab } = state;
  return {
    tab,
  };
}

const connectedLayout = connect(mapStateToProps)(MainLayout);
export { connectedLayout as MainLayout };
