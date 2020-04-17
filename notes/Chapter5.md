# Chapter 5
Testing!

# Jest
a testing framework which was developed by Facebook. What's good about Jest is that it can be used to test both client and server logic, because it runs as a Node.JS application, but it also emulates the browser environment whenever we run it, thanks to JSDOM.

Jest API is vast but pretty intuitive for the most part. It mostly consists of test descriptors and matchers.

# 3 kinds of tests
[1] Unit tests - which are used to test a single component, independently from other components in our system.
[2] Integration tests - which are used to test a component in relation to other components in our systems (how well do they co-work with each other).
[3] e2e tests (end to end) - which are used to test a complete process, from the moment I clicked on a button in the user interface until the data gets back from the server and shown on the screen.

## balance
we will need to find a good balance where we don’t spend too much time on writing tests yet have a good indicator for how well our system functions. So we should write a lot of unit tests, a good amount of integration tests and a handful of e2e tests.

### testing example _ ChatsList component
Since the HTML of the component is a dynamic thing and is constantly subject to changes, it would be a good idea to annotate it with <b>data-testid</b> attributes so it can be tested regardless of its structure

The test should follow these steps:

[1] Mock the response to contain a fake chat, so we won't need to make an actual call to our GraphQL API.
[2] We will create a new instance of <ChatsList />and render it in a container element.
[3] We will wait for changes in the DOM caused by setState().
[4] We will test the contents of the container.

### some packages
[1]The jest-fetch-mock package can mock responses emitted by the Fetch API.
[2] The @testing-library/jest-dom package will add custom matchers that will help us examine HTML contents of DOM elements.
[3] The @testing-library/react package contains utility methods that will help us test React.Components with Jest.