<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> **Moodify** is a mobile application designed to enhance user well-being through personalized music recommendations based on emotional states and activities.
>
>
> By leveraging AI-driven mood analysis, Moodify creates tailored playlists, offers actionable insights, and provides emotional support through an interactive AI coach. The app aims to empower users to improve their mental well-being with seamless music integration.

### User Stories
- As a user, I want to log my mood, so the app can provide personalized music recommendations.
- As a user, I want to access activity-based playlists, so I can find music that matches my current tasks or workouts.
- As a user, I want to interact with an AI coach, so I can receive tips and challenges to enhance my emotional well-being.
- As a user, I want the app to track my mood patterns over time, so I can understand and improve my mental health.

<br><br>
<!-- Tech stack -->
<img src="./readme/title3.svg"/>

###  Moodify is built using the following technologies:

- This project uses [React](https://reactjs.org/) and [React Native](https://reactnative.dev/) for the frontend. React is used for the web admin dashboard, while React Native powers the mobile application for a seamless experience on both iOS and Android.
- For backend services, the app uses [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/). Node.js provides a scalable runtime environment, and Express.js is used to handle APIs and backend logic efficiently.
- For persistent storage (database), the app uses [PostgreSQL](https://www.postgresql.org/). PostgreSQL is a relational database that stores user data, mood logs, playlists, and activity records.
- For authentication, the app integrates [Firebase Authentication](https://firebase.google.com/docs/auth), enabling secure login with Google and other methods.
- The app follows modern design principles and uses a clean and intuitive user interface for an optimal user experience.
- The app uses the font ["Avenir Next LT Pro"](https://fontsgeek.com/fonts/avenir-next-lt-pro-regular) as its primary font, ensuring a clean and modern design for an intuitive user experience.

<br><br>
<!-- UI UX -->
<img src="./readme/title4.svg"/>


> We designed Moodify to prioritize user experience, with a clean, intuitive interface for mood tracking, playlist recommendations, and AI interactions.

- Project Figma design [figma](https://www.figma.com/design/jxAPLVYsC8L0ZPUDLYSTmV/Moodify?node-id=0-1&node-type=canvas&t=1C0GiuzVrIbosv6F-0)


### Mockups
| Mood Tracking Screen | Playlist Screen | AI Coach Interaction Screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

###  Architecting Data Excellence: Innovative Database Design Strategies:

Moodify uses [PostgreSQL](https://www.postgresql.org/), a relational database, to store and manage all application data efficiently. Below is the structure of the main tables in the database:

- **Users Table**:
  ```sql
  CREATE TABLE Users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password TEXT,
      spotify_id VARCHAR(255) UNIQUE,
      access_token TEXT,
      refresh_token TEXT,
      profile_picture TEXT,
      role ENUM('user', 'admin') NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
  );
  ```

- **SpotifyUserData Table**:
  ```sql
  CREATE TABLE SpotifyUserData (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES Users(id),
      liked_songs JSONB,
      top_artists JSONB,
      playlists JSONB,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
  );
  ```

- **SpotifyGlobalData Table**:
  ```sql
  CREATE TABLE SpotifyGlobalData (
      id SERIAL PRIMARY KEY,
      type ENUM('artist', 'track', 'album') NOT NULL,
      spotify_id VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      metadata JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT now(),
      updated_at TIMESTAMP DEFAULT now()
  );
  ```

- **MoodDetectionInputs Table**:
  ```sql
  CREATE TABLE MoodDetectionInputs (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES Users(id),
      input_type VARCHAR(50) NOT NULL,
      input_data TEXT,
      detected_mood VARCHAR(50) NOT NULL,
      timestamp TIMESTAMP DEFAULT now()
  );
  ```

- **Challenges Table**:
  ```sql
  CREATE TABLE Challenges (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES Users(id),
      text TEXT NOT NULL,
      type VARCHAR(50) NOT NULL,
      status ENUM('pending', 'completed', 'rejected') NOT NULL,
      completed_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT now()
  );
  ```

- **AIMusicSuggestions Table**:
  ```sql
  CREATE TABLE AIMusicSuggestions (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES Users(id),
      mood VARCHAR(50) NOT NULL,
      suggestion_type VARCHAR(50) NOT NULL,
      suggestion_details JSONB NOT NULL,
      environment_factors JSONB,
      created_at TIMESTAMP DEFAULT now()
  );
  ```

- **AIChallenges Table**:
  ```sql
  CREATE TABLE AIChallenges (
      id SERIAL PRIMARY KEY,
      challenge_id INT REFERENCES Challenges(id),
      environment JSONB NOT NULL,
      created_at TIMESTAMP DEFAULT now()
  );
  ```

### ER Diagram

<img src="./readme/diagram.png"/>

<br><br>


<!-- Implementation -->
<img src="./readme/title6.svg"/>


### User Screens (Mobile)
| Login screen  | Register screen | Landing screen | Loading screen |
| ---| ---| ---| ---|
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |
| Home screen  | Menu Screen | Order Screen | Checkout Screen |
| ![Landing](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) | ![fsdaf](https://placehold.co/900x1600) |

### Admin Screens (Web)
| Login screen  | Register screen |  Landing screen |
| ---| ---| ---|
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |
| Home screen  | Menu Screen | Order Screen |
| ![Landing](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) | ![fsdaf](./readme/demo/1440x1024.png) |

<br><br>


<!-- Prompt Engineering -->
<img src="./readme/title7.svg"/>

###  Mastering AI Interaction: Unveiling the Power of Prompt Engineering:

- This project uses advanced prompt engineering techniques to optimize the interaction with natural language processing models. By skillfully crafting input instructions, we tailor the behavior of the models to achieve precise and efficient language understanding and generation for various tasks and preferences.

<br><br>

<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

###  Efficient AI Deployment: Unleashing the Potential with AWS Integration:

- This project leverages AWS deployment strategies to seamlessly integrate and deploy natural language processing models. With a focus on scalability, reliability, and performance, we ensure that AI applications powered by these models deliver robust and responsive solutions for diverse use cases.

<br><br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

###  Precision in Development: Harnessing the Power of Unit Testing:

- This project employs rigorous unit testing methodologies to ensure the reliability and accuracy of code components. By systematically evaluating individual units of the software, we guarantee a robust foundation, identifying and addressing potential issues early in the development process.

<br><br>


<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up Moodify locally, follow these steps:

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [example](https://example.com)
2. Clone the repo
   ```sh
   git clone [github](https://github.com/hananeltassa/Moodify) 
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Set up PostgreSQL:
   - Create a database in PostgreSQL.
   - Add connection details (e.g., `DB_NAME`, `DB_USER`, `DB_PASSWORD`) to `.env` file.

5. Run migrations to set up the database schema:
   ```sh
   npm run migrations
   ```

6. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

Now, you should be able to run Moodify locally and explore its features.