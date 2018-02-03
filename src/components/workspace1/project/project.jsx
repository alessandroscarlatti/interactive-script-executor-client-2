import React from "react";
require('../scriptRunner/scriptRunner.scss')

export default class Canvas extends React.Component {
    render() {
        return (
            <div>
                <TitleBar title="Project" />
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