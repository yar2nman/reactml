/* eslint-disable @typescript-eslint/no-unused-vars */
import * as go from "gojs";
import React, { useState, useEffect } from "react";
import { ReactDiagram } from "gojs-react";
import "./genomchart.css";
import { GenogramLayout } from "./genogramLayout";



interface GenomDiagramProps {
    nodeDataArray: Array<go.ObjectData>;
    modelData: go.ObjectData;
    skipsDiagramUpdate: boolean;
    onDiagramEvent: (e: go.DiagramEvent) => void;
    onModelChange: (e: go.IncrementalData) => void;
}

export const GenomDiagram = (props: GenomDiagramProps) => {
    const {
        modelData,
        nodeDataArray,
        onDiagramEvent,
        onModelChange,
        skipsDiagramUpdate,
    } = props;

    const diagramRef: React.RefObject<any> = React.createRef();

    const attrFill = (a: any) => {
        switch (a) {
            case "A":
                return "#00af54"; // green
            case "B":
                return "#f27935"; // orange
            case "C":
                return "#d4071c"; // red
            case "D":
                return "#70bdc2"; // cyan
            case "E":
                return "#fcf384"; // gold
            case "F":
                return "#e69aaf"; // pink
            case "G":
                return "#08488f"; // blue
            case "H":
                return "#866310"; // brown
            case "I":
                return "#9270c2"; // purple
            case "J":
                return "#a3cf62"; // chartreuse
            case "K":
                return "#91a4c2"; // lightgray bluish
            case "L":
                return "#af70c2"; // magenta
            case "S":
                return "#d4071c"; // red
            default:
                return "transparent";
        }
    }
    const maleGeometry = (a: any) => {
        const tlsq = go.Geometry.parse("F M1 1 l19 0 0 19 -19 0z");
        const trsq = go.Geometry.parse("F M20 1 l19 0 0 19 -19 0z");
        const brsq = go.Geometry.parse("F M20 20 l19 0 0 19 -19 0z");
        const blsq = go.Geometry.parse("F M1 20 l19 0 0 19 -19 0z");
        const slash = go.Geometry.parse("F M38 0 L40 0 40 2 2 40 0 40 0 38z");
        switch (a) {
            case "A":
                return tlsq;
            case "B":
                return tlsq;
            case "C":
                return tlsq;
            case "D":
                return trsq;
            case "E":
                return trsq;
            case "F":
                return trsq;
            case "G":
                return brsq;
            case "H":
                return brsq;
            case "I":
                return brsq;
            case "J":
                return blsq;
            case "K":
                return blsq;
            case "L":
                return blsq;
            case "S":
                return slash;
            default:
                return tlsq;
        }
    }
    const femaleGeometry = (a: any) => {
        const slash = go.Geometry.parse("F M38 0 L40 0 40 2 2 40 0 40 0 38z");
        const tlarc = go.Geometry.parse("F M20 20 B 180 90 20 20 19 19 z");
        const trarc = go.Geometry.parse("F M20 20 B 270 90 20 20 19 19 z");
        const brarc = go.Geometry.parse("F M20 20 B 0 90 20 20 19 19 z");
        const blarc = go.Geometry.parse("F M20 20 B 90 90 20 20 19 19 z");
        switch (a) {
            case "A":
                return tlarc;
            case "B":
                return tlarc;
            case "C":
                return tlarc;
            case "D":
                return trarc;
            case "E":
                return trarc;
            case "F":
                return trarc;
            case "G":
                return brarc;
            case "H":
                return brarc;
            case "I":
                return brarc;
            case "J":
                return blarc;
            case "K":
                return blarc;
            case "L":
                return blarc;
            case "S":
                return slash;
            default:
                return tlarc;
        }
    }
    const findMarriage = (diagram: go.Diagram, a: number, b: number) => {  // A and B are node keys
        const nodeA = diagram.findNodeForKey(a);
        const nodeB = diagram.findNodeForKey(b);
        if (nodeA !== null && nodeB !== null) {
            const it = nodeA.findLinksBetween(nodeB);  // in either direction
            while (it.next()) {
                const link = it.value;
                // Link.data.category === "Marriage" means it's a marriage relationship
                if (link.data !== null && link.data.category === 'Marriage') return link;
            }
        }
        return null;
    }
    const setupMarriages = (diagram: go.Diagram) => {
        const model = diagram.model as go.GraphLinksModel;
        const nodeDataArray = model.nodeDataArray;
        for (let i = 0; i < nodeDataArray.length; i++) {
            const data = nodeDataArray[i];
            const key = data.key;
            if (data.ux !== undefined) {
                let uxs: Array<number> = [];
                if (typeof data.ux === 'number') uxs = [data.ux] as Array<number>;
                for (let j = 0; j < uxs.length; j++) {
                    const wife = uxs[j];
                    if (key === wife) {
                        // or warn no reflexive marriages
                        continue;
                    }
                    const link = findMarriage(diagram, key, wife);
                    if (link === null) {
                        // add a label node for the marriage link
                        const mlab: any = { s: 'LinkLabel' };
                        model.addNodeData(mlab);
                        // add the marriage link itself, also referring to the label node
                        const mdata = { from: key, to: wife, labelKeys: [mlab.key], category: 'Marriage' };
                        model.addLinkData(mdata);
                    }
                }
            }
            if (data.vir !== undefined) {
                const virs: Array<number> = (typeof data.vir === 'number') ? [data.vir] : data.vir as Array<number>;
                for (let j = 0; j < virs.length; j++) {
                    const husband = virs[j];
                    if (key === husband) {
                        // or warn no reflexive marriages
                        continue;
                    }
                    const link = findMarriage(diagram, key, husband);
                    if (link === null) {
                        // add a label node for the marriage link
                        const mlab: any = { s: 'LinkLabel' };
                        model.addNodeData(mlab);
                        // add the marriage link itself, also referring to the label node
                        const mdata = { from: key, to: husband, labelKeys: [mlab.key], category: 'Marriage' };
                        model.addLinkData(mdata);
                    }
                }
            }
        }
    }
    const setupParents = (diagram: go.Diagram) => {
        const model = diagram.model as go.GraphLinksModel;
        const nodeDataArray = model.nodeDataArray;
        for (let i = 0; i < nodeDataArray.length; i++) {
            const data = nodeDataArray[i];
            const key = data.key;
            const mother = data.m;
            const father = data.f;
            if (mother !== undefined && father !== undefined) {
                const link = findMarriage(diagram, mother, father);
                if (link === null) {
                    // or warn no known mother or no known father or no known marriage between them
                    if (window.console) window.console.log('unknown marriage: ' + mother + ' & ' + father);
                    continue;
                }
                const mdata = link.data;
                const mlabkey = mdata.labelKeys[0];
                const cdata = { from: mlabkey, to: key };
                model.addLinkData(cdata);
            }
        }
    }

    const setupDiagram = (diagram: any, array: any, focusId: any) => {
        diagram.model =
            go.GraphObject.make(go.GraphLinksModel,
                { // declare support for link label nodes
                    linkLabelKeysProperty: "labelKeys",
                    // this property determines which template is used
                    nodeCategoryProperty: "s",
                    // create all of the nodes for people
                    nodeDataArray: array
                });
        setupMarriages(diagram);
        setupParents(diagram);

        var node = diagram.findNodeForKey(focusId);
        if (node !== null) {
            diagram.select(node);
            // remove any spouse for the person under focus:
            //node.linksConnected.each(function(l) {
            //  if (!l.isLabeledLink) return;
            //  l.opacity = 0;
            //  var spouse = l.getOtherNode(node);
            //  spouse.opacity = 0;
            //  spouse.pickable = false;
            //});
        }
    }


    const initDiagram = () => {
        const $ = go.GraphObject.make;
        const diagram = $(go.Diagram, {
            "undoManager.isEnabled": true,
            initialAutoScale: go.Diagram.Uniform,
            // when a node is selected, draw a big yellow circle behind it
            nodeSelectionAdornmentTemplate: $(
                go.Adornment,
                "Auto",
                { layerName: "Grid" }, // the predefined layer that is behind everything else
                $(go.Shape, "Circle", { fill: "yellow", stroke: null }),
                $(go.Placeholder)
            ),
            // use a custom layout, defined below
            layout: $(GenogramLayout as any, {
                direction: 90,
                layerSpacing: 30,
                columnSpacing: 10,
            }),
        });
        diagram.nodeTemplateMap.add(
            "M", // male
            $(
                go.Node,
                "Vertical",
                { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
                $(
                    go.Panel,
                    { name: "ICON" },
                    $(go.Shape, "Square", {
                        width: 40,
                        height: 40,
                        strokeWidth: 2,
                        fill: "white",
                        portId: "",
                    }),
                    $(
                        go.Panel,
                        {
                            // for each attribute show a Shape at a particular place in the overall square
                            itemTemplate: $(
                                go.Panel,
                                $(
                                    go.Shape,
                                    { stroke: null, strokeWidth: 0 },
                                    new go.Binding("fill", "", attrFill),
                                    new go.Binding("geometry", "", maleGeometry)
                                )
                            ),
                            margin: 1,
                        },
                        new go.Binding("itemArray", "a")
                    )
                ),
                $(
                    go.TextBlock,
                    { textAlign: "center", maxSize: new go.Size(80, NaN) },
                    new go.Binding("text", "n")
                )
            )
        );
        diagram.nodeTemplateMap.add(
            "F", // female
            $(
                go.Node,
                "Vertical",
                { locationSpot: go.Spot.Center, locationObjectName: "ICON" },
                $(
                    go.Panel,
                    { name: "ICON" },
                    $(go.Shape, "Circle", {
                        width: 40,
                        height: 40,
                        strokeWidth: 2,
                        fill: "white",
                        portId: "",
                    }),
                    $(
                        go.Panel,
                        {
                            // for each attribute show a Shape at a particular place in the overall circle
                            itemTemplate: $(
                                go.Panel,
                                $(
                                    go.Shape,
                                    { stroke: null, strokeWidth: 0 },
                                    new go.Binding("fill", "", attrFill),
                                    new go.Binding("geometry", "", femaleGeometry)
                                )
                            ),
                            margin: 1,
                        },
                        new go.Binding("itemArray", "a")
                    )
                ),
                $(
                    go.TextBlock,
                    { textAlign: "center", maxSize: new go.Size(80, NaN) },
                    new go.Binding("text", "n")
                )
            )
        );
        // the representation of each label node -- nothing shows on a Marriage Link
        diagram.nodeTemplateMap.add(
            "LinkLabel",
            $(go.Node, {
                selectable: true,
                width: 1,
                height: 1,
                fromEndSegmentLength: 20,
            })
        );
        diagram.linkTemplate = $( // for parent-child relationships
            go.Link,
            {
                routing: go.Link.Orthogonal,
                curviness: 15,
                layerName: "Background",
                selectable: true,
                fromSpot: go.Spot.Bottom,
                toSpot: go.Spot.Top,
            },
            $(go.Shape, { strokeWidth: 3, stroke: "#555" })
        );
        diagram.linkTemplateMap.add(
            "Marriage", // for marriage relationships
            $(
                go.Link,
                { selectable: true },
                $(go.Shape, { strokeWidth: 3, stroke: "blue" })
            )
        );
        setupDiagram(diagram, nodeDataArray, null);
        diagram.addDiagramListener('ChangedSelection', onDiagramEvent);



        return diagram;
    };

    const handleModelChange = (changes: any) => {
        console.log(changes);
    }

    return (
        <ReactDiagram
            ref={diagramRef}
            divClassName='diagram-component'
            initDiagram={initDiagram}
            nodeDataArray={nodeDataArray}
            modelData={modelData}
            onModelChange={onModelChange}
            skipsDiagramUpdate={skipsDiagramUpdate} />
    )
};
