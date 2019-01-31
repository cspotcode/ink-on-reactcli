import ReactCLI, { Section } from 'react-cli-renderer';
import __InkSpinner from 'ink-spinner';
import React from 'react';
import chalk from "chalk";
import { wrapInkComponent } from '../index';

// You *must* wrap Ink components before use.
// This fixes their render() signature.
const InkSpinner = wrapInkComponent(__InkSpinner);

class MyReactCLIApp extends React.Component {
  state = {
    step: 0
  };

  componentDidMount() {
    setTimeout(() => this.setState({ step: 1 }), 1000);
    setTimeout(() => this.setState({ step: 2 }), 2000);
    setTimeout(() => this.setState({ step: 3 }), 3000);
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
      </Section>
    );
  }
}

ReactCLI(<MyReactCLIApp />);
