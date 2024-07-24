import React, { useEffect, useState } from 'react';

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiurl = "http://localhost:5000"; 

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${apiurl}/api/customers/customers/`);
        const data = await response.json();

        if (data.success === true) {
          setCustomers(data.customers);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div>
        <h1>Customers</h1>
        <div>
          {customers.map((current) => (
            <div key={current.id}>
              <div>
                <h2>{current.firstName}</h2>
                <h2>{current.lastName}</h2>
                <h3>{current.username}</h3>
                <h4>{current.email}</h4>
              </div>
              <div>
                <button>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminCustomers;
