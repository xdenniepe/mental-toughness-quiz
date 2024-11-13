# Mental Toughness Quiz

## Overview
The **Mental Toughness Quiz** is an online assessment tool designed to evaluate an individual's mental resilience across four key traits: **Control**, **Confidence**, **Commitment**, and **Challenge**. This quiz consists of 18 questions and aims to provide users with insights into their mental toughness. Upon completion, users receive a detailed report via email.

The project is built with **Node.js** and **React Vite**, and deployed on **DigitalOcean**.

## Features
- **User Information Form**: Collects basic user details (name and email) to personalize the experience and send results via email.
- **18-Question Quiz**: Each question assesses one of the four key traits. Some questions are "reversed" to capture a broader range of responses.
- **Dynamic Scoring**: Calculates scores for each trait based on user responses, with reversed questions scored inversely.
- **Review Page**: Users can review their answers before final submission.
- **Email Results**: Sends users a breakdown of their mental toughness across the four traits after completing the quiz.

## Technologies Used
- **Frontend**: React (Vite)
- **Backend**: Node.js
- **Deployment**: DigitalOcean
- **Email Service**: TBD (SMTP, third-party API, etc.)

## Getting Started

### Prerequisites
- **Node.js** (v14 or later)
- **Docker** (for deployment)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/xdenniepe/mental-toughness-quiz.git
   cd mental-toughness-quiz
