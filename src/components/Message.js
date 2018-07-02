// @flow
import React, { Component } from "react";
import { MyContext } from "./MyProvider";

type MessageProps = {
  message?: string,
  color: {
    h: number,
    s: string,
    l: string,
    a: number
  },
  idx: number,
  children?: any,
  showAction: Function,
  getColor: Function
};



class Message extends Component<MessageProps> {
  static defaultProps = { message: "Hello world" };

  color = `hsla(${this.props.color.h},${this.props.color.s},${
    this.props.color.l
  },${this.props.color.a})`;

  componentWillMount() {
    document.addEventListener("click", this.props.showAction);
  }

  shouldComponentUpdate(nextProps: Object) {
    if (this.props.color !== nextProps.color) {
      return true;
    }

    return false;
  }

  componentDidUpdate(prevProps: Object) {
    if (prevProps.color !== this.props.color) {
      this.props.getColor(this.color);
    }
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.props.showAction);
  }

  render() {
    const { children, idx } = this.props;

    return (
      <MyContext.Consumer>
        {(context: any) => {
          const currentColor = context.state.messages.colors[idx];
          const { h, s, l, a } = currentColor;
          const color = `hsla(${h},${s},${l},${a})`;

          return (
            <div onClick={context.changeColor} style={{ color }}>
              {children || this.props.message}
            </div>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

export default Message;
