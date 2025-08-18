# ChatUp
ChatUp is a full-stack chat communication application developed as part of a machine test. It uses Django for the backend, React for the frontend, and WebSockets for real-time communication.

<p align="center">
  <img src="./assets/agri_flow_landing_page.jpg" alt="AgriFlow Logo" width="100%" style="border-radius: 16px;" />
</p>

<p align="center">
  <a href="https://chat-up-brown.vercel.app/" target="_blank">
    <img alt="View Live Project" src="https://img.shields.io/badge/%20Live%20Demo-0abab5?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  &nbsp;
  <a href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID" target="_blank">
    <img alt="Watch Demo Video" src="https://img.shields.io/badge/%20Demo%20Video-FF0000?style=for-the-badge&logo=youtube&logoColor=white" />
  </a>
</p>

## Table of Contents
- Features
- Technologies Used
- Installation and Setup
- Testing
- Contributing
- License

---

## Features
- Secure authentication
- Real-time chat messaging    
- Chat room creation and management  
- Responsive design
  
## Technologies Used

- **Backend (Django)**
  - Django, Django REST Framework, Django Channels  
  - JWT authentication  
  - WebSocket support  
  - APIs for room management

- **Frontend (React)**
  - React, Axios  
  - Registration & login forms  
  - Chat interface  

- **Others**
  - Redis for WebSockets  

- **Integration**
  - JWT authentication connected between frontend and backend (access and refresh token both handled in cookie as http only)
  - WebSocket real-time updates
    
## Installation and Setup
1. Clone the repository
   
  ```
  git clone https://github.com/VishnuCheruvakkara/ChatUp.git

  cd ChatUp
  ```
   
### Backend (Django) Setup

1. Create and activate a virtual environment
   
  ```
  cd backend
  ```
2. Create and activate a virtual environment
   
  ```
  python -m venv env
  ```
  > activate env on Windows
  ```
  env\Scripts\activate
  ```

  > activate env macOS/Linux
  
  ```
  source env/bin/activate
  ```
  
  



   
   

 

## Testing
- Backend unit tests: `python manage.py test`  
- Frontend tests: `npm test`  

## Contributing
- Fork the repository  
- Create a new branch  
- Commit changes  
- Open a pull request  

## License
This project is for machine test purposes.
