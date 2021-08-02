import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'

const Editor = (props) => {
  const { onChange, value, name } = props
  return (
    <CKEditor
      editor={ClassicEditor}
      config={{
        toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList'],
        height: 800
      }}
      data={value}
      onChange={(event, editor) => {
        onChange({ target: { name, value: editor.getData() } })
      }}
    />
  )
}

export default Editor
