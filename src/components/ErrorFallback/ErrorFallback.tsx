import * as React from 'react';

class ErrorFallback extends React.Component {
  render() {
    return (
      <div className="flex h-[100dvh] w-full items-center justify-center">
        <div className="mx-3 max-w-[500px] rounded-xl border-2 border-[grey] p-3 text-lg">
          Seems, you&apos;ve pressed a button to break the app... It was your
          conscious choice! Now you can stare at this message, until you reload
          the page...
        </div>
      </div>
    );
  }
}

export default ErrorFallback;
