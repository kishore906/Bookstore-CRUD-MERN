import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://localhost:3001/books/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    axios
      .put(`http://localhost:3001/books/${id}`, { title, author, publishYear })
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        setTitle("");
        setAuthor("");
        setPublishYear("");
        enqueueSnackbar("Book Updated Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setIsSubmitting(false);
        enqueueSnackbar(`${err.message}`, { variant: "error" });
        console.log(err);
      });
  }

  if (isLoading)
    return <h4 className="text-center m-5">Loading Book Data..</h4>;

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div className="w-25 border border-success rounded p-4">
        <h4 className="m-3 text-center">Update Book</h4>

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
            {isSubmitting ? "Updating" : "Update Book"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
