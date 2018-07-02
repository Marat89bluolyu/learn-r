// @flow
import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Message from "./Message";
import MyProvider, { MyContext } from "./MyProvider";

export default class Widget extends Component<{}> {
  componentWillMount() {
    this.el = document.createElement("div");
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      <MyProvider>
        <MyContext.Consumer>
          {(context: any) => (
            <Fragment>
              {context.state.counter < 10 &&
                context.state.messages.words.map((word, idx) => (
                  <Message
                    key={word}
                    idx={idx}
                    getColor={context.getColor}
                    color={context.state.messages.colors[idx]}
                    showAction={context.showAction}
                  >
                    <dl>{`${++idx}) ${word}`}</dl>
                    {context.state.counter}
                  </Message>
                ))}
            </Fragment>
          )}
        </MyContext.Consumer>
      </MyProvider>,
      this.el
    );
  }
}
