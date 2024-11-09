import { Link } from 'react-router-dom'
import {getDocs, collection, deleteDoc, doc, onSnapshot, updateDoc} from 'firebase/firestore';
import {db} from '../firebase/config'
import { useEffect,useState } from 'react';
import DeleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit-icon.svg'

// styles
import './Home.css'

export default function Home() {

  const [articles, setArticles] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    const ref = collection(db, 'articles');

    onSnapshot(ref, (snapshot)=>{
        console.log(snapshot);
        let results = []
         snapshot.docs.forEach(doc => {
           results.push({id: doc.id, ...doc.data()});
         });
        setArticles(results);
      })

    getDocs(ref)
      .then((snapshot)=>{
        let results = []
        console.log(snapshot)
        snapshot.docs.forEach(doc => {
          results.push({id: doc.id, ...doc.data()});
        });
        setArticles(results);
      })    
  },[])

  const handleUpdate = async (id) => {
    if (newTitle && newAuthor && newDescription) {
      const ref = doc(db, 'articles', id);
      try {
        await updateDoc(ref, {
          title: newTitle,
          author: newAuthor,
          description: newDescription
        });
        console.log('Article updated!');
        setEditingArticle(null);  // Hide the edit form
        setNewTitle('');
        setNewAuthor('');
        setNewDescription('');
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      alert('Title and Author are required!');
    }
  };

  const startEditing = (article) => {
    setEditingArticle(article.id);
    setNewTitle(article.title);
    setNewAuthor(article.author);
    setNewDescription(article.description);
  };

  
  const handleDelete = async (id) => {
    const ref = doc(db, 'articles', id)
      //loading = true
    deleteDoc(ref).then(
        //loading false;
    );
  }

  return (
    <div className="home">
      <h2>Articles</h2>
      {articles &&
        articles.map((article) => (
          <div key={article.id} className="card">
            <h3>{article.title}</h3>
            <p>Written by {article.author}</p>
            <Link to={`/articles/${article.id}`}>Read More...</Link>
            <img
              className="icon"
              onClick={() => handleDelete(article.id)}
              src={DeleteIcon}
              alt="delete icon"
            />
            <img
              className="icon"
              onClick={() => startEditing(article)}
              src={EditIcon}
              alt="edit icon"
            />
          </div>
        ))}

      {editingArticle && (
        <div className="card">
          <h3>Edit Article</h3>
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <button onClick={() => handleUpdate(editingArticle)}>Save Changes</button>
          <button onClick={() => setEditingArticle(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}