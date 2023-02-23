import { NavbarLinks } from "../components/NavbarLinks";
import { faker } from "@faker-js/faker";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

//!Figura 1
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      color: "white",
    },
    title: {
      display: true,
      text: "Cotizaciones enviadas",
      color: "white",
    },
  },
};

const labels = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

//!Figura 2

export const optionsA = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      color: "white",
    },
    title: {
      display: true,
      text: "Ventas mes",
      color: "white",
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "Cotizaciones semana pasada",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#1a44d2",
    },
    {
      label: "Cotizaciones semana actual",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "WHITE",
      color: "white",
    },
  ],
};

const labelsA = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Ahora",
];

export let dataA = {
  labels: labelsA,
  datasets: [
    {
      fill: true,
      label: "Usuarios",
      data: labelsA.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      fill: true,
      label: "Dataset 2",
      data: labelsA.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(225, 225, 225)",
      backgroundColor: "rgba(225, 225, 225, 0.5)",
    },
  ],
};

//!Figura 3
export const dataC = {
  labels: ["Usuarios", "Clientes", "Cotizaciones", "Productos"],
  plugins: {
    legend: {
      position: "top",
      color: "white",
    },
    title: {
      display: true,
      text: "Estadisticas generales",
      color: "white",
    },
  },
  datasets: [
    {
      label: "# Cantidad",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export function DashBoard() {
  return (
    <>
      <NavbarLinks page="dashboard" />

      <div id="contenedor-graficas">
        <div className="graficas-barras">
          <Bar options={options} data={data} />
        </div>
        <div className="graficas-linea">
          <Line options={optionsA} data={dataA} />
        </div>
        <div className="graficas-torta">
          <Pie data={dataC} />
        </div>
      </div>
    </>
  );
}
