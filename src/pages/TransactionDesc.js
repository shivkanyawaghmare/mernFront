import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Spinner from '../components/Spinner';
import './TransactionDashboard.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

function TransactionDesc() {
  const [loading, setLoading] = useState(false);
  const [transItem, setTransItem] = useState(null);
  const { id } = useParams();
  const [error, setError] = useState('');




  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`https://mernback-tghi.onrender.com/api/gettransaction/${id}`);
        setTransItem(result.data.transaction);
        setError('');
      } catch (error) {
        console.log(error);
        setError('Transaction not found');
        setTransItem(null);
      }
      setLoading(false);
    };
    getData();
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : transItem ? (
        <div className="container mx-auto py-8" >
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-4">
            <h2 className=" dashboard-header" >Transaction Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-1" style={{display:'flex',margin:'auto'}}>
                <div style={{width:'400px',height:'550px',justifyContent:'center',fontSize:'20px',margin:'10px',marginTop:"50px" }}>
                  <div>
                    <p className="font-bold">Id:</p>
                    <p>{transItem.id}</p>
                  </div>
                  <div>
                    <p className="font-bold">Title:</p>
                    <p>{transItem.title}</p>
                  </div>
                  <div>
                    <p className="font-bold">Description:</p>
                    <p>{transItem.description}</p>
                  </div>
                  <div>
                    <p className="font-bold">Price:</p>
                    <p>{transItem.price}</p>
                  </div>
                  <div>
                    <p className="font-bold">Category:</p>
                    <p>{transItem.category}</p>
                  </div>
                  <div>
                    <p className="font-bold">Sold:</p>
                    <p>{transItem.sold ? 'Yes' : 'No'}</p>
                  </div>
                  <div>
                    <p className="font-bold">DateOfSale:</p>
                    <p>{transItem.dateOfSale}</p>
                  </div>
                </div>
                <div className="md:col-span-1 flex justify-center items-center" style={{width:'400px',height:'550px',margin:'10px',marginTop:'0'}}>
                  <img src={transItem.image} alt="Transaction" className="md:w-auto md:h-auto" style={{height:'350px',width:'250px',marginTop:"10px"}} />
                </div>
              </div>

              </div>
            </div>
          </div>
      ) : (
        <div>{error}</div>
      )}
    </Layout>
  );
}

export default TransactionDesc;
