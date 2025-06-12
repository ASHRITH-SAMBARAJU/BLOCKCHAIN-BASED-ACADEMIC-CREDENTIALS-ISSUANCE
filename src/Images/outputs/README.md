# 🎓 Blockchain-Based Academic Credentials Issuance System

## 🧠 Overview

A decentralized platform that enables universities to issue tamper-proof academic credentials on the blockchain. Students can securely view certificates, and verifiers can instantly validate their authenticity. OTP-based login via Twilio ensures secure access across stakeholders.

---

## 🚀 Key Features

- 🔐 OTP-based authentication (Twilio)
- 🏫 Multi-role access: Student, University, Verifier
- 📃 Certificate upload and verification
- 🧾 Blockchain-backed issuance with Ethers.js
- 📈 Dashboards for real-time credential visibility
- 📂 Bulk student upload and verification
- 🧠 Built with React + TypeScript + Node.js

---

## 🛠️ Tech Stack

| Layer        | Tools                                |
|--------------|---------------------------------------|
| Frontend     | React, TypeScript, Tailwind CSS       |
| Backend      | Node.js, Express                      |
| Blockchain   | Ethers.js, Smart Contracts (Ethereum) |
| Auth         | Twilio OTP                            |
| File Handling| Context API, PDF + image support      |

---

## 📸 UI Screenshots

### 🔹 Homepage  
![Homepage](./src/Images/outputs/1-Homepage.png)

### 🔹 Student Registration  
![Student Registration](./src/Images/outputs/3-Student-Registration.png)

### 🔹 Student Dashboard  
![Student Dashboard](./src/Images/outputs/5-Student-Dashboard.png)

### 🔹 University Registration  
![University Registration](./src/Images/outputs/5-University-Registration.png)

### 🔹 University Login  
![University Login](./src/Images/outputs/6-University-Login.png)

### 🔹 University Dashboards  
![University Dashboard 1](./src/Images/outputs/7-University-Dashboard-1.png)  
![University Dashboard 2](./src/Images/outputs/8-University-Dashboard-2.png)  
![University Dashboard 3](./src/Images/outputs/9-University-Dashboard-3.png)

### 🔹 Verifier Flow  
![Verifier Registration](./src/Images/outputs/9-Verifier-Registration.png)  
![Verifier Login](./src/Images/outputs/10-Verifier-Login-Page.png)  
![Verifier Dashboard](./src/Images/outputs/11-Verifier-Dashboard.png)

### 🔹 Sample Student Data  
![Sample List](./src/Images/outputs/12-Sample-Students-List.png)

---

## ⚙️ How to Run the Project

### 🔧 Backend Setup

```bash
cd backend
npm install
# Setup .env with:
# TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, PORT
node server.js
