import React from 'react';
import {ApolloProvider} from '@apollo/react-hooks';
import ReactDOM from 'react-dom';
// import { cleanup, render, waitFor } from '@testing-library/react'; import {
// cleanup, render, waitFor, fireEvent } from '@testing-library/react'; import
// ChatsList from './ChatsList';
import {cleanup, render, waitFor, fireEvent, screen} from '@testing-library/react';
import {createBrowserHistory} from 'history';
import {mockApolloClient} from '../../test-helpers';
import ChatsList, {getChatsQuery} from './ChatsList';
import * as queries from '../../graphql/queries';

describe('ChatsList', () => {
    // afterEach(cleanup);
    afterEach(() => {
        cleanup();
        delete window.location;
        window = Object.create(window);
        Object.defineProperty(window, 'location', {
            value: {
                href: '/'
            },
            writable: true
        });
    });

    it('renders fetched chats data', async() => {
        // fetchMock.mockResponseOnce(   JSON.stringify({     data: {       chats: [
        // {           id: 1,           name: 'Foo Bar',           picture:
        // 'https://localhost:4000/picture.jpg',           lastMessage: {
        const client = mockApolloClient([
            {
                request: { query: queries.chats },
                result: {
                    data: {
                        chats: [
                            {
                                __typename: 'Chat',
                                id: 1,
                                content: 'Hello',
                                createdAt: new Date('1 Jan 2019 GMT'),
                                name: 'Foo Bar',
                                picture: 'https://localhost:4000/picture.jpg',
                                lastMessage: {
                                    __typename: 'Message',
                                    id: 1,
                                    content: 'Hello',
                                    createdAt: new Date('1 Jan 2019 GMT')
                                }
                            }
                        ]
                    }
                }
            }
        ]);
        const history = createBrowserHistory();
        {
            // const { container, getByTestId } = render(<ChatsList />); const history =
            // createBrowserHistory();
            const {container, getByTestId} = render(
            // <ChatsList history={history}/>
              <ApolloProvider client = {client} >
                <ChatsList history={history}/>
              </ApolloProvider>
            );

            // await waitFor(() => container);
            await waitFor(() => screen.getByTestId('name'));
            
            expect(getByTestId('name')).toHaveTextContent('Foo Bar');
            expect(getByTestId('picture')).toHaveAttribute('src', 'https://localhost:4000/picture.jpg ');
            expect(getByTestId('content')).toHaveTextContent('Hello');
            expect(getByTestId('date')).toHaveTextContent('00:00');
        }
    });

    it('should navigate to the target chat room on chat item click', async() => {
        // fetchMock.mockResponseOnce(JSON.stringify({     data: {         chats: [
        //        {                 id: 1,                 name: 'Foo Bar',
        //    picture: 'https://localhost:4000/picture.jpg',
        // lastMessage: {                     id: 1,                     content:
        // 'Hello',                     createdAt: new Date('1 Jan 2019 GMT')
        //      }             }         ]     } }));

        const client = mockApolloClient([
            {
                request: { query: queries.chats },
                result: {
                    data: {
                        chats: [
                            {
                                __typename: 'Chat',
                                id: 1,
                                name: 'Foo Bar',
                                picture: 'https://localhost:4000/picture.jpg',
                                lastMessage: {
                                    __typename: 'Message',
                                    id: 1,
                                    content: 'Hello',
                                    createdAt: new Date('1 Jan 2019 GMT')
                                }
                            }
                        ]
                    }
                }
            }
        ]);

        const history = createBrowserHistory();
        {
            const {container, getByTestId} = render(
            // <ChatsList history={history}/>
            <ApolloProvider client={client}>
            <ChatsList history={history} />
            </ApolloProvider>
            );

            await waitFor(() => container);

            fireEvent.click(getByTestId('chat'));
            await waitFor(() => expect(history.location.pathname).toEqual('/chats/1'));
        }
    });});