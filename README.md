Blockchain-Based Academic Credentials Issuance System

## Overview
This project is a blockchain-powered academic credentials issuance platform designed to simplify and secure the process of certificate issuance and verification. Built using Ethers.js for blockchain integration and Twilio for OTP-based authentication, the system allows multiple universities to issue tamper-proof digital certificates to students, who can download them securely.

## Key Features
- Decentralized Certificate Issuance: Universities can issue academic certificates securely on the blockchain.
- OTP-Based Authentication:Students authenticate using OTP (via Twilio) to access and download their certificates.
- Unique Certificate ID:Each certificate is assigned a unique ID, ensuring easy verification.
- Multi-University Support:The platform supports multiple universities, enabling seamless certificate issuance.
- Enhanced Security:Blockchain ensures immutability and transparency, preventing fraud and forgery.

## Technology Stack
- Blockchain: Ethereum (Smart Contracts)
- Backend:Node.js, Ethers.js
- Frontend: React.js 
- Authentication:** Twilio (OTP verification)

## How It Works
1. Universities register on the platform and issue certificates using blockchain transactions.
2. Students log in and request access to their certificates.
3. An OTP is sent to the student’s registered contact for authentication.
4. Upon successful OTP verification, the student can download their certificate.
5. The certificate’s authenticity can be verified using its unique ID on the blockchain.

## Setup & Installation
1. Clone the repository
2. Install dependencies
3. Configure environment variables (Twilio API keys, Blockchain - ethers.js, etc.).
4. Deploy the smart contracts to Ethereum.
5. Start the backend and frontend servers.

For inquiries or collaborations, please contact ashrithsambaraju@gmail.com



