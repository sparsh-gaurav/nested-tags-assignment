import type { TreeNode, ParentNode, Path } from "./types";
import { hasChildren } from "./types";

export function updateAtPath(
    node: TreeNode,
    path: Path,
    updater : (n : TreeNode) => TreeNode
): TreeNode {
    if (path.length === 0) return updater(node);
    const[idx,...rest] =path;
    if(hasChildren(node)){
        const children = node.children.map((c,i) => 
            i=== idx ? updateAtPath(c,rest,updater) : c
    );
    return { ...node, children};
    }
    const promoted :ParentNode ={name:node.name, children:[]};
    return updateAtPath(promoted, path, updater);
}

export function clean(node:TreeNode):TreeNode{
    if( hasChildren(node)) {
        return {
            name:node.name,
            children:node.children.map(clean),
        }
    }
    return {name:node.name, data:node.data};
}

