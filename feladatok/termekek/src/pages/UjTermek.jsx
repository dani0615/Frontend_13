import { useNavigate } from 'react-router-dom';
import '../App.css'
export const UjTermek=()=> {
    const navigate = useNavigate();
  return (
    <div className="p-5 content bg-whitesmoke text-center">
        <h2>Új termék hozzáadása</h2>
        <form
         onSubmit={(event) => {
            event.persist();
            event.preventDefault();
        fetch('https://localhost:7242/api/Products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: event.target.name.value,
                price: event.target.price.value,
            }),
        })
        .then(() => {
            navigate("/");
        });
    }}>

            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Név: </label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" 
                    placeholder="Kérem írja be a nevét!" name="name" />
                </div>
            </div>
            <div className="form-group row pb-3">
                <label className="col-sm-3 col-form-label">Ár: </label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" 
                    placeholder="Kérem írja be a termék árát!" name="price" />
                </div>
            </div>
            <button type="submit" className="btn btn-success">Termék hozzáadása</button>
            <button type="reset" className="btn btn-warning ms-4">Űrlap törlése</button>
        </form>
    </div>
    )
}