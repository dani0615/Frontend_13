import { useNavigate } from "react-router-dom";

export const UjPizza = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px' }}>
            <h2>Új pizza</h2>
            <form
                onSubmit={(event) => {
                    event.persist();
                    event.preventDefault();
                    fetch('https://pizza.sulla.hu/pizza', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: event.target.name.value,
                            image_url: event.target.kepurl.value,
                        }),
                    })
                    .then(() => {
                        navigate('/pizzak');
                    });
                }}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Pizza név:</label><br />
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        style={{ width: '300px', padding: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Kép link:</label><br />
                    <input 
                        type="url" 
                        name="kepurl" 
                        required 
                        placeholder="https://example.com/kep.jpg"
                        style={{ width: '300px', padding: '5px' }}
                    />
                </div>
                <button type="submit" style={{ padding: '10px 20px', marginRight: '10px' }}>
                    Küldés
                </button>
                <button type="reset" style={{ padding: '10px 20px' }}>
                    Töröl
                </button>
            </form>
        </div>
    );
}
