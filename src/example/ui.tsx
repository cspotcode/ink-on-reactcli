import readline from 'readline';
import ReactCLI, { Section } from 'react-cli-renderer';
import __InkSpinner from 'ink-spinner';
import __InkTextInput from 'ink-text-input';
import React from 'react';
import chalk from "chalk";
import { wrapInkComponent } from '../index';

// You *must* wrap Ink components before use.
// This fixes their render() signature.
const InkSpinner = wrapInkComponent(__InkSpinner);
const InkTextInput = wrapInkComponent(__InkTextInput);

class MyReactCLIApp extends React.Component {
  state = {
    input: 'input value',
    step: 0
  };

  constructor(...args) {
      super(...args);
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ step: 1 }), 1000);
    setTimeout(() => this.setState({ step: 2 }), 2000);
    setTimeout(() => this.setState({ step: 3 }), 3000);
  }

  handleChange(newValue) {
    this.setState({
        input: newValue
    });
  }

  render() {
    return (
      <Section border={{ horizontal: "*", vertical: "*" }} align="center">
        My {chalk.blue("New")} {chalk.magenta("ReactCLI App")} 🚀
        <Section horizontal>
          <Section align="center">
            {this.state.step >= 1 ? chalk.green("✔︎") : "◯"} Step 1<br />
            {this.state.step >= 2 ? chalk.green("✔︎") : "◯"} Step 2<br />
            {this.state.step >= 3 ? chalk.green("✔︎") : "◯"} Step 3
          </Section>
          <Section border={{ horizontal: "-", vertical: "|" }} align="center">
            Number of steps done:{" "}
            {chalk.bold.magenta(this.state.step.toString())}
          </Section>
        </Section>
        <Section border={{ horizontal: "-", vertical: "|" }} align="center">
                This is a third-party Ink component, ink-spinner: <InkSpinner type="dots"></InkSpinner>
        </Section>
        <Section border={{ horizontal: "-", vertical: "|" }} align="center">
                This is a third-party Ink component, ink-text-input: <InkTextInput value={this.state.input} onChange={this.handleChange} />
        </Section>
      </Section>
    );
  }
}

/**
 * This is copied from Ink.
 * TODO wrap this up as a reusable, exported API.
 */
function setupInput() {
    const {stdin} = process;
    readline.emitKeypressEvents(stdin);
    if (stdin.isTTY) {
        stdin.setRawMode(true);
    }
    const onKeyPress = (ch, key) => {
        if (key.name === 'escape' || (key.ctrl && key.name === 'c')) {
            exit();
        }
    };
    function exit() {
        if (stdin.isTTY) {
            stdin.setRawMode(false);
            stdin.removeListener('keypress', onKeyPress);
            stdin.pause();
            // stdout.removeListener('resize', currentTree.update);
        }

        // currentTree.unmount();
        // log.done();

        // consoleMethods.forEach(method => console[method].restore());
    };
    if (stdin.isTTY) {
        stdin.on('keypress', onKeyPress);
        // stdout.on('resize', currentTree.update);
    }
}

setupInput();

ReactCLI(<MyReactCLIApp />);
setTimeout(() => {
    process.exit(0);
}, 10e3);
