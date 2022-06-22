import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
       const {data} = await axios.get('https://62987937f2decf5bb74365d0.mockapi.io/items/' + id);
       setPizza(data)
      } catch (err) {
        alert('Pizza not found');
        navigate('/');
      }
    }
    fetchPizza();
  }, [])

  if (!pizza) {
    return <p>Loading...</p>
  }

  return (
    <div className='container full-page__container'>
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} $</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Come back</span>
        </button>
      </Link>
    </div>
  )
}

export default FullPizza