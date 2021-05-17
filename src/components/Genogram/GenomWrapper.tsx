/* eslint-disable @typescript-eslint/no-unused-vars */
import * as go from "gojs";
import React, { useState } from "react";
import "./genomchart.css";
import { SelectedInfo } from "./SelectedInfo";
import { GenomDiagram } from './GenomDiagram'

interface GenomWrapperProps {
  nodeDataArray?: Array<go.ObjectData>;
  modelData?: go.ObjectData;
  selectedKey?: number | null;
  skipsDiagramUpdate?: boolean;
}
export const GenomWrapper = (props: GenomWrapperProps) => {
  const [modelData, setModelData] = useState(props.modelData || {
    canRelink: true,
  });
  const [selectedKey, setSelectedKey] = useState<number | any>(null);
  const [selectedData, setSelectedData] = useState({} as any);
  const [skipsDiagramUpdate, setSkipsDiagramUpdate] = useState(false);
  const [selctionObject, setSelctionObject] = useState<any>(null)
  const [nodeDataArray, setNodeDataArray] = useState(props.nodeDataArray as [] ||
    [
      { key: 0, n: "Aaron", s: "M", m: -10, f: -11, ux: 1, a: ["C", "F", "K"] },
      { key: 1, n: "Alice", s: "F", m: -12, f: -13, a: ["B", "H", "K"] },
      { key: 2, n: "Bob", s: "M", m: 1, f: 0, ux: 3, a: ["C", "H", "L"] },
      { key: 3, n: "Barbara", s: "F", a: ["C"] },
      { key: 4, n: "Bill", s: "M", m: 1, f: 0, ux: 5, a: ["E", "H"] },
      { key: 5, n: "Brooke", s: "F", a: ["B", "H", "L"] },
      { key: 6, n: "Claire", s: "F", m: 1, f: 0, a: ["C"] },
      { key: 7, n: "Carol", s: "F", m: 1, f: 0, a: ["C", "I"] },
      { key: 8, n: "Chloe", s: "F", m: 1, f: 0, vir: 9, a: ["E"] },
      { key: 9, n: "Chris", s: "M", a: ["B", "H"] },
      { key: 10, n: "Ellie", s: "F", m: 3, f: 2, a: ["E", "G"] },
      { key: 11, n: "Dan", s: "M", m: 3, f: 2, a: ["B", "J"] },
      { key: 12, n: "Elizabeth", s: "F", vir: 13, a: ["J"] },
      { key: 13, n: "David", s: "M", m: 5, f: 4, a: ["B", "H"] },
      { key: 14, n: "Emma", s: "F", m: 5, f: 4, a: ["E", "G"] },
      { key: 15, n: "Evan", s: "M", m: 8, f: 9, a: ["F", "H"] },
      { key: 16, n: "Ethan", s: "M", m: 8, f: 9, a: ["D", "K", "S"] },
      { key: 17, n: "Eve", s: "F", vir: 16, a: ["B", "F", "L", "S"] },
      { key: 18, n: "Emily", s: "F", m: 8, f: 9 },
      { key: 19, n: "Fred", s: "M", m: 17, f: 16, a: ["B"] },
      { key: 20, n: "Faith", s: "F", m: 17, f: 16, a: ["L"] },
      { key: 21, n: "Felicia", s: "F", m: 12, f: 13, a: ["H"] },
      { key: 22, n: "Frank", s: "M", m: 12, f: 13, a: ["B", "H"] },

      // "Aaron"'s ancestors
      {
        key: -10,
        n: "Paternal Grandfather",
        s: "M",
        m: -33,
        f: -32,
        ux: -11,
        a: ["A"],
      },
      { key: -11, n: "Paternal Grandmother", s: "F", a: ["E"] },
      { key: -32, n: "Paternal Great", s: "M", ux: -33, a: ["F", "H"] },
      { key: -33, n: "Paternal Great", s: "F" },
      { key: -40, n: "Great Uncle", s: "M", m: -33, f: -32, a: ["F", "H"] },
      { key: -41, n: "Great Aunt", s: "F", m: -33, f: -32, a: ["B", "I"] },
      { key: -20, n: "Uncle", s: "M", m: -11, f: -10, a: ["A"] },

      // "Alice"'s ancestors
      { key: -12, n: "Maternal Grandfather", s: "M", ux: -13, a: ["D", "L"] },
      { key: -13, n: "Maternal Grandmother", s: "F", m: -31, f: -30, a: ["H"] },
      { key: -21, n: "Aunt", s: "F", m: -13, f: -12, a: ["C", "I"] },
      { key: -22, n: "uncle", s: "M", ux: -21 },
      { key: -23, n: "cousin", s: "M", m: -21, f: -22 },
      { key: -30, n: "Maternal Great", s: "M", ux: -31, a: ["D", "J"] },
      {
        key: -31,
        n: "Maternal Great",
        s: "F",
        m: -50,
        f: -51,
        a: ["B", "H", "L"],
      },
      { key: -42, n: "Great Uncle", s: "M", m: -30, f: -31, a: ["C", "J"] },
      { key: -43, n: "Great Aunt", s: "F", m: -30, f: -31, a: ["E", "G"] },
      { key: -50, n: "Maternal Great Great", s: "F", ux: -51, a: ["D", "I"] },
      { key: -51, n: "Maternal Great Great", s: "M", a: ["B", "H"] },
    ]
  );

  const handleDiagramEvent = (e: go.DiagramEvent) => {
    const name = e.name;
    switch (name) {
      case "ChangedSelection": {
        const sel = e.subject.first();
        if (sel) {
          setSelectedData(sel.data);
          setSelectedKey(sel.key);
          setSelctionObject(sel);
        } else {
          setSelectedData(null as any);
          setSelectedKey(null);
          setSelctionObject(null)
        }
        break;
      }
      default:
        break;
    }
  };

  /**
   * Handle GoJS model changes, which output an object of data changes via Model.toIncrementalData.
   * This method should iterates over those changes and update state to keep in sync with the GoJS model.
   * This can be done via setState in React or another preferred state management method.
   * @param obj a JSON-formatted string
   */
  // const handleModelChange = (obj: go.IncrementalData) => {
  //   const insertedNodeKeys = obj.insertedNodeKeys;
  //   const modifiedNodeData = obj.modifiedNodeData;
  //   const removedNodeKeys = obj.removedNodeKeys;
  //   const insertedLinkKeys = obj.insertedLinkKeys;
  //   const modifiedLinkData = obj.modifiedLinkData;
  //   const removedLinkKeys = obj.removedLinkKeys;
  //   const modifiedModelData = obj.modelData;
  // };

  function handleModelChange(changes: any) {
    // alert(`GoJS model changed! ${changes}` );
    setNodeDataArray(changes);
  }
  const handleRelinkChange = (e: any) => {
    const target = e.target;
    const value = target.checked;
    setModelData({ canRelink: value });
    setSkipsDiagramUpdate(target.checked);
  };
  return (
    <div>
      <GenomDiagram
        nodeDataArray={nodeDataArray}
        // linkDataArray={.linkDataArray}
        modelData={modelData}
        skipsDiagramUpdate={skipsDiagramUpdate}
        onDiagramEvent={handleDiagramEvent}
        onModelChange={() => handleModelChange}
      />
      {/* <label>
        Allow Relinking?
        <input
          type="checkbox"
          id="relink"
          checked={modelData.canRelink}
          onChange={handleRelinkChange}
        />
      </label> */}
      {selectedData && 
        <div>
            <SelectedInfo data={selectedData} />
        </div>
      }

      {selctionObject?.fromNode?.data && 
      <div>
        <label>Connection Selected</label>
          <label>From</label>
        <SelectedInfo data={selctionObject?.fromNode?.data} />
          <label htmlFor="">To</label>
        <SelectedInfo data={selctionObject?.toNode?.data} />
        <br/>
      </div> }
    </div>
  );
};
