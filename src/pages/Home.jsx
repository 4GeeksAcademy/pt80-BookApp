import { useState } from "react";
import { Link } from "react-router-dom";

import Container, {Row, Col} from "../components/Grid";
import BookCard from "../components/BookCard.jsx";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
  }
  
  const enableButton = () => [title, author, cover].some((x) => x);

  return (
    <Container>
      <Row>
        <Col>
          <form className="mt-3" onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              {/* This is a controlled input: */}
              <input
                id="title"
                name="title"
                className="form-control form-control-lg"
                type="text"
                aria-label="title"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
              />
              {/*
                Controlled inputs are great when you want immediate input
                into the application, but they can get a bit unwieldy if you
                have a lot of inputs that use them.
              */}
              <label htmlFor="title">Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="author"
                name="author"
                className="form-control form-control-lg"
                type="text"
                aria-label="author"
                value={author}
                onChange={(ev) => setAuthor(ev.target.value)}
              />
              <label htmlFor="author">Author</label>
            </div>
            <div className="form-floating mb-3">
              <input
                id="cover"
                name="cover"
                className="form-control form-control-lg"
                type="text"
                aria-label="cover"
                value={cover}
                onChange={(ev) => setCover(ev.target.value)}
              />
              <label htmlFor="cover">Cover URL</label>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" disabled={!enableButton()}>
                Add Book
              </button>
            </div>
          </form>
        </Col>
        <Col>
          <div className="mt-3">
            <BookCard
              book={{
                title,
                author,
                cover,
              }}
            />
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col width={{ sm: 8 }} offset={{ sm: 2 }}>
          {store.books.map((book) => (
            <div className="mb-3">
              <Link to={`/library/${book.id}`}>
                <h1>{book.title}</h1>
              </Link>
              <BookCard
                book={book}
                showButtons
                onDelete={() => deleteBook(book.id)}
                key={book.id}
              />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};
