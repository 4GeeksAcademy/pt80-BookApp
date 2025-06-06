import { useParams } from "react-router-dom";
import Container, { Row, Col } from "../components/Grid";

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import BookCard from "../components/BookCard";

const BookPage = () => {
  const { book_id } = useParams();
  const { store } = useGlobalReducer();

  const getBook = () => {
    return store.books.find((book) => book.id == book_id)
  }

  return (
    <Container>
      <Row>
        <Col>
          <BookCard book={getBook()} />
        </Col>
      </Row>
    </Container>
  );
};

export default BookPage;
