import * as Relay from 'graphql-relay';
export declare class ConnectionArgs implements Relay.ConnectionArguments {
    after?: Relay.ConnectionCursor;
    before?: Relay.ConnectionCursor;
    first?: number;
    last?: number;
}
export declare function EdgeType<NodeType>(nodeName: string, nodeType: new (...args: any[]) => NodeType): (abstract new (...args: any[]) => Relay.Edge<NodeType>);
type ExtractNodeType<EdgeType> = EdgeType extends Relay.Edge<infer NodeType> ? NodeType : never;
export declare function ConnectionType<EdgeType extends Relay.Edge<NodeType>, NodeType = ExtractNodeType<EdgeType>>(nodeName: string, edgeClass: (new (...args: any[]) => EdgeType)): (abstract new (...args: any[]) => Relay.Connection<NodeType>);
export {};
