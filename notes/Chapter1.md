# Chapter 1
create-react-app 을 --typescript 옵션으로 실행하여 생성되는 프로젝트 안에 들어있는 파일들에 대한 설명. 대부분 아는 내용이지만 다시 읽고 갑니다.

## manifest
Another file in the public folder is the manifest.json file that gives browsers information about our app in case the users will install the app permanently on their mobile phones or desktop apps. You can read more about it here: https://developers.google.com/web/fundamentals/web-app-manifest/.

## tsconfig
Some noticeable configuration options for that file are:

[1] target- What kind of Javascript should the compilers output? in our case es5is the version of Javascript that is supported by many browsers. If you know that your app would run only on newer browsers or a Node environment, you can change that value to a newer version and gain performance improvements.
[2] lib- If you are using new syntax from Javascript, the compiler can add to it's output libraries that would help you support the new syntax even if the browsers don't know those.
[3] strict- We can give Typescript a lot of information or not so much. The more we give it the more it can help us. adding the strict option will make the compiler warn us when we won't give it enough information.

## testing
We are programmers, that means that many times our job is to take something manual and making it automatic. That's why we should also strive to automate things we do ourselves. Type checking is one area, testing is another. If we can automate tests and run them all the time, it can save us a lot of time and bring us a lot of confidence that when we change our code, we haven't destroyed anything.
* 그러게, 이렇게 테스트를 자동화 하는 방법에 대해 알아보는 것에 많은 시간을 할애하지 않아왔음.

## Pin dependencies and save-exact
There is no need to upgrade your dependencies at all. If they work it's ok. But, it is highly recommended. Packages keep improving all the time with important things that would help your app and will save you time. If you make it a routine to upgrade it makes it much easier then to upgrade every couple of months. In order to discover if there are new versions of libraries there are 2 options.

One is to manually run a check every day or so to find new packages out there. You can do that by going to your command line in the root folder of the project and type yarn outdated.

But if you want to get notified when there is a new version of your dependencies, you can check out Renovate. If your project is hosted somewhere, for example Github, it will analyze your package.jsonand submit a new PR when a new release happened from one of your dependencies.

### Prettier
Remember to run yarn formatbefore you commit your changes!

### key value
By telling React how to identify and distinguish each element using the key value we help solve that problem and also making React faster. Read <a href = 'https://reactjs.org/docs/lists-and-keys.html'>here</a> for more in depth explanation.
*faster??!
=> Keys
Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity:

### ts
    <div>{chat.lastMessage.content}</div>
    <div>{chat.lastMessage.createdAt}</div>
You can see we get a Typescript error. This is because Typescript is smart enough and tells us there might be no last message. So we add a check. Remember to always check for null or undefined if optional, don’t write shorter write safer:

