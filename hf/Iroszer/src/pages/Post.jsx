import { useNavigate } from 'react-router-dom';
import '../App.css';

export const Post = () => {
  const navigate = useNavigate();

  return (
    <div className="p-5 content bg-whitesmoke text-center">
      <h2>Új írószer hozzáadása</h2>
      <form
        onSubmit={(event) => {
          event.persist();
          event.preventDefault();
          fetch('https://iroszer.sulla.hu/items', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: event.target.id.value,
              name: event.target.name.value,
              price: parseInt(event.target.price.value),
            }),
          }).then(() => {
            navigate('/');
          });
        }}
      >
        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">ID: </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="Kérem írja be az ID-t!"
              name="id"
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Név: </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="Kérem írja be a nevet!"
              name="name"
            />
          </div>
        </div>

        <div className="form-group row pb-3">
          <label className="col-sm-3 col-form-label">Ár: </label>
          <div className="col-sm-9">
            <input
              type="number"
              className="form-control"
              placeholder="Kérem írja be az árat!"
              name="price"
            />
          </div>
        </div>

        <button type="submit" className="btn btn-success">
          Írószer hozzáadása
        </button>
        <button type="reset" className="btn btn-warning ms-4">
          Űrlap törlése
        </button>
      </form>
    </div>
  );
};

