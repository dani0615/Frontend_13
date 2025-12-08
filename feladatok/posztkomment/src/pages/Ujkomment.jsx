export const ujKomment=()=> {
    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új komment hozzáadása</h2>
            <form onSubmit={(event) => {
                event.persist();
                event.preventDefault();
                fetch('https://harmadik.sulla.hu/Comment', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: event.target.name.value,
                        email: event.target.email.value,
                        body: event.target.body.value, 
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => console.log(data));
            }}>
                <div className="form-group row pb-3" >
                    <label className="col-sm-3 col-form-label">Név: </label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" placeholder="Név" name="name" required />
                    </div>

                    <div className="form-group row pb-3" >
                        <label className="col-sm-3 col-form-label">E-mail: </label>
                        <div className="col-sm-9">
                            <input type="text" className="form-control" placeholder="email" name="email" required />
                        </div>
                    </div>

                    <div className="form-group row pb-3" >
                        <label className="col-sm-3 col-form-label">Szöveg: </label> 
                        <div className="col-sm-9">
                            <textarea className="form-control" name="body" required /> 
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}