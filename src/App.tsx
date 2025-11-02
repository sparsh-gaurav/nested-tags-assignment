// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useMemo, useState} from "react";
import { TagView } from "./TagView";
import type { TreeNode, ParentNode } from "./types";
import { clean , updateAtPath } from "./utils";
import "./index.css"

const initialTree : ParentNode = {
  name : "root",
  children:[
    {
      name: "child1",
      children: [
        {name:"child1-child1" , data : "c1-c1 hello" },
         {name:"child2-chils2",  data : "c2-c2 JS"},
      ],
    },
    {
      name :"child2" , data: "c2 world"
    },
  ],
};

export default function App() {
  const [tree, setTree] = useState<TreeNode>(initialTree);
  const applyAtPath = (path:number[], updater: (n:TreeNode) => TreeNode) => 
    setTree((curr)=> updateAtPath(curr, path, updater));

  const [exportValue, setExportValue] = useState<string>();


  return (
    <div className="app">
      <div className="panel">
        <TagView node={tree} path={[]} onChange={applyAtPath} isRoot />
        <div className="toolbar">
          <button 
          className="exportBtn"
          onClick={() => {
            setExportValue(JSON.stringify(clean(tree), null, 2));
          }}
          title="Also Printed To Console"
          >
            Export
          </button>
        </div>
        <pre className="exportBox" >
          {exportValue}
        </pre>
      </div>
    </div>
  )
}