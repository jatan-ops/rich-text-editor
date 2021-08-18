import { db } from './firebase';
import { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import firebase from 'firebase';
import './styles.css';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }],
    [('bold', 'italic', 'underline', 'strike', 'blockquote')],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image', 'video'],
    ['code-block']
  ]
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block'
];

export default function App() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [posts, setPosts] = useState([]);

  function onTitleChange(e) {
    setTitle(e.target.value);
  }

  function onBodyChange(e) {
    setBody(e);
  }

  function onHandleSubmit(e) {
    e.preventDefault();
    setTitle('');
    setBody('');

    db.collection('posts').add({
      title: title,
      body: body,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  useEffect(() => {
    db.collection('posts')
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((post) => {
            return post;
          })
        );
      });
  }, []);

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <div className="form-group">
          <input
            style={{
              width: '90%',
              height: '5vh',
              fontSize: '18px',
              margin: '10px'
            }}
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            onChange={onTitleChange}
            className="form-control"
          />
        </div>
        <div
          className="form-group"
          style={{
            height: '25vh'
          }}
        >
          <ReactQuill
            style={{
              width: '90%',
              height: '20vh',
              fontSize: '18px',
              margin: '10px'
            }}
            modules={modules}
            formats={formats}
            value={body}
            placeholder="Body"
            onChange={onBodyChange}
          />
        </div>
        <button
          style={{
            margin: '10px'
          }}
        >
          Post
        </button>
      </form>
      {posts.map((post) => {
        return (
          <div
            style={{
              borderTop: 'solid 1px black'
            }}
          >
            <code>New post: </code>
            <h2>{post.data().title}</h2>
            <p>{renderHTML(post.data().body)}</p>
          </div>
        );
      })}
    </div>
  );
}
