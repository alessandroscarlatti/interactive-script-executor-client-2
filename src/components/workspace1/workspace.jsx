import React from 'react'
import ReactGridLayout from 'react-grid-layout'
import ScriptRunner from './scriptRunner/scriptRunner'
import Project from './project/project'
require('./workspace.scss')
require('react-grid-layout/css/styles.css')
require('react-resizable/css/styles.css')

export default class Workspace extends React.Component {

    constructor() {
        super()

        this.onResizeStop = () => {
            console.log("stopped resize")
        }
    }

    render() {

        let layout = [
            {i: 'a', x: 0, y: 0, w: 12, h: 12, minW: 2},
            {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2},
            {i: 'c', x: 4, y: 0, w: 1, h: 2, minW: 2}
        ];
        
        return (
            <ReactGridLayout className="layout" 
            layout={layout} 
            cols={12} 
            rowHeight={30} 
            width={window.innerWidth}
            draggableHandle=".paneDragHandle"
            verticalCompact={false}
            compactType={null}
            onResizeStop={this.onResizeStop}
            >
                <div key="a" className="isePane"><ScriptRunner /></div>
                <div key="b" className="isePane"><Project /></div>
            </ReactGridLayout>
        )
    }
}