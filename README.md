Experimental hack that allows using [Ink](https://github.com/vadimdemedes/ink)
components with [ReactCLI](https://github.com/mgrip/react-cli) and React.

The goal is to use things like MobX with pre-existing Ink components.  MobX
works with React, and thus with ReactCLI, but not with Ink, which is not built
on top of React.  However, ReactCLI does not have the rich selection of
Components that have been built for Ink.

# Example

Run the example via:

```
npm run example
```

# Usage

1. Install React and Ink as peer dependencies.
2. Run the bootstrapper *before* Ink is require()d.
3. Wrap all the Ink components you want to use.
4. Run the UI via `ReactCLI()` from "react-cli-renderer."

```
import {bootstrap, wrapInkComponent} from 'ink-on-reactcli';
import ReactCLI from 'react-cli-renderer';
import _InkSpinner from 'ink-spinner';
const InkSpinner = wrapInkComponent(_InkSpinner);
ReactCLI(<MyAppUI></MyAppUI>);
```