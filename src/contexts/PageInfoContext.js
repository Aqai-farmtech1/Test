import React, { Component, createContext } from 'react';

export const PageInfoContext = createContext();

class PageInfoProvider extends Component {
  state = {
    pageTitle: "",
    contextCheck: "checkmain"
  };
  setPageTitle = () => {

  };
  setAlert = () => {
    // alert('Context integrated');
  }
  render() {
    const { setPageTitle, setAlert } = this;
    return (
      <PageInfoContext.Provider value={{ pageTitle: this.state.pageTitle, contextCheck: this.state.contextCheck, setPageTitle, setAlert }}>
        {this.props.children}
      </PageInfoContext.Provider>
    )
  }
}

export default PageInfoProvider;