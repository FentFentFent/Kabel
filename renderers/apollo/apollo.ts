
import ApolloRenderer from "./renderer"
import ApolloConstants from "./constants"
import Representer from "../representer"
import { RepresenterNode } from "../representer-node"

export interface apolloType {
    Renderer: typeof ApolloRenderer;
    Constants: typeof ApolloConstants;
    Representer: typeof Representer;
    RepresenterNode: typeof RepresenterNode;
}


export {
    ApolloRenderer as Renderer,
    ApolloConstants as Constants,
    // Despite apollo not extending these, we still need to re-export them for the API.
    Representer,
    RepresenterNode
}