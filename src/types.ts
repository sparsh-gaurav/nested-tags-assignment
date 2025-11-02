
export type DataNode = {
    name : string;
    data:string;
}

export type ParentNode = {
    name: string;
    children : TreeNode[];
}



export type TreeNode = DataNode | ParentNode;

export type Path = number[];

export const hasChildren  = (n: TreeNode):n is ParentNode =>
    "children" in n && Array.isArray((n).children)

export const hasData = (n:TreeNode) :n is DataNode =>
    "data" in n && typeof (n).data === "string" &&!("children" in n)