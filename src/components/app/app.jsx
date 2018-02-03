import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'
import Workspace1 from '../workspace1/workspace'
import Workspace2 from '../workspace2'

export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Router>
                <div className="appWrapper">
                <Route path="/workspace1" component={Workspace1} />
                <Route path="/workspace2" component={Workspace2} />
                </div>
            </Router>
        )
    }
}