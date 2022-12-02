import api from '../js/http.js';

const formDOM = document.querySelector("form")
const getFormValue = (e) => {
  e.preventDefault();
  const obj = {
    "name": e.target[0].value,
    "author": e.target[1].value,
    "publish": e.target[2].value,
    "publishDate": e.target[3].value,
    "rate": e.target[4].value,
    "imgUrl": e.target[5].value,
    "tag": [
      e.target[6].value
    ],
    "ISBN": e.target[7].value,
    "language": e.target[8].value,
    "recommend": [

    ],
    "introduction": editor.getData()
  };
  console.log(obj);
  const url = `${api.url}books`
  console.log(obj);
  axios.post(url, obj)
}
formDOM.addEventListener('submit', getFormValue);

// 文字編輯器
function CustomizationPlugin(editor) {

}

ClassicEditor
  .create(document.querySelector('#editor'), {
    extraPlugins: [CustomizationPlugin]
  })
  .then(newEditor => {
    window.editor = newEditor;
    // The following line adds CKEditor 5 inspector.
    CKEditorInspector.attach(newEditor, {
      isCollapsed: true
    });
  })
  .catch(error => {
    console.error(error);
  });

