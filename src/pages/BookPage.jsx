import { useParams } from "react-router-dom";
import Container, { Row, Col } from "../components/Grid";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { EditableText, EditableNumber } from "../components/EditableText.jsx";
import { useEffect, useState } from "react";
import Button, { ButtonGroup } from "../components/Button.jsx";

const BookPage = () => {
  const { book_id } = useParams();
  const { store, dispatch } = useGlobalReducer();

  const [book, setBook] = useState({});

  useEffect(() => {
    setBook(store.books.find((book) => book?.id == book_id));
  }, [store.books]);

  const submitField = (key, value) => {
    let newBook = book;
    newBook[key] = value;
    setBook(newBook);
  };

  const postBook = async () => {
    const resp = await fetch(
      `https://library.dotlag.space/library/${book?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }
    );
    const data = await resp.json();
    dispatch({
      type: "edit_book",
      book: data,
    });
  }

  return (
    <div className="my-3">
      <Container>
        <Row>
          <Col>
            <img src={book?.cover} alt="" />
          </Col>
          <Col>
            <h1>
              <EditableText
                value={book?.title}
                onSubmit={(val) => submitField("title", val)}
              />
            </h1>
            <h2>
              <EditableText
                value={book?.author}
                onSubmit={(val) => submitField("author", val)}
              />
            </h2>
            <h3>Details:</h3>
            <p>
              Published:{" "}
              <EditableNumber
                value={book?.year_published}
                onSubmit={(val) => submitField("year_published", val)}
              />
            </p>
            <p>
              <EditableNumber
                value={book?.num_pages}
                onSubmit={(val) => submitField("num_pages", val)}
              />{" "}
              pages
            </p>
            <p>
              ISBN-10:{" "}
              <EditableText
                value={book?.isbn10}
                onSubmit={(val) => submitField("isbn10", val)}
              />
            </p>
            <p>
              ISBN-13:{" "}
              <EditableText
                value={book?.isbn13}
                onSubmit={(val) => submitField("isbn13", val)}
              />
            </p>
            <div className="d-flex w-100 justify-content-center my-3">
              <ButtonGroup>
                <Button
                  label="Submit"
                  onClick={postBook}
                />
                <Button
                  label="Cancel"
                  variant="danger"
                  onClick={() => {
                    setBook(store.books.find((book) => book?.id == book_id));
                  }}
                />
              </ButtonGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BookPage;
