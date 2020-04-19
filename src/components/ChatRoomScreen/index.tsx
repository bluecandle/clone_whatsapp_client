import React from 'react';
import gql from 'graphql-tag';
// import { useMemo, useState } from 'react'; import { useCallback, useMemo,
// useState } from 'react';
import {useCallback} from 'react';
import {useApolloClient, useQuery} from '@apollo/react-hooks';
import styled from 'styled-components';
import ChatNavbar from './ChatNavbar';
import MessageInput from './MessageInput';
import MessagesList from './MessagesList';
import {History} from 'history';

const Container = styled.div `
  background: url(/assets/chat-background.jpg);
  display: flex;
  flex-flow: column;
  height: 100vh;
`;

// const getChatQuery = `
const getChatQuery = gql `
  query GetChat($chatId: ID!) {
    chat(chatId: $chatId) {
      id
      name
      picture
      messages {
        id
        content
        createdAt
      }
    }
  }
`;

interface ChatRoomScreenParams {
    chatId : string;
    history : History;
}
export interface ChatQueryMessage {
    id : string;
    content : string;
    createdAt : Date;
}
export interface ChatQueryResult {
    id : string;
    name : string;
    picture : string;
    messages : Array < ChatQueryMessage >;
}
type OptionalChatQueryResult = ChatQueryResult | null;

// const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({ chatId }) => { FC
// 대신 FunctionComponent 를 사용하라는데??

const ChatRoomScreen : React.FunctionComponent < ChatRoomScreenParams > = ({history, chatId}) => {
    // Note how we used the match.params.chatIdvariable to get the selected chat ID.
    // The matchprop is defined and provided to us by the <Route />component, since
    // it interfaces directly with the ChatRoomScreen apollo client 를 사용하지 않고 직접 했을
    // 때 const [chat, setChat] = useState<OptionalChatQueryResult>(null);
    // useMemo(async () => {   const body = await
    // fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {     method: 'POST',
    //  headers: {       'Content-Type': 'application/json',     },     body:
    // JSON.stringify({       query: getChatQuery,       variables: { chatId },
    // }),   });   const {     data: { chat },   } = await body.json();
    // setChat(chat); }, [chatId]); apollo client 활용
    const client = useApolloClient();
    const {data} = useQuery < any > (getChatQuery, {variables: {
            chatId
        }});
    const chat = data
        ?.chat;

    const onSendMessage = useCallback((content : string) => {
        if (!chat) 
            return null;
        const message = {
            id: (chat.messages.length + 10).toString(),
            createdAt: new Date(),
            content,
            __typename: 'Chat'
        };

        // apollo 사용하지 않고 react-hook 과 graphql 사용하여 손수 하면 이런 모습
        // setChat({   ...chat,
        // messages: chat.messages.concat(message), });
        
        // apollo 사용하면 이런 모습.
        client.writeQuery({
            query: getChatQuery,
            variables: {
                chatId
            },
            data: {
                chat: {
                    ...chat,
                    messages: chat
                        .messages
                        .concat(message)
                }
            }
        });

    }, [chat, chatId, client]);

    if (!chat) 
        return null;
    return (
        <Container>
            <ChatNavbar chat={chat} history={history}/> {chat.messages && <MessagesList messages={chat.messages}/>}
            {/* <MessageInput /> */}
            <MessageInput onSendMessage={onSendMessage}/>
        </Container>
    );
};
export default ChatRoomScreen;