import React, {useState, useRef, useEffect} from 'react';
import '../Dashboard.css';
import Chart from 'chart.js/auto';
import axios from 'axios'
const ctx = document.getElementById('myChart');
const ctx1 = document.getElementById('myChart1');

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartRef1 = useRef(null);

  const cardStyle = {
    width: '20%',
    color : 'black',
    marginTop : '20px',
    borderRadius : '10px',
    marginLeft : '50px',
    height : '180px',
    padding : '10px 10px 10px 20px'
  };


  useEffect(() => {

   const data = {
    labels: ["Associative", "Oridinary"],
    datasets: [{
      label: ["Types of Membership"],
      data: [20, 40],
      backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
      borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
      borderWidth: 3,
      barThickness: 55  ,
      maxBarThickness: 100000,
      minBarLength: 4,
   }], 
};

   const data1 = {
    labels: ["R & D", "Testing Evaluation", "Electrical"],
    datasets: [{
      label: "Service using",
      data: [20, 40, 13],
      backgroundColor: ['yellow', 'aqua', 'pink'],
      hoverOffset: 6,
      borderWidth: 4,
   }], 
};

const options = {
  responsive: true,
  maintainAspectRatio: false, 
  scales: {
    x: {
      beginAtZero: true,
      title: {
        display : true,
        text : 'Types of Membership'
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Number of Members', 
      },
    },
  },
  plugins: {
    title: {
      display: true,
      text: 'Associate Vs Oridanary', 
    },
    datalabels: {
      anchor: 'end',
      align: 'top',
      formatter: function (value, context) {
        return value; 
      },
    }
  },
};
const options1 = {
  plugins: {
    legend: true,
    outlabels: {
      text: (context) => {
        const dataValue = data1.datasets[0].data[context.dataIndex];
        return `${context.label}: ${dataValue} (${((dataValue / data1.datasets[0].data.reduce((acc, val) => acc + val, 0)) * 100).toFixed(2)}%)`;
      },
      color: 'white', // Change this to the desired color
      stretch: 35,
      font: {
        resizable: true,
        color: 'black', // You can also change this color
        minSize: 12,
        maxSize: 18,
      },
    },
  },
};


if (chartRef.current) {
  const ctx = chartRef.current.getContext('2d');
  new Chart(ctx, {
    type: 'bar', 
    data: data,
    options: options,
  });

 
} 

if (chartRef1.current) {
  const ctx1 = chartRef1.current.getContext('2d');
  new Chart(ctx1, {
    type: 'doughnut', 
    data: data1,
    options: options1,

  });

 
} 

}, []);




  return (
    <>
    <div style={{ display: 'flex', flexWrap: 'wrap',marginLeft : '100px' }}>
        <article className="card" style={{ ...cardStyle, backgroundColor: '#fff7cc' }}>
        <div style={{ display: 'flex', justifyContent: 'center',fontSize : '22px',alignItems: 'center',fontWeight :'bold',marginRight:'5px' }}>Total Membership</div>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '10px',fontSize : '62px',color :'#0F3C69'}}>
          5
        </p>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </article>
      <article className="card" style={{ ...cardStyle, backgroundColor: '#ffe7d9' }}>
        <div style={{ display: 'flex', justifyContent: 'center',fontSize : '22px',alignItems: 'center',fontWeight :'bold',marginRight:'5px' }}>Total Membership</div>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '10px',fontSize : '62px',color :'#0F3C69'}}>
          5
        </p>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </article>
      <article className="card" style={{ ...cardStyle, backgroundColor: '#d0f2fe' }}>
      <div style={{ display: 'flex', justifyContent: 'center',fontSize : '22px',alignItems: 'center',fontWeight :'bold',marginRight:'5px' }}>Total Membership</div>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '10px',fontSize : '62px',color :'#0F3C69'}}>
          5
        </p>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </article>
      <article className="card" style={{ ...cardStyle, backgroundColor: '#d1e9fc' }}>
      <div style={{ display: 'flex', justifyContent: 'center',fontSize : '22px',alignItems: 'center',fontWeight :'bold',marginRight:'5px' }}>Total Membership</div>
        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' ,marginTop: '10px',fontSize : '62px',color :'#0F3C69'}}>
          5
        </p>
        <span className="top"></span>
        <span className="right"></span>
        <span className="bottom"></span>
        <span className="left"></span>
      </article>

    
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
  <div style={{ marginLeft: '135px', width: '18%', paddingTop: '50px' }}>
    <canvas ref={chartRef} id="myChart" width={50} height={310}></canvas>
  </div>
  <div style={{ marginLeft: '105px', width: '18%', paddingTop: '45px' }}>
    <canvas ref={chartRef1} id="myChart1" width={50} height={310}></canvas>
  </div>
</div>

        </>
  );
  }
export default Dashboard;
