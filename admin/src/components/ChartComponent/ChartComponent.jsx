import React from 'react'
import { Bar, Doughnut } from 'react-chartjs-2';
// Must register the necessary components from chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
 ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartComponent = () => {
  
   const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)',
        hoverBorderColor: 'rgba(75, 192, 192, 1)',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    plugins: {
        title: {
            display: true,
            text: 'Monthly Sales Data'
        }
    },
    responsive: true,
  };

  return (
    <div style={{ width: '500px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Bar Chart</h2>
      <Bar data={data} options={options} />
    </div>
  )
}

export default ChartComponent