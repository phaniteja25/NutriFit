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
import { useNavigate } from "react-router-dom";
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
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const authToken = localStorage.getItem("token");
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserInfo();
            await fetchCurrentDaySummary();
            await fetchMeals();
        };
        fetchData();
    }, []);

    const renderCircularProgress = (value, goal, label, actual, required) => (
        <div style={{ width: "100px", margin: "10px", textAlign: "center" }}>
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
            <p style={{ fontWeight: 'bold', marginTop: '5px' }}>{label}</p>
            <p style={{ fontSize: '12px', color: '#666' }}>
                {`Today: ${actual !== null ? Math.round(actual) : 'N/A'}`}<br />
                { `Goal: ${required !== null ? Math.round(required) : 'N/A'}`}
            </p>
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
            <div style={{ width: '100vw', height: '100vh', backgroundColor: '#f5f5f5', padding: '24px', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ marginRight: '20px', textAlign: 'left' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                            <span style={{ width: '16px', height: '16px', backgroundColor: '#e88207', borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></span>
                            <span style={{ color: '#333' }}>Required Macro</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ width: '16px', height: '16px', backgroundColor: '#3e98c7', borderRadius: '50%', display: 'inline-block', marginRight: '8px' }}></span>
                            <span style={{ color: '#333' }}>Today’s Macro</span>
                        </div>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{
                            textAlign: 'center',
                            fontSize: '24px',
                            fontWeight: 'bold',
                            color: '#333',
                            marginBottom: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}>
                            Daily Nutritional Goals Progress
                        </h3>
    
                        {error && <p style={{ color: "red" }}>{error}</p>}
                        <div style={{ display: "flex", justifyContent: "space-around", margin: "40px 0" }}>
                            {renderCircularProgress(isLoading ? 0 : circularData.totalCalories, userInfo.total_cal_intake, "Calories", circularData.totalCalories, userInfo.total_cal_intake)}
                            {renderCircularProgress(isLoading ? 0 : circularData.totalCarbs, userInfo.reqd_carbs, "Carbs", circularData.totalCarbs, userInfo.reqd_carbs)}
                            {renderCircularProgress(isLoading ? 0 : circularData.totalFats, userInfo.reqd_fat, "Fats", circularData.totalFats, userInfo.reqd_fat)}
                            {renderCircularProgress(isLoading ? 0 : circularData.totalProteins, userInfo.reqd_protein, "Proteins", circularData.totalProteins, userInfo.reqd_protein)}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#333',
                        marginBottom: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                    }}>
                        Weekly Nutrient Intake Overview
                    </h3>
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
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button 
                        onClick={() => navigate("/history")}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#3e98c7',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}
                    >
                        View History
                    </button>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
