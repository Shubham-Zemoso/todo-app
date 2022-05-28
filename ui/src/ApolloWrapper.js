import {
    ApolloClient,
    InMemoryCache,
    HttpLink,
    ApolloProvider
} from "@apollo/client"

import React, { useState, useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { setContext } from "@apollo/client/link/context"

const ApolloWrapper = ({children}) => {
    const { isAuthenticated, getAccessTokenSilently} = useAuth0()
    const [bearerToken, setBearerToken] = useState("")

    useEffect(() => {
        const getToken = async () => {
            const token = isAuthenticated? await getAccessTokenSilently() : ""
            setBearerToken(token);
        }

        getToken();
    }, [getAccessTokenSilently, isAuthenticated])
    
    const httpLink = new HttpLink({
        uri: "http://localhost:4000",
    })

    console.log("bearerToken", bearerToken)

    const authLink = setContext((request, { headers, ...rest }) => {
        if (!bearerToken) return { headers, ...rest };
    
        return {
          ...rest,
          headers: {
            ...headers,
            authorization: `Bearer: ${bearerToken}`,
          },
        };
      });

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink)
    })

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloWrapper;