# ChatUp
ChatUp is a full-stack chat and video communication application developed as part of a machine test. It uses Django for the backend, React for the frontend, and WebSockets/WebRTC for real-time communication.

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
   
### Backend (Django) Setup

  ```
  git clone <your-repo-url>
  cd <your-repo-folder>/backend
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
