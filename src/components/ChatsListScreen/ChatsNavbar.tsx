import React from 'react';
import {Toolbar} from '@material-ui/core';
import styled from 'styled-components';

// const ChatsNavbar: React.FC = () => <div>Whatsapp Clone</div>; const
// ChatsNavbar: React.FC = () => <Toolbar>Whatsapp Clone</Toolbar>;

// index.css 에서 :root 로 지정한 --primary-bg 등을 이렇게 사용하는군.
const Container = styled(Toolbar)`
  background-color: var(--primary-bg);
  color: var(--primary-text);
  font-size: 20px;
  line-height: 40px;
`;

const ChatsNavbar : React.FC = () => <Container>Whatsapp Clone</Container>;

export default ChatsNavbar;