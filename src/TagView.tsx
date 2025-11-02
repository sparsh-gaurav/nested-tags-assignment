import { useState } from "react";
import type { TreeNode, Path, DataNode, ParentNode } from "./types.ts";
import { hasChildren, hasData } from "./types.ts";

type Props = {
    node : TreeNode;
    path: Path;
    onChange : (path:Path, updater:(n :TreeNode) => TreeNode) => void;
    isRoot?: boolean;
};

export const TagView  = ({node, path, onChange,isRoot=false } :Props) => {
    const [collapsed,setCollapsed] = useState<boolean>(false);
    const  [ editingName, setEditingname] = useState<boolean>(false);
    const [nameDraft, setNameDraft] = useState<string> (node.name);

    const toggle = () => setCollapsed( (c)=> !c);

    const commitName =() => {
        const trimmed = nameDraft.trim();
        if (trimmed && trimmed !== node.name) {
            onChange(path, (n) => ({...n,name: trimmed} as TreeNode ));
        }
        setEditingname(false);
    }

    const handleDataChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        onChange(path , (n) => ({name :n.name, data: value}as DataNode));
    }
    const addChild = () => {
        onChange(path, (n) => {
            if (hasChildren(n)) {
                const child : DataNode = {name: "New Child", data: "Data"};
                return {...n , children :[...n.children, child]} as ParentNode;
            }
            return {
                name: n.name,
                children: [{name: "New Child", data: "Data"}]
            } as ParentNode;
        });
        setCollapsed(false);
    };

    return (
        <div className={`tag ${isRoot ? "root" : ""}`}>
            <div className="tagHeader">
                <button className="toggleBtm" onClick={toggle}>
                    {collapsed ? ">" : "V" }
                </button>

                { editingName ? (
                    <input 
                    className="nameInput"
                    autoFocus
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    onBlur={commitName}
                    onKeyDown={(e) => e.key === "Enter" && commitName()}
                    />
                    ) : (
                    <div 
                    className="name"
                    role="button"
                    onClick={() => setEditingname(true)}
                    title="Click to remove"
                    >
                        {node.name}
                    </div>
                    ) }
                <button className="addBtn" onClick={addChild}>
                    Add Child
                </button>
            </div>
            {
                !collapsed && (
                    <div className="tagBody" >
                        {hasData(node) && (
                            <label className="datarow">
                                <span>Data</span>
                                <input className="dataInput" value={node.data} onChange={handleDataChange} />
                            </label>
                        )}
                        {
                            hasChildren(node) && 
                            node.children.map((child, i) => (
                                <TagView 
                                key={i}
                                node={child}
                                path={[...path, i]}
                                onChange={onChange}
                                />
                            ))}
                        </div>
                ) }
        </div>
    );
}