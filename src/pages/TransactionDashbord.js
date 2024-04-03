import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Spinner from '../components/Spinner'
import SelectMonthDropdown from './SelectMonthDropdown';
import './TransactionDashboard.css';


function TransactionDashboard() {
  const [loading, setLoading] = useState(false)
  const [, setNewsItems] = useState([])
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [transactionsPerPage] = useState(10);

  const getData = async () => {
    setLoading(true)
    try {
      const result = await axios.get('https://mernback-tghi.onrender.com/api/transactions')
      setLoading(false)
      setNewsItems(result.data)
      console.log(result.data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const selectedDate = new Date(selectedMonth + ' 1, 2022'); // Assume year is 2022 for simplicity
        const formattedDate = selectedDate.toISOString().split('T')[0];
        
        const response = await axios.get(`https://mernback-tghi.onrender.com/api/transactions?month=${formattedDate}`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }

        setTransactions(response.data.transactions);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
  
      }
    };

    fetchTransactions();
    getData()
  },[selectedMonth, currentPage,transactionsPerPage])

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset current page when searching
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Logic for searching transactions
  const filteredTransactions = transactions.filter(transaction =>
    transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(transaction.price).toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Logic for pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  
  return (
    <Layout>
      {loading && <Spinner />}
      <div className='dashboard-container' style={{ textAlign: 'center' }}>
      <h1 className='dashboard-header'>Transaction Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <input className='search-input'
          type="text"
          placeholder=" Search transactions...."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e)}
        />
        <SelectMonthDropdown selectedMonth={selectedMonth} handleMonthChange={handleMonthChange} />
      </div>
      <table className=' bg-white' style={{ margin: '10px auto' }}>
        {/* Table header */}
        <thead>
          <tr>
            <th>Title</th>
            <th>ID</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {currentTransactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.title}</td>
              <td>{transaction.id}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{transaction.category}</td>
              <td>{transaction.sold ? 'Yes' : 'No'}</td>
              <td><img src={transaction.image} alt={transaction.title} style={{ width: '50px', height: '50px' }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      </div>
      {/* Pagination */}
      <div>
      <div className='prevnext'>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>

    </div>
    </Layout>
  )
}

export default TransactionDashboard
