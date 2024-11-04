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
    const [circularData, setCircularData] = useState({
        totalCalories: 0,
        totalCarbs: 0,
        totalFats: 0,
        totalProteins: 0
    });
    const [barData, setBarData] = useState({});
    const [currentDayMeals, setCurrentDayMeals] = useState([]);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

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
            setUserInfo(data);
        } catch (error) {
            setError("Error fetching user info");
            console.error("Error fetching user info:", error);
        }
    };

    const fetchCurrentDaySummary = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/meals/current_day_summary", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            if (!response.ok) throw new Error("Failed to fetch current day nutritional summary");

            const data = await response.json();
            setCircularData(data);
            setIsLoading(false);
        } catch (error) {
            setError("Error fetching current day nutritional summary");
            console.error("Error fetching summary:", error);
        }
    };

    const fetchMeals = async () => {
        try {
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

            setBarData(groupedMeals);
        } catch (error) {
            setError("Error fetching meals");
            console.error("Error fetching meals:", error);
        }
    };

    const fetchCurrentDayMeals = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/meals/get_current_day_meals', {
                headers: {
                    Authorization: `Bearer ${authToken}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch current day meals');
            }

            const data = await response.json();
            setCurrentDayMeals(data);
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserInfo();
            await fetchCurrentDaySummary();
            await fetchMeals();
            await fetchCurrentDayMeals();
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

    const lastSevenDays = Object.keys(barData)
        .slice(0, 7)
        .reverse();

    const createChartData = (macro) => ({
        labels: lastSevenDays,
        datasets: [
            {
                label: macro,
                data: lastSevenDays.map(date => barData[date]?.[macro] || 0),
                backgroundColor: "rgba(75, 192, 192, 0.6)",
            }
        ]
    });

    return (
        <>
            <Navbar />
            <div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
                    {renderCircularProgress(isLoading ? 0 : circularData.totalCalories, userInfo.total_cal_intake, "Calories")}
                    {renderCircularProgress(isLoading ? 0 : circularData.totalCarbs, userInfo.reqd_carbs, "Carbs")}
                    {renderCircularProgress(isLoading ? 0 : circularData.totalFats, userInfo.reqd_fat, "Fats")}
                    {renderCircularProgress(isLoading ? 0 : circularData.totalProteins, userInfo.reqd_protein, "Proteins")}
                </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", margin: "20px 0" }}>
                <div style={{ width: "20%", marginBottom: "20px" }}>
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
            <div>
                <h2>Current Day Meal Details</h2>
                {currentDayMeals.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Meal Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Calories</th>
                                <th>Proteins</th>
                                <th>Carbs</th>
                                <th>Fats</th>
                                <th>Fibre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDayMeals.map((meal) => (
                                <tr key={meal.mealID}>
                                    <td>{meal.mealName}</td>
                                    <td>{meal.log_date}</td>
                                    <td>{new Date(meal.log_time).toLocaleTimeString()}</td>
                                    <td>{meal.calories}</td>
                                    <td>{meal.proteins}</td>
                                    <td>{meal.carbs}</td>
                                    <td>{meal.fats}</td>
                                    <td>{meal.fibre}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>Loading current day meals...</p>
                )}
            </div>
        </>
    );
};

export default Dashboard;
