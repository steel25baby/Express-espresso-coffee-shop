import { useEffect, useState } from 'react';

function ViewMenu() {
  const [coffee, setCoffee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCoffee, setEditCoffee] = useState(null);
  const apiurl = "http://localhost:5000"; 

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const response = await fetch(`${apiurl}/api/coffee/`);
        const data = await response.json();
        if (data.success) {
          setCoffee(data.coffee);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCoffee();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${apiurl}/api/coffee/${id}`, { method: "DELETE" });
      const data = await response.json();
      if (response.ok) {
        setCoffee(coffee.filter((current) => current.id !== id));
        alert("Coffee deleted successfully");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiurl}/api/coffee/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCoffee),
      });
      const data = await response.json();
      if (data.success) {
        setCoffee(
          coffee.map((current) =>
            current.id === id ? { ...current, ...editCoffee } : current
          )
        );
        setEditCoffee(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <h1>Current Menu</h1>
        <div>
          {coffee.map((current) => (
            <div key={current.id}>
              <div>
                <h1>{current.variety}</h1>
                <p>{current.ingredients}</p>
                <h4>{current.price}</h4>
                <p>{current.description}</p>
                <img src={current.imgurl} alt="" />
              </div>
              <div>
                <button onClick={() => handleDelete(current.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        {editCoffee && (
          <div>
            <h2>Edit Coffee</h2>
            <form onSubmit={(e) => handleUpdate(e, editCoffee.id)}>
              <input
                type="text"
                name="variety"
                value={editCoffee.variety}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, variety: e.target.value })
                }
              />
              <input
                type="text"
                name="ingredients"
                value={editCoffee.ingredients}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, ingredients: e.target.value })
                }
              />
              <input
                type="number"
                name="price"
                value={editCoffee.price}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, price: e.target.value })
                }
              />
              <input
                type="text"
                name="description"
                value={editCoffee.description}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, description: e.target.value })
                }
              />
              <input
                type="text"
                name="imgurl"
                value={editCoffee.imgurl}
                onChange={(e) =>
                  setEditCoffee({ ...editCoffee, imgurl: e.target.value })
                }
              />
              <button type="submit">Update</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewMenu;
