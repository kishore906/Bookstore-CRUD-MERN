import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ShowModal from "./ShowModal";
import { useSnackbar } from "notistack";

function Home() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bookId, setBookId] = useState("");

  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setShowModal(false);
    setBookId("");
  };
  const handleShow = (id) => {
    setShowModal(true);
    setBookId(id);
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3001/books")
      .then((res) => {
        //console.log(res);
        setBooks(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  // this statement is to find the specific book to pass into Modal
  const book = bookId ? books.find((book) => book._id === bookId) : null;

  function handleDelete(id) {
    const isConfirm = window.confirm(
      "Are you sure you want to delete the book?"
    );

    if (isConfirm) {
      axios
        .delete(`http://localhost:3001/books/${id}`)
        .then((res) => {
          console.log(res);
          //alert(res.data.message);
          //enqueueSnackbar("Book Deleted Successfully", { variant: "success" });
          window.location.reload();
        })
        .catch((err) => {
          enqueueSnackbar(`${err.message}`, { variant: "error" });
          console.log(err);
        });
    }
  }

  return (
    <div>
      <div className="text-center">
        <h3 className="m-5">Books List</h3>
        <Link to="/addBook" className="btn btn-success">
          📔 Add New Book
        </Link>
      </div>

      <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 my-5">
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          books.map((book) => {
            return (
              <div
                className="w-25 border border-secondary rounded p-4 lh-lg"
                key={book._id}
              >
                <h6>📖 {book.title}</h6>
                <h6>👤 {book.author}</h6>
                <p>
                  📢 <i>Published in: </i>
                  {book.publishYear}
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <span onClick={() => handleShow(book._id)}>ℹ️</span>
                  <Link
                    to={`/editBook/${book._id}`}
                    className="text-decoration-none"
                  >
                    📝
                  </Link>
                  <span onClick={() => handleDelete(book._id)}>🗑️</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showModal && (
        <ShowModal
          bookInfo={book}
          handleClose={handleClose}
          showModal={showModal}
        />
      )}
    </div>
  );
}

export default Home;
