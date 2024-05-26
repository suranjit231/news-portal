# News Portal

## Introduction
This project provides a comprehensive platform for managing a news portal, encompassing user management, content creation, news distribution, subscription services, notification systems, commenting, search functionality, and analytics. The platform is designed to be scalable and fault-tolerant, ensuring robust performance under varying loads.

## Features

### User Management:
- **User Types**: The system accommodates three types of users role: user, author and admin.
- **Registration**: Users can register on the platform.
- **User Authentication**: Secure login mechanisms for users.
- **Profile Management**: Users can manage their profiles.

### Content Management:

- **Article Creation**: Users can create articles.
- **Editing and Deletion**: Users can edit and delete their articles.
- **Categorization**:Articles can be categorized for better organization.

## News Distribution:

- **Publishing Articles**: Articles can be published for the public.
- **Categorization and Tagging**:Articles can be categorized and tagged for easy retrieval.

## Subscription Management:

- **Free and Paid Subscriptions**: Users can opt for free or paid subscriptions.
- **Access Control**: Control access to content based on subscription level.

## Notification Services:

- **Email Notifications**: Users receive email notifications for update password and subscribe premium plan.

## Commenting System:

- **User Comments**:Users can comment on articles delete comment and update comment on article.

## Like System:

- **User Like**: Users can like and dislike the article

## Search Functionality:

- **Search**: Users can search for articles by title, content, category, or tags.

## Analytics and Reporting:

- **Subscription Statistics**: Admin can monitor subscription metrics.
- **User Engagement**: Track user interactions and engagement.


## Tech Stack
- **Node.js**: Server-side runtime environment.
- **MongoDB**: NoSQL database for storing data.
- **JWT Authentication**: Secure authentication mechanism for user login.

## Setup
1. get clone https://github.com/suranjit231/news-portal.git.
2. Install dependencies using `npm install`.
3. Set up MongoDB database and configure connection in `connectMongoDB.js`.
4. Set up environment variable ( PORT, JWT_SECRET, News_Email, Email_Password, DB_URL)
4. Start the server using `npm start`.
5. 

##NEWS-WEBSITE
```
##Root
|           |               
|           |                            |
|           |--->databaseConnection--->  |-->mongodbConnect.js
|           |                            |
|           |
|--->src--->|               |            |-->user.controller.js   
|           |               |-->users---->|-->user.routes.js
|           |               |            |-->user.repository.js  
|           |--->feature--> |            |-->userSchema.js  
|           |               |
|           |               |            |-->article.controller.js
|           |               |-->article-->|-->article.routes.js
|           |               |            |-->article.repository.js
|           |               |            |-->articleSchema.js
|           |               |
|           |               |            |-->premium.controller.js
|           |               |-->premium-->|-->premium.routes.js
|           |               |            |-->premium.repository.js
|           |               |            |-->premiumSchema.js
|           |               |
|           |               |            |-->like.controller.js
|           |               |-->likes--->|-->like.routes.js
|           |               |            |-->like.repository.js
|           |               |            |-->likeSchema.js
|           |               |
|           |               |            |-->comment.controller.js
|           |               |-->comments-->|-->comment.routes.js
|           |               |            |-->comment.repository.js
|           |               |            |-->commentSchema.js
|           |               |
|           |               |            |-->admin.controller.js
|           |               |-->admin--->|-->admin.routes.js               
|           |               |            |-->admin.repository.js
|           |               |            
|           |               |                   |-->resetPassword.controller.js    
|           |               |-->passwordReset-->|-->resetPassword.repository.js        
|           |               |                   |-->resetPassword.routes.js
|           |               |                   |-->resetPasswordSchema.js
|           |               |            
|           |                          
|           |                                                                                                         
|           |               |-->checkAdmin.middleware.js
|           |-->middleware->|-->jwtAuth.middleware.js
|           |               |-->fileUpload.middleware.js
|           |               |-->jwtAuth.middleware.js
|           |               |-->otpVerifyToken.js
|           |
|           |
|           |
|           |--->utility--->|-->hashedPassword.js
|           |               |-->sendSubsubscriptionMail.js
|           |
|
|
|-->uploads
|-->server.js
|-->package.json
|-->package.lock.json
|-->node_module
|-->.env
|-->README.md
|
```
