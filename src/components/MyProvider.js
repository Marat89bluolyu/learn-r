// @flow

import React, { Component, createContext } from "react";
import ErrorBoundary from "./ErrorBoundary";

type MyProviderProps = {
  children?: any
};

type MyProviderState = {
  counter: number,
  messages: Object
};

export const MyContext = createContext();

class MyProvider extends Component<MyProviderProps, MyProviderState> {
  state = {
    counter: 0,
    messages: {
      words: ["Олег", "курит", "не табак", "ктулху потвердит"],
      colors: [
        {
          h: 1,
          s: "30%",
          l: "60%",
          a: 1
        },
        {
          h: 1,
          s: "30%",
          l: "25%",
          a: 1
        },
        {
          h: 1,
          s: "40%",
          l: "60%",
          a: 1
        },
        {
          h: 1,
          s: "10%",
          l: "40%",
          a: 1
        }
      ]
    },
    hasError: false
  };

  componentWillUpdate(nextProps: Object, nextState: Object) {
    if (nextState.messages.colors !== this.state.messages.colors) {
      console.log(nextState.counter);
    }
  }

  componentDidUpdate(prevProps: Object, prevState: Object) {
    if (this.state.messages.colors !== prevState.messages.colors) {
      this.setState(state => ({
        counter: ++state.counter
      }));
    }
  }

  render() {
    return (
      <MyContext.Provider
        value={{
          state: this.state,
          changeColor: () => {
            this.setState(state => ({
              messages: {
                ...state.messages,
                colors: state.messages.words.map(color => ({
                  h: Math.random(),
                  s: `${Math.floor(Math.random() * 100)}%`,
                  l: `${Math.floor(Math.random() * 100)}%`,
                  a: Math.random()
                }))
              }
            }));
          },
          getColor: color => {
            console.log(`the color is ${color}`);
          },
          showAction: () => {
            console.log(`Action is begin`);
          }
        }}
      >
        <ErrorBoundary>{this.props.children}</ErrorBoundary>
      </MyContext.Provider>
    );
  }
}

export default MyProvider;
