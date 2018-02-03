import React from 'react'
import ScriptEditor from './scriptEditor/scriptEditor'
require('./scriptRunner.scss')

export default class ScriptRunner extends React.Component {
    render() {
        return (
            <div className="height100">
                <TitleBar title="Script Runner" />
                <div className="editorWrapper">
                <ScriptEditor />
                </div>
            </div>
        )
    }
}

class TitleBar extends React.Component {
    render() {
        return (
            <div className="iseTitleBar titleBarActive paneDragHandle">{this.props.title}</div>
        )
    }
}