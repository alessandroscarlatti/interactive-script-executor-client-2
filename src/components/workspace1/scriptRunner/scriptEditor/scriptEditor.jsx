import React from 'react'
import MonacoEditor from 'react-monaco-editor'

export default class ScriptEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          code: '// type your code...',
        }

        this.options = {
            selectOnLineNumbers: true
        };
      }

    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();
    }

    render() {
        return (
            <MonacoEditor
              language="javascript"
              theme="vs-dark"
              value={this.state.code}
              options={this.options}
              editorDidMount={this.editorDidMount}
              className="editor"
            />
        )
    }
}

