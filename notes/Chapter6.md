# Chapter 6
Creating an app router and implementing a chat room

react-router-dom 과 react hook 을 이용하여 routing 을 구현하고
jest 를 이용하여 테스트 코드를 작성하는 모범적이라고 생각되는 챕터이다!
(useMemo, useCallback 처럼 작동 방식이나 특징을 제대로 모르는 친구들 잘 살펴보자.)

## Purpose of a router
to make route managing easy and declarative. It will take care of managing the history within our app and parameterize certain screens according to our need. Essentially it's a wrap around the window.historyobject which is also compatible with React.

### History (window.history)
https://developer.mozilla.org/en-US/docs/Web/API/History
The History interface allows manipulation of the browser session history, that is the pages visited in the tab or frame that the current page is loaded in.

### RouteComponentProps in react-router-dom

    <Route
        exact
        path="/chats/:chatId"
        component={({match} : RouteComponentProps < {
        chatId: string
    } >) => (<ChatRoomScreen chatId={match.params.chatId}/>)}/>

### match.params given by react-router-dom (<Router/>)
    const ChatRoomScreen: React.FunctionComponent<ChatRoomScreenParams> = ({ chatId }) => { ~~

Note how we used the match.params.chatIdvariable to get the selected chat ID. The matchprop is defined and provided to us by the <Route />component, since it interfaces directly with the ChatRoomScreen.

In many examples online, you can see people pass the match prop directly to the component. The main issue with that is that this makes the component being usable only by a router, but the truth is that the component doesn't care if it's consumed by a router or another parents component as long as they will pass the chatId prop.

So we need to make sure the interface of the ChatRoom component defines those requierements right.

## onclick event bind 하는 새로운 방법
    //(1) 선언
    const navToChat = useCallback((chat) => {
            history.push(`chats/${chat.id}`);
        }, [history]);

    // (2) 사용
    <StyledListItem
        key={chat.id}
        data-testid="chat"
        button
        onClick={navToChat.bind(null, chat)}>   

### test 코드 안에서 container variable 을 기다린다?

    const { container, getByTestId } = render(
        <ChatsList history={history} />
      );

    await waitFor(() => container);
    
    fireEvent.click(getByTestId('chat'));
    await waitFor(() =>
    expect(history.location.pathname).toEqual('/chats/1')
    );
    
component 가 mount 될 때 까지 기다렸다가 동작을 한다는 의미인듯!

### transition package
    yarn add react-router-transition

    // src/react-app-env.d.ts 에다가
    declare module 'react-router-transition';
    // 이거 한 줄 더해준다.

Using this package, we will create a custom Switchcomponent that will play an animation for all its subordinate Routecomponents. The animation is defined by the user using a component called AnimatedSwitchas specified in the package's docs page.

### styled-component 에서 프로젝트 public 폴더 내 파일 참조하기
    const Container = styled.div`
    background: url(/assets/chat-background.jpg);
    display: flex;
    flex-flow: column;
    height: 100vh;
    `;

## test routing (react-router-dom) with history package

Since the new components have a direct control over the app's history, we should also find a way to simulate it in our tests. Because react-dom-router uses the history package under the hood, that means that we can use that package to inject a custom history object directly into the tested components

### test 코드 작성하는 순서
(1) <~~>.text.tsx
파일에 테스트 내용을 작성하고
(2) <~~>.tsx
파일 내에서 테스트 대상이 되는 element 에
'data-testid' 라는 field 를 부여한다.
물론 해당 필드에 입력되는 값은 test 파일에서 사용된 값.
getByTestId('~~'); 를 사용



    
