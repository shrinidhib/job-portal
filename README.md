# JobConnect

JobConnect is a job portal that connects job seekers with top employers. It allows users to browse job listings, post jobs, and apply for them with a responsive and modern interface.

## Features

- **Browse Jobs**: Explore various job opportunities.
- **Post Jobs**: Employers can create job listings.
- **Apply for Jobs**: Submit applications.
- **User Roles**: Specific functionalities for job seekers and employers.
- **Responsive Design**: Optimized for all devices.

## Technologies

- **Frontend**: React.js, Next.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **AI Integration**: Google Generative AI
- **Meet Scheduler**: Zoom API
- **Application Confirmation**: nodemailer

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+)
- MongoDB

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shrinidhib/job-portal.git
   cd job-portal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file with:
   ```
    MONGO_URI = <your_mongodb_uri>
    JWT_SECRET= <your_jwt_secret>
    EMAIL = <your_email_for_nodemailed>
     - follow to create your gmail pass https://lizenshakya.medium.com/how-to-send-mails-with-gmail-using-nodemailer-after-less-secure-app-is-disabled-by-google-b41abf3fdada
    PASS = <your_gmail_pass>
     - create zoom marketplace app for zoom credentials https://marketplace.zoom.us/
    ZOOM_ACCOUNT_ID = <your_zoom_app_account_id>
    ZOOM_CLIENT_ID = <your_zoom_app_client_id>
    ZOOM_CLIENT_SECRET =  <your_zoom_app_client_secret>
     - create gen ai api key at https://aistudio.google.com/app/apikey
    API_KEY = <your_google_generative_ai_api_key>

   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

## Usage

### User Roles

- **Job Seekers**: Browse and apply for jobs.
- **Employers**: Post and manage job listings.

### Navigation

- **Jobs**: Browse job listings.
- **My Jobs**: (Employers) Manage posted jobs.
- **My Applications**: (Job seekers) Track applications.
- **Post Job**: (Employers) Create new job listings.
- **Login/Register** : SignIn/Login for users

## Contributing

1. Fork the repository.
2. Create a branch for your feature or fix.
3. Commit and push your changes.
4. Submit a pull request.


## Contact

For questions or feedback, contact b.shrinidhi1214@gmail.com.
