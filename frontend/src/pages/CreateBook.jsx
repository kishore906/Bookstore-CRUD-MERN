import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    axios
      .post("http://localhost:3001/books", { title, author, publishYear })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        setTitle("");
        setAuthor("");
        setPublishYear("");
        enqueueSnackbar("Book Created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setIsSubmitting(false);
        console.log(err);
        enqueueSnackbar(`${err.message}`, { variant: "error" });
      });
  }

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div className="w-25 border border-success rounded p-4">
        <h4 className="m-3 text-center">Add New Book</h4>

        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <label htmlFor="title">
              <b>Title</b>
            </label>
            <input
              type="text"
              id="title"
              className="form-control"
              placeholder="Enter Title Of The Book.."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="author">
              <b>Author</b>
            </label>
            <input
              type="text"
              id="author"
              className="form-control"
              placeholder="Enter Author Of The Book.."
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <div className="my-4">
            <label htmlFor="publishYear">
              <b>PublishYear</b>
            </label>
            <input
              type="text"
              id="publishYear"
              className="form-control"
              placeholder="Enter PublishYear Of The Book.."
              value={publishYear}
              onChange={(e) => setPublishYear(Number(e.target.value))}
              required
            />
          </div>

          <button className="btn btn-success">
            {isSubmitting ? "Submitting" : "Add Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
