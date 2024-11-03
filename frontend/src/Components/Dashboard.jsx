import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Navbar from "./Navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return `${monthNames[parseInt(month) - 1]} ${parseInt(day)}, ${year}`;
};

const Dashboard = () => {

    const [userInfo, setUserInfo] = useState({});
    const [mealsByDate, setMealsByDate] = useState({});
    const [error, setError] = useState("");

    const authToken = localStorage.getItem("token");

    const fetchUserInfo = async () => {
        try {
            const response = await fetch("http://localhost:8080/user/userinfo", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (!response.ok) throw new Error("Failed to fetch user info");

            const data = await response.json();
            return data;
        } catch (error) {
            setError("Error fetching user info");
            console.error("Error fetching user info:", error);
            return {};
        }
    };

    const fetchMeals = async () => {
        try {
            if (!authToken) {
                console.error("No token found");
                return;
            }

            const response = await fetch("http://localhost:8080/api/meals/get_all_meals", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (!response.ok) throw new Error("Failed to fetch meals");

            const data = await response.json();
            const groupedMeals = data.reduce((acc, curr) => {
                const date = curr.date;
                const formattedDate = formatDate(date);

                if (!acc[formattedDate]) {
                    acc[formattedDate] = { calories: 0, carbs: 0, fats: 0, proteins: 0 };
                }

                curr.meals.forEach(meal => {
                    acc[formattedDate].calories += meal.calories;
                    acc[formattedDate].carbs += meal.carbs;
                    acc[formattedDate].fats += meal.fats;
                    acc[formattedDate].proteins += meal.proteins;
                });

                return acc;
            }, {});

            setMealsByDate(groupedMeals);
        } catch (error) {
            setError("Error fetching meals");
            console.error("Error fetching meals:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const userInfoData = await fetchUserInfo();
            setUserInfo(userInfoData);
            await fetchMeals(); 
        };

        fetchData();
    }, []);

    const renderCircularProgress = (value, goal, label) => (
        <div style={{ width: "80px", margin: "10px" }}>
            <CircularProgressbar
                value={value}
                maxValue={goal}
                text={`${Math.round((value / goal) * 100)}%`}
                styles={buildStyles({
                    textSize: "16px",
                    pathColor: "#3e98c7",
                    textColor: "#3e98c7",
                    trailColor: "#e88207",
                })}
            />
            <p style={{ textAlign: "center" }}>{label}</p>
        </div>
    );

    const latestDate = Object.keys(mealsByDate)[0];
    const latestMeals = mealsByDate[latestDate] || {};
    const { calories = 0, carbs = 0, fats = 0, proteins = 0 } = latestMeals;
    const lastSevenDays = Object.keys(mealsByDate)
        .slice(0, 7)
        .reverse();

    const createChartData = (macro) => ({
        labels: lastSevenDays,
        datasets: [
            {
                label: macro,
                data: lastSevenDays.map(date => mealsByDate[date][macro]),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            }
        ]
    });

    return (
        <>
            <Navbar />
            <div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
                        {renderCircularProgress(calories, userInfo.total_cal_intake, "Calories")}
                        {renderCircularProgress(carbs, userInfo.reqd_carbs, "Carbs")}
                        {renderCircularProgress(fats, userInfo.reqd_fat, "Fats")}
                        {renderCircularProgress(proteins, userInfo.reqd_protein, "Proteins")}
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", margin: "20px 0" }}>
                <div style={{width: "20%", marginBottom: "20px" }}>
                    <h3>Calories</h3>
                    <Bar data={createChartData("calories")} options={{ responsive: true }} />
                </div>
                <div style={{ width: "20%", marginBottom: "20px" }}>
                    <h3>Carbs</h3>
                    <Bar data={createChartData("carbs")} options={{ responsive: true }} />
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", margin: "20px 0" }}>
                <div style={{ width: "20%", marginBottom: "20px" }}>
                    <h3>Fats</h3>
                    <Bar data={createChartData("fats")} options={{ responsive: true }} />
                </div>
                <div style={{ width: "20%", marginBottom: "20px" }}>
                    <h3>Proteins</h3>
                    <Bar data={createChartData("proteins")} options={{ responsive: true }} />
                </div>
            </div>
        </>
    );
};

export default Dashboard;


