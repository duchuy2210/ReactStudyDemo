import './App.scss';
import PortalModal from './Component/PortalModal';
import ToolTip from './Component/ToolTip';
import {ErrorBoundary} from 'react-error-boundary'

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
     <ToolTip text={"Hover me"}>This is a tooltip content</ToolTip>
    </div>
  );
}

export default App;
