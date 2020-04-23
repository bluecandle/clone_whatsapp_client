import React from 'react';
import {
    BrowserRouter, Route, Redirect,
    // Switch,
    RouteComponentProps
} from 'react-router-dom';
import ChatRoomScreen from './components/ChatRoomScreen/index_me';
import ChatsListScreen from './components/ChatsListScreen';
import AnimatedSwitch from './components/AnimatedSwitch';

//match.params 라는건 Route component 에 의해 부여되는거.
function App() {
    return (
        <BrowserRouter>
            <AnimatedSwitch>
                <Route exact path="/chats" component={ChatsListScreen}/>
                <Route
                    exact
                    path="/chats/:chatId"
                    component={({match, history} : RouteComponentProps < {
                    chatId: string
                } >) => (<ChatRoomScreen chatId={match.params.chatId} history={history}/>)}/>
            </AnimatedSwitch>
            <Route exact path="/" render={redirectToChats}/>
        </BrowserRouter>
    );
}

const redirectToChats = () => <Redirect to="/chats"/>;

export default App;
