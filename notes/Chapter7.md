# Chapter7
Caching with Apollo-Client

### packages(1)
GraphQL 이 제공하는 cache 기능을 쉽게 활용할 수 있도록 해주는 apollo client 패키지들!

[1] apollo-client : Apollo-Client's core package, as we explained earlier.
[2] apollo-cache-inmemory :  The data store that will be used to cache the results.
[3] apollo-link-http : Get GraphQL results over a network using HTTP fetch.

### packages(2)
물론, apollo-client 만 있어도 좋지만, 더 편하게 react 와 연동하기 위해서 필요한 패키지들!(특히, apollo 와 react hooks를 함께 사용하는)

[1] @apollo/react-hooks
With @apollo/react-hookswe can use the useQuery()hook to fetch data from our GraphQL API.
[2] graphql-tag
The graphql-tagpackage is used to parse the GraphQL string to an AST, something which is required when using Apollo Client.

### AST ( Abstract Syntax Tree )
a tree representation of the abstract syntactic structure of source code written in a programming language. 
The syntax is "abstract" in the sense that it does not represent every detail appearing in the real syntax, but rather just the structural or content-related details

### not using useMemo() anymore
Note that we removed the usage of useMemo()- because Apollo has an internal cache mechanism, there's <b> no need to memoize the result anymore. </b> We also used the writeQuery()method to edit the stored result in the cache, so in the next render phase we would have an updated chat with the newly added message.

### apollo-link-mock
Since we don't use the Fetch API anymore, we will also need to update our tests. Right now we mock the response from the fetch API, but a more appropriate way would be creating a fake Apollo Client where we will be able to mock the results. For that we will install a package called apollo-link-mock:
테스트 코드를 짜기 위해!
(response 를 직접 임의로 생성하여 테스트 하는 방식보다 더 좋은 방법을 쓰자는 취지)



