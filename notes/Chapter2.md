# Chapter 2
styling our application with Material-UI and styled-components - we will give it the desired look and make it more user friendly.

## Material-UI , styled-components
@material-ui/coreincludes core component of Material-UI such as Input, Popover, Modal, etc, and @material-ui/iconsincludes a set of icons. Material is very generic and has a built in theming system which can be controlled by simply setting few variables, which is exactly what we're gonna need in our app.

The easiest way to reference colors without repeating yourself is through Themes. Theme definition can easily be done in Material using the MuiThemeProvider component

In our app, we're also gonna use CSS directly to change its colors, therefore it would be handy to have these theme variables available to us through CSS. To do so, we will have a second definition of these variables in index.css, at the :root level of our application.

    :root {
    --primary-bg: #2c6157;
    --secondary-bg: #6fd056;
    --primary-text: white;
    --secondary-text: white;
    }

:rootis a pseudo element that simply represents the root node, which will make the colors available in all elements. Normally, it works like JavaScript's scoping system and it will make variables available only to the current node and to its children, NOT its parents. CSS vars can be used like so:

    color: var(--primary-text);
    background-color: var(--primary-bg);


Here's one way to style a button using styled-components:

    import styled, { css } from 'styled-components';

    const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid palevioletred;
    color: palevioletred;
    margin: 0.5em 1em;
    padding: 0.25em 1em;

    ${props => props.primary && css`
        background: palevioletred;
        color: white;
    `}

[1] styled is coming from the styled-componentslibrary. When we call styled.buttonthat means we are extending a button component from styled.
[2] prop 을 styled component 안에서 받아서 처리하는 방식. (항상 헷갈리더라)
Button will become a full React component with the extended styled we specified
Like a React component, we can send props into our component. And like a React function, we can write Javascript code that interact and respond to those props. In our case, just like a check we've done before in TSX to render something only if it exists, here only if we have a primaryproperty, we will add extra styles to our component. The created Button is actually a React.Component, so an instance of it can be created with ease like any other component:
[3] css is telling Styled components that the string literal that comes after describes CSS styles.

### Remember that styled-components operates per component, not globally.

