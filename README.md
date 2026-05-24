# HireNest - MERN Job Portal

A comprehensive job portal application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring modern UI with Tailwind CSS and Framer Motion animations.

## Features

### For Job Seekers
- User registration and authentication
- Advanced job search and filtering
- Resume builder and ATS checker
- Job application tracking
- Profile management
- Application history

### For Recruiters
- Company profile management
- Job posting and management
- Applicant tracking system
- Shortlisting candidates
- Application status management

### Technical Features
- JWT-based authentication
- Role-based access control
- Responsive design
- Real-time notifications
- Modern animations and transitions
- RESTful API architecture

## Project Structure

```
Mern Job portal/
|
+-- frontend/                 # React.js frontend application
|   |
|   +-- public/
|   |   +-- index.html
|   |   +-- vite.svg
|   |
|   +-- src/
|   |   +-- components/       # Reusable components
|   |   |   +-- Navbar.jsx
|   |   |   +-- Footer.jsx
|   |   |   +-- ProtectedRoute.jsx
|   |   |
|   |   +-- context/          # React context
|   |   |   +-- AuthContext.jsx
|   |   |
|   |   +-- pages/            # Page components
|   |   |   +-- Home.jsx
|   |   |   +-- Jobs.jsx
|   |   |   +-- JobDetails.jsx
|   |   |   +-- UserAuth.jsx
|   |   |   +-- Profile.jsx
|   |   |   +-- ResumeBuilder.jsx
|   |   |   +-- ResumeATS.jsx
|   |   |
|   |   +-- recruiter/        # Recruiter-specific pages
|   |   |   +-- Dashboard.jsx
|   |   |   +-- AddJob.jsx
|   |   |   +-- ManageJobs.jsx
|   |   |   +-- Applicants.jsx
|   |   |   +-- Shortlisted.jsx
|   |   |
|   |   +-- services/         # API services
|   |   |   +-- api.js
|   |   |
|   |   +-- assets/           # Static assets
|   |   +-- App.jsx
|   |   +-- main.jsx
|   |   +-- index.css
|   |
|   +-- package.json
|   +-- vite.config.js
|   +-- tailwind.config.js
|   +-- postcss.config.js
|
+-- backend/                  # Node.js backend API
|   |
|   +-- models/              # Database models
|   |   +-- User.js
|   |   +-- Job.js
|   |   +-- Application.js
|   |
|   +-- routes/              # API routes
|   |   +-- auth.js
|   |   +-- jobs.js
|   |   +-- users.js
|   |   +-- applications.js
|   |
|   +-- server.js
|   +-- package.json
|   +-- .env
|
+-- README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Mern Job portal"
```

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Set up environment variables:
```bash
# Create .env file with the following variables
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hirenest
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
```

Start the backend server:
```bash
npm run dev
# or
npm start
```

### 3. Frontend Setup

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs with filters
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create new job (recruiter only)
- `PUT /api/jobs/:id` - Update job (recruiter only)
- `DELETE /api/jobs/:id` - Delete job (recruiter only)
- `GET /api/jobs/my/jobs` - Get jobs posted by current recruiter

### Applications
- `POST /api/applications` - Apply for a job
- `GET /api/applications/my-applications` - Get user's applications
- `GET /api/applications/job-applications` - Get applications for recruiter's jobs
- `PUT /api/applications/:id/status` - Update application status

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/profile-picture` - Upload profile picture
- `POST /api/users/resume` - Upload resume

## Database Schema

### User Model
- Personal information (name, email, phone, location)
- Role-based access (user/recruiter)
- Profile details (skills, experience, education)
- Authentication credentials

### Job Model
- Job details (title, company, location, type)
- Requirements and responsibilities
- Posted by recruiter
- Application tracking
- Status management

### Application Model
- Links job, applicant, and recruiter
- Application status tracking
- Resume and cover letter
- Timestamps for each status change

## Technologies Used

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Axios** - HTTP client
- **React Hot Toast** - Notification system
- **React Icons** - Icon library
- **Swiper.js** - Carousel/slider component

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## Features Implemented

### Authentication System
- JWT-based authentication
- Role-based access control
- Protected routes
- Token management

### Job Management
- Create, read, update, delete jobs
- Advanced filtering and search
- Category-based organization
- Application tracking

### User Interface
- Responsive design for all devices
- Modern animations and transitions
- Interactive components
- Professional color scheme

### Data Management
- RESTful API architecture
- Proper error handling
- Input validation
- Security best practices

## Known Issues & Fixes Applied

1. **Missing package.json** - Created proper dependency configuration
2. **Missing backend server** - Implemented complete Express.js API
3. **Incorrect Tailwind syntax** - Fixed `bg-linear-to` to `bg-gradient-to`
4. **Authentication flow issues** - Updated components to use AuthContext properly
5. **Missing configuration files** - Added vite.config.js, tailwind.config.js, etc.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For any issues or questions, please create an issue in the repository or contact the development team.

---

**Note**: This is a development version. For production deployment, ensure to:
- Use environment variables for sensitive data
- Implement proper error logging
- Set up HTTPS
- Configure production database
- Optimize build files
- Implement proper security measures
