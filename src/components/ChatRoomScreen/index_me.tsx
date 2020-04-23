// import React from 'react';
// import {defaultDataIdFromObject} from 'apollo-cache-inmemory';
// import gql from 'graphql-tag';
// // import { useMemo, useState } from 'react'; import { useCallback, useMemo,
// // useState } from 'react';
// import {useCallback} from 'react';
// // import {useApolloClient, useQuery} from '@apollo/react-hooks';
// import {useQuery, useMutation} from '@apollo/react-hooks';
// import styled from 'styled-components';
// import ChatNavbar from './ChatNavbar';
// import MessageInput from './MessageInput';
// import MessagesList from './MessagesList';
// import {History} from 'history';
// import * as queries from '../../graphql/queries';
// import * as fragments from '../../graphql/fragments';

// const Container = styled.div `
//   background: url(/assets/chat-background.jpg);
//   display: flex;
//   flex-flow: column;
//   height: 100vh;
// `;

// // const getChatQuery = `
// const getChatQuery = gql `
//   query GetChat($chatId: ID!) {
//     chat(chatId: $chatId) {
//     #   id
//     #   name
//     #   picture
//     #   messages {
//     #     id
//     #     content
//     #     createdAt
//     #   }
//     # fragment 사용!
//     ...FullChat
//     }
//   }
//   ${fragments.fullChat}
// `;

// const addMessageMutation = gql `
//   mutation AddMessage($chatId: ID!, $content: String!) {
//     addMessage(chatId: $chatId, content: $content) {
//     #   id
//     #   content
//     #   createdAt
//     ...Message
//     }
//   }
//   ${fragments.message}
// `;

// interface ChatRoomScreenParams {
//     chatId : string;
//     history : History;
// }
// export interface ChatQueryMessage {
//     id : string;
//     content : string;
//     createdAt : Date;
// }
// export interface ChatQueryResult {
//     id : string;
//     name : string;
//     picture : string;
//     messages : Array < ChatQueryMessage >;
// }
// type OptionalChatQueryResult = ChatQueryResult | null;

// interface ChatsResult {
//     chats : any[];
// }

// // const ChatRoomScreen: React.FC<ChatRoomScreenParams> = ({ chatId }) => { FC
// // 대신 FunctionComponent 를 사용하라는데??

// const ChatRoomScreen : React.FunctionComponent < ChatRoomScreenParams > = ({history, chatId}) => {
//     // Note how we used the match.params.chatIdvariable to get the selected chat ID.
//     // The matchprop is defined and provided to us by the <Route />component, since
//     // it interfaces directly with the ChatRoomScreen apollo client 를 사용하지 않고 직접 했을
//     // 때 const [chat, setChat] = useState<OptionalChatQueryResult>(null);
//     // useMemo(async () => {   const body = await
//     // fetch(`${process.env.REACT_APP_SERVER_URL}/graphql`, {     method: 'POST',
//     // headers: {       'Content-Type': 'application/json',     },     body:
//     // JSON.stringify({       query: getChatQuery,       variables: { chatId }, }),
//     // });   const {     data: { chat },   } = await body.json(); setChat(chat); },
//     // [chatId]); apollo client 활용 const client = useApolloClient();

//     const {data} = useQuery < any > (getChatQuery, {variables: {
//             chatId
//         }});
//     const chat = data
//         ?.chat;
//     const [addMessage] = useMutation(addMessageMutation);

//     const onSendMessage = useCallback((content : string) => {

//         // if (!chat) return null; const message = {     id: (chat.messages.length +
//         // 10).toString(),     createdAt: new Date(),     content,     __typename:
//         // 'Chat' }; // apollo 사용하지 않고 react-hook 과 graphql 사용하여 손수 하면 이런 모습 //
//         // setChat({   ...chat, // messages: chat.messages.concat(message), }); //
//         // apollo 사용하면 이런 모습. client.writeQuery({     query: getChatQuery, variables: {
//         //       chatId     },     data: {         chat: { ...chat, messages: chat
//         //           .messages .concat(message)         }     } });

//         addMessage({
//             variables: {
//                 chatId,
//                 content
//             },
//             optimisticResponse: {
//                 __typename: 'Mutation',
//                 addMessage: {
//                     __typename: 'Message',
//                     id: Math
//                         .random()
//                         .toString(36)
//                         .substr(2, 9),
//                     createdAt: new Date(),
//                     content
//                 }
//             },
//             update: (client, {data}) => {
//                 if (data && data.addMessage) {
//                     // client.writeQuery({     query: getChatQuery,     variables: {         chatId
//                     //    },     data: {         chat: {             ...chat,             messages:
//                     // chat                 .messages                 .concat(data.addMessage)
//                     //   }     } });

//                     type FullChat = {
//                         [key : string]: any
//                     };
//                     let fullChat;
//                     const chatIdFromStore = defaultDataIdFromObject(chat);
//                     if (chatIdFromStore === null) {
//                         return;
//                     }
//                     try {
//                         fullChat = client.readFragment < FullChat > ({id: chatIdFromStore, fragment: fragments.fullChat, fragmentName: 'FullChat'});
//                     } catch (e) {
//                         return;
//                     }
//                     if (fullChat === null || fullChat.messages === null || data === null || data.addMessage === null || data.addMessage.id === null) {
//                         return;
//                     }
//                     if (fullChat.messages.some((currentMessage : any) => currentMessage.id === data.addMessage.id)) {
//                         return;
//                     }
//                     fullChat
//                         .messages
//                         .push(data.addMessage);
//                     fullChat.lastMessage = data.addMessage;
//                     client.writeFragment({id: chatIdFromStore, fragment: fragments.fullChat, fragmentName: 'FullChat', data: fullChat});

//                     let clientChatsData;
//                     try {
//                       clientChatsData = client.readQuery<ChatsResult>({
//                         query: queries.chats,
//                       });
//                     } catch (e) {
//                       return;
//                     }
//                     if (!clientChatsData || clientChatsData === null) {
//                       return null;
//                     }
//                     if (!clientChatsData.chats || clientChatsData.chats === undefined) {
//                       return null;
//                     }
//                     const chats = clientChatsData.chats;
//                     const chatIndex = chats.findIndex((currentChat: any) => currentChat.id === chatId);
//                     if (chatIndex === -1) return;
//                     const chatWhereAdded = chats[chatIndex];
//                     // The chat will appear at the top of the ChatsList component
//                     chats.splice(chatIndex, 1);
//                     chats.unshift(chatWhereAdded);                    

//                     client.writeQuery({
//                         query: queries.chats,
//                         data: { chats: chats },
//                       });                    
//             }
//         },
//     }, [chat, chatId, addMessage]);

//     if (!chat) 
//         return null;
    
//     return (
//         <Container>
//             <ChatNavbar chat={chat} history={history}/> {chat.messages && <MessagesList messages={chat.messages}/>}
//             {/* <MessageInput /> */}
//             <MessageInput onSendMessage={onSendMessage}/>
//         </Container>
//     );
// };
// export default ChatRoomScreen;