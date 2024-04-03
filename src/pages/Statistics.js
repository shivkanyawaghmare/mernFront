import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import axios from 'axios'
import Spinner from '../components/Spinner' 
import './TransactionDashboard.css';

function Statistics() {
  const [loading] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('March'); // Initialize selected month state, bydefault march is selected
  const [totalSaleAmount, setTotalSaleAmount] = useState(0); // Initialize state variables for statistics
  const [totalSoldItems, setTotalSoldItems] = useState(0);
  const [totalNotSoldItems, setTotalNotSoldItems] = useState(0);
  
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        // Convert selected month string into date format
        const selectedDate = new Date(selectedMonth + ' 1, 2022'); // Assume year is 2022 for simplicity
        const formattedDate = selectedDate.toISOString().split('T')[0];

        const response = await axios.get(`https://mernback-tghi.onrender.com/api/statistics?month=${formattedDate}`);
        setTotalSaleAmount(response.data.totalSaleAmount);
        setTotalSoldItems(response.data.totalSoldItems);
        setTotalNotSoldItems(response.data.totalNotSoldItems);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, [selectedMonth]); // Fetch statistics data whenever selectedMonth changes



  return (
    <Layout>
      {loading && <Spinner />}
      <h1 className='dashboard-header'>Transaction Statistics</h1>
      <div className="px-5 pt-5">
      <div className='statistic select-month search-input' >
        <label >Select Month:</label>
        <select value={selectedMonth} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div className='stdata'>
        <div className='stdata2'>
        <p>Total Sale Amount: {totalSaleAmount}</p>
        <p>Total Sold Items: {totalSoldItems}</p>
        <p>Total Not Sold Items: {totalNotSoldItems}</p>
        </div>
      </div>
      </div>
    </Layout>
  )
}


export default Statistics
