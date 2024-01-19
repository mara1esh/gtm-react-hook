import React from 'react';
import ReactDOM from 'react-dom';

const App: React.FC = () => {
  return <div>Hello, world!</div>;
};

ReactDOM.render(<App />, document.getElementById('root'));

export const add = (a: number, b: number) => a + b;
