### PennyTrack - Expense Tracking and Investment Recommendation System

---

## **PennyTrack**

**PennyTrack** is a modern expense tracking application designed to simplify personal finance management and empower users with personalized investment recommendations. Built using the **MERN stack** (MongoDB, Express.js, React, Node.js) and enhanced by the **PennyDrop** AI module (powered by Python and Flask), this platform integrates comprehensive budgeting tools with machine learning-driven investment insights.

This repository includes three main components:
1. **Frontend**: The user interface built with Next.js.
2. **Backend**: The RESTful API backend implemented in Express.js.
3. **PennyDrop**: The AI module offering investment recommendations via a Flask application.

---

## **Features**

### **Expense Management**
- **Expense Tracking**: Record and categorize expenses for detailed insights.
- **Budgeting**: Set and manage personalized budgets for effective financial planning.
- **Data Visualization**: Analyze spending patterns using interactive charts and graphs.

### **Investment Recommendations (PennyDrop)**
- **AI-Powered Insights**: Get personalized investment suggestions based on income, spending habits, and risk tolerance.
- **Machine Learning Integration**: Utilizes a Decision Tree Classifier for optimal investment predictions.
- **Risk Analysis**: Provides detailed risk levels and maximum potential loss for investments.

### **Reminder System**
- **Financial Alerts**: Sends timely notifications to help users stay on track with their financial goals.

### **Secure and Scalable**
- **User Authentication**: Ensures data security with robust authentication mechanisms.
- **Cloud-Ready Architecture**: Designed for scalability and seamless cross-device integration.

---

## **Tech Stack**

### **Frontend**
- **Next.js (v12)**: Page routing and server-side rendering for a fast and responsive user experience.
- **Tailwind CSS**: Styling for consistent and customizable design.
- **Axios**: For making secure API calls to the backend.

### **Backend**
- **Node.js & Express.js**: RESTful API development with structured routing and middleware.
- **MongoDB**: Flexible and scalable NoSQL database for storing user data.

### **PennyDrop (AI Module)**
- **Python & Flask**: RESTful API for machine learning-driven investment recommendations.
- **Machine Learning**: Decision Tree Classifier trained on financial datasets.
- **Dependencies**:
  - `scikit-learn`: For training and deploying the model.
  - `pandas`: For data preprocessing.
  - `joblib`: For model serialization.

---

## **Setup and Run**

### **Prerequisites**
- **Node.js** and **npm** installed on your system.
- **Python (3.8+)** installed and accessible.
- Clone this repository to your local system:
  ```bash
  git clone https://github.com/Neverm1ndEZ/captsone-project
  ```

### **Automated Setup**

A script, `run-all.js`, is included to automate the setup and running of all components.

1. Install Node.js and Python dependencies:
   - For Node.js projects (`frontend` and `backend`), the script checks if `node_modules` exists and installs dependencies if missing.
   - For the PennyDrop module, the script checks if a virtual environment (`penv`) exists. If not, it creates and activates the environment, installs dependencies, and trains the model.

2. Run the script:
   ```bash
   node run-all.js
   ```
   This script:
   - Starts the **frontend** server on `http://localhost:3000`.
   - Starts the **backend** server on `http://localhost:5000`.
   - Activates the **penv** virtual environment, trains the PennyDrop model, and runs the Flask app on `http://localhost:8000`.

---

## **Manual Setup**

If you prefer manual setup, follow these steps for each component:

### **Frontend (PennyTrack-Frontend)**
1. Navigate to the frontend directory:
   ```bash
   cd PennyTrack-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### **Backend (PennyTrack-Backend)**
1. Navigate to the backend directory:
   ```bash
   cd PennyTrack-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### **PennyDrop (AI Module)**
1. Navigate to the PennyDrop directory:
   ```bash
   cd PennyDrop
   ```
2. Create and activate the virtual environment (if not already):
   ```bash
   python -m venv penv
   source penv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Train the model:
   ```bash
   python train_model.py
   ```
5. Start the Flask app:
   ```bash
   python app.py
   ```

---

## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

This README is tailored to your project and provides clear instructions for setup and usage, aligning with the script automation. Let me know if you need further adjustments!