import React from 'react'
import CKEditor from '@ckeditor/ckeditor5-react'
import InlineEditor from '@ckeditor/ckeditor5-build-inline'

class Editor extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      data: ''
    };
  }
  onEditorChange = (event, editor) => {    
    this.setState({ data: editor.getData() });
    this.props.readData(editor.getData())
  }


  render() {    
    return (
      <CKEditor
        editor={InlineEditor}
        data={this.props.notepad.content}
        //type="inline"
        onChange={this.onEditorChange}
      />
    )
  }
}

export default Editor