import { findDOMNode } from "react-dom";

export function findNode(ref: any) {
  let node = ref && (ref.current || ref);

  if (node && (node as any).getNode && (node as any).getNode())
    node = (node as any).getNode();

  if (node && (node as any)._touchableNode) node = (node as any)._touchableNode;

  if (node && (node as any)._node) node = (node as any)._node;

  if (node) node = findDOMNode(node);

  return node;
}
