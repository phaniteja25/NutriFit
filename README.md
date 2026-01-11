# NutriFit - AI powered Nutritional Tracker and Meal Planner
Nutrifit is an AI powered nutritional tracker and meal planner. The user can track daily calorie intake by just natural language processing. For ex: I ate a bowl of omlette and one glass of milk. The system intelligently recognizes the food items and the portions
<br>
Demo
<br>
https://drive.google.com/file/d/12I4puKoyFnTeKOUJRaqzrzCp_W-ul_mA/view?usp=sharing

### System Architecture
**Components**
- Frontend: React (CRA) + Tailwind CSS, served via Nginx in production
- Backend: Spring Boot REST API (Java), business logic + AI orchestration
- Database: PostgreSQL for users, meals, logs, and meal plans
- External APIs: Google Gemini (meal plan generation), CalorieNinja (nutrition parsing)
- Infrastructure: Docker Compose to run frontend, backend, and DB together

**High‑level flow**
<br>
User → React UI → Spring Boot API → PostgreSQL  
 
### Running the Application 

## Prerequisites

### Option A — Run with Docker (recommended)
- Docker Desktop (includes Docker Compose)

### Option B — Run locally (no Docker)
- Node.js 18+ and npm
- Java 21 (Spring Boot)
- Maven (or use the included `mvnw`)
- PostgreSQL 14+

## Environment Variables
Create a `.env` at the repo root with your DB + API keys. Required keys used by the backend include:
- `SPRING_DATASOURCE_URL`
- `SPRING_DATASOURCE_USERNAME`
- `SPRING_DATASOURCE_PASSWORD`
- `SPRING_JPA_HIBERNATE_DDL_AUTO`
- `SPRING_JPA_DATABASE_PLATFORM`
- `GEMINI_API_KEY`
- `CAL_NINJA_API_KEY`

## Run with Docker
```bash
docker compose up --build
```

## Run locally 
**Frontend**
``` bash
cd frontend
npm install
npm start
```
**Backend**
``` bash
cd backend/nutri-fit-app
./mvnw spring-boot:run
```
**Frontend runs on: http://localhost:3000**
<br>
**Backend runs on: http://localhost:8080**


