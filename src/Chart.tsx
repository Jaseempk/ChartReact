import React, { useEffect, useState } from 'react';
import {Line} from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const ChartComponent = () => {
  const [chartData, setChartData] = useState({
    labels: ["Jan","Feb"],
    datasets: [{
      label: 'AAPL price chart',
      data: [10,20],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    }],
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => 1),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)', 
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => 2),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 262, 235, 0.5)',
      },
    ],
  };

 

  useEffect(() => {
    const fetchData = async () => {
      const response:any = await axios.get("https://api.stockdata.org/v1/data/eod?symbols=AAPL&api_token=bdOFhvzcDHMZiBo149nQJSTHnZtilEHLiF4b1Eod")
      
      const requiredData = response.data.data.slice(0,30)
      
      const labels = requiredData.map((item: any) => item.date.split("T")[0])
      const rates = requiredData.map((r: any) => r.close)

      console.log({labels, rates})

      const chartData = {
        labels: labels,
        datasets: [{
          label: 'AAPL Price History',
          data: rates,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1.5,
        }],
      };

      setChartData(chartData);  
    };

    fetchData();
  }, []);



  return (
    <Line options={options} data={chartData} height={356} width={652} />
  );
};

export default ChartComponent;
