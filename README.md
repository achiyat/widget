# 💻 Recommendation Widget

Welcome to visit my personal website and view my other projects:
[Click here](https://resume-achiya-tzuriel.netlify.app/)

## Overview

This project involves creating a recommendation widget using the Taboola REST API. The widget displays recommendations, both organic and sponsored, and is designed to be fully functional and extensible. The widget is implemented using vanilla JavaScript and is styled with CSS to be responsive for both desktop and mobile views.

## Features

- **Organic/sponsored recommendations**: Presentation of articles in three types of designs for the customer to choose: article, list and layers.
- **Responsive Design**: The widget adapts to various screen sizes for optimal usability on both desktop and mobile devices.
- **Extensibility**: Designed to accommodate future extension types, such as video recommendations.
  
## 📥 Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/achiyat/widget.git
    cd widget
    ```
    
2. **Set up environment variables:**
    - Create a `.env` file in the `server` directory with the following content:
    ```plaintext
    PIXABAY_API_KEY=your_pixabay_api_key
    PORT=3000
    BASE_URL=http://api.taboola.com/1.0/json/taboola-templates/recommendations.get
    ```

3. **Install dependencies:**
    ```sh
    npm install
    ```

4. **Running the Project:**
    ```sh
    npm run server
    ```

5. **Open the application:**
    - Navigate to `http://localhost:3000` in your web browser.

## 📡 API

The widget uses the Taboola REST API to fetch recommendations. You need the API key to authenticate with the API. Make sure you include your API key in your `.env` file in the backend directory.

## Testing

The project uses Mocha for testing. The tests cover data fetching, server responses, and widget functionality. Make sure you have installed all dependencies before running the tests, and that you are located in the widget folder.

**Running the Tests:**

```sh
npm test
```
    
## Future Extensions

The widget is designed to be easily extended. Future enhancements may include adding new recommendation types, such as video recommendations.

    
## 🗂️ Project Structure
```
widget/
├── client/
│   ├── css/
│   │   ├── article.css
│   │   ├── home.css
│   │   ├── layers.css
│   │   └── list.css
│   ├── js/
│   │   ├── index.js
│   │   ├── mockData.js
│   │   └── services.js
│   └── pages/
│       └── home.html
├── server/
│   └── server.js
├── test/
│   ├── dataFetching.test.js
│   ├── serverResponse.test.js
│   ├── setup.js
│   └── widget.test.js
├── .gitignore
├── package-lock.json
└── package.json
```

## 📞 Contact

📧 **Email:** [achiya308@gmail.com](mailto:achiya308@gmail.com)

🔗 **LinkedIn:** [Achiya Tzuriel](https://www.linkedin.com/in/achiya-tzuriel/)

🔗 **Personal website Link:** [Personal website](https://resume-achiya-tzuriel.netlify.app/)

🔗 **Project Link:** [widget](https://github.com/achiyat/widget)

Thanks for visiting my GitHub profile! 😊

**Achiya Tzuriel**
