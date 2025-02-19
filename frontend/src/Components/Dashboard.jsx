import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./Navbar";
import bg_img from './image_bg.jpg';

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
            const response = await fetch("https://nutrifit-production-8d5a.up.railway.app/user/userinfo", {
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
            const response = await fetch("https://nutrifit-production-8d5a.up.railway.app/api/meals/current_day_summary", {
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
            const response = await fetch("https://nutrifit-production-8d5a.up.railway.app/api/meals/get_all_meals", {
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

    const calorieToastShown = useRef(false);
    const fatToastShown = useRef(false);
    const carbsToastShown = useRef(false);
    const proteinToastShown = useRef(false);

    useEffect(() => {
        const triggerNotification = () => {
            const remaining = Math.round(((userInfo.total_cal_intake - circularData.totalCalories) / userInfo.total_cal_intake) * 100);

            if (!calorieToastShown.current && Math.round(circularData.totalCalories) === Math.round(userInfo.total_cal_intake)) {
                toast.success("🎉 Congratulations! You've achieved your daily calorie intake goal!", {
                    position: "top-right",
                });
                calorieToastShown.current = true;
            }

            if (!calorieToastShown.current && Math.round(circularData.totalCalories) > Math.round(userInfo.total_cal_intake)) {
                toast.warning("⚠️ You've exceeded your daily calorie intake goal!", {
                    position: "top-right",
                });
                calorieToastShown.current = true;
            }

            if (!fatToastShown.current && Math.round(circularData.totalFats) === Math.round(userInfo.reqd_fat)) {
                toast.success("🎉 Congratulations! You've achieved your daily fat intake goal!", {
                    position: "top-right",
                });
                fatToastShown.current = true;
            }

            if (!fatToastShown.current && Math.round(circularData.totalFats) > Math.round(userInfo.reqd_fat)) {
                toast.warning("⚠️ You've exceeded your daily fat intake goal!", {
                    position: "top-right",
                });
                fatToastShown.current = true;
            }

            if (!carbsToastShown.current && Math.round(circularData.totalCarbs) === Math.round(userInfo.reqd_carbs)) {
                toast.success("🎉 Congratulations! You've achieved your daily carb intake goal!", {
                    position: "top-right",
                });
                carbsToastShown.current = true;
            }

            if (!carbsToastShown.current && Math.round(circularData.totalCarbs) > Math.round(userInfo.reqd_carbs)) {
                toast.warning("⚠️ You've exceeded your daily carb intake goal!", {
                    position: "top-right",
                });
                carbsToastShown.current = true;
            }

            if (!proteinToastShown.current && Math.round(circularData.totalProteins) === Math.round(userInfo.reqd_protein)) {
                toast.success("🎉 Congratulations! You've achieved your daily protein intake goal!", {
                    position: "top-right",
                });
                proteinToastShown.current = true;
            }

            if (!proteinToastShown.current && Math.round(circularData.totalProteins) > Math.round(userInfo.reqd_protein)) {
                toast.warning("⚠️ You've exceeded your daily protein intake goal!", {
                    position: "top-right",
                });
                proteinToastShown.current = true;
            }
        };

        triggerNotification();
    }, [circularData, userInfo]);


    const renderCircularProgress = (value, goal, label, actual, required) => (
        <div className="w-24 mx-2 text-center">
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
            <p className="font-bold mt-1">{label}</p>
            <p className="text-sm text-gray-600">
                {`Today: ${actual !== null ? Math.round(actual) : 'N/A'}`}<br />
                { `Goal: ${required !== null ? Math.round(required) : 'N/A'}`}
            </p>
        </div>
    );

    const lastSevenDays = Object.keys(barData)
    .sort((a, b) => new Date(a) - new Date(b))
    .slice(-7);


    const macroColors = {
        calories: "rgba(255, 99, 132, 0.6)",
        carbs: "rgba(54, 162, 235, 0.6)",
        fats: "rgba(255, 206, 86, 0.6)",
        proteins: "rgba(75, 192, 192, 0.6)"
    };

    const createChartData = (macro) => ({
        labels: lastSevenDays,
        datasets: [
            {
                label: macro,
                data: lastSevenDays.map(date => barData[date]?.[macro] || 0),
                backgroundColor: macroColors[macro],
            }
        ]
    });

    return (
        <>
        <Navbar />
        <ToastContainer />
        <div className="min-h-screen p-6 bg-cover bg-center bg-opacity-50 bg-black" style={{ backgroundImage: `url(${bg_img})` }}>
            <div className="w-full min-h-screen bg-gray-100 p-10 box-border rounded-lg overflow-hidden bg-opacity-90">
                <div className="flex items-center mb-5 px-16">
                    <div className="mr-5 text-left">
                        <div className="flex items-center mb-1">
                            <span className="w-4 h-4 bg-orange-500 rounded-full inline-block mr-2"></span>
                            <span className="text-gray-800">Required Macro</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-4 h-4 bg-blue-500 rounded-full inline-block mr-2"></span>
                            <span className="text-gray-800">Today’s Macro</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-center text-2xl font-bold text-gray-800 mb-5 uppercase tracking-wide">
                            Daily Nutritional Goals Progress
                        </h3>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="flex justify-around my-10">
                            {renderCircularProgress(isLoading ? 0 : circularData.totalCalories, userInfo.total_cal_intake, "Calories", circularData.totalCalories, userInfo.total_cal_intake)}
                            {renderCircularProgress(isLoading ? 0 : circularData.totalCarbs, userInfo.reqd_carbs, "Carbs", circularData.totalCarbs, userInfo.reqd_carbs)}
                            {renderCircularProgress(isLoading ? 0 : circularData.totalFats, userInfo.reqd_fat, "Fats", circularData.totalFats, userInfo.reqd_fat)}
                            {renderCircularProgress(isLoading ? 0 : circularData.totalProteins, userInfo.reqd_protein, "Proteins", circularData.totalProteins, userInfo.reqd_protein)}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-center text-2xl font-bold text-gray-800 mb-5 uppercase tracking-wide px-16">
                        Weekly Nutrient Intake Overview
                    </h3>
                    <div className="flex flex-wrap justify-around my-5">
                        <div className="w-1/3 mb-5">
                            <h3>Calories</h3>
                            <Bar data={createChartData("calories")} options={{ responsive: true }} />
                        </div>
                        <div className="w-1/3 mb-5">
                            <h3>Carbs</h3>
                            <Bar data={createChartData("carbs")} options={{ responsive: true }} />
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-around my-5">
                        <div className="w-1/3 mb-5">
                            <h3>Fats</h3>
                            <Bar data={createChartData("fats")} options={{ responsive: true }} />
                        </div>
                        <div className="w-1/3 mb-5">
                            <h3>Proteins</h3>
                            <Bar data={createChartData("proteins")} options={{ responsive: true }} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center mt-5 px-16">
                    <button
                        onClick={() => navigate("/history")}
                        className="py-2 px-4 bg-blue-500 text-white rounded-md cursor-pointer text-lg font-bold"
                    >
                        View History
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}

export default Dashboard;
