import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false
  };

  componentDidCatch(error, info) {
    console.log("err: ", error);
    console.log("info: ", info);
    this.setState({
      hasError: true
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <p>Ooops, Error!!!</p>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
