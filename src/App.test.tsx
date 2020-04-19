import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';
import { ApolloProvider } from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
import App from './App';
import { mockApolloClient } from './test-helpers';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();

it('renders without crashing', () => {
  const client = mockApolloClient(); // ?? why no mock input??
  const div = document.createElement('div');
  ReactDOM.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
