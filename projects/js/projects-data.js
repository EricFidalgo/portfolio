/* project-data.js */
const projectsData = {
  "ybvr-internship": {
    title: "Data Science at YBVR",
    meta: "Internship: May 2025 – July 2025 | Part-Time: September 2025 - Current",
    date: "2025-10-03",
    displayDate: "May 2025 – Present",
    description:
      "Designed a user analytics system, creating Kibana dashboards and scaling a BigQuery database to track engagement for their VR Applications.",
    preference: 1,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "The user tracking system for their Xtadium and CultVRe applications were missing many different metrics to track user engagement data. This limited the company's ability to look deeper into user behavior and engagement, which hindered decisions for product development and stakeholder reporting.",
      },
      {
        type: "slideshow",
        slides: [
          {
            type: "image",
            src: "./images/xtadium_app.png",
            alt: "Xtadium Application Screenshot",
          },
          {
            type: "image",
            src: "./images/bigquery_schema.png",
            alt: "BigQuery Schema",
          },
        ],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          "As a Data Science Intern at YBVR, I redesigned the user tracking system by refactoring the code and creating new metrics to track. I developed the user analytics database on Google Big Query, scaling it to over one million rows for more advanced tracking. I also used Elastic (Kibana) to create dynamic dashboards and dataframes to visualize user engagement patterns which were then compiled into executive reports for the company and stakeholders.",
      },
      {
        type: "image",
        src: "./images/kibana_dashboard.png",
        alt: "Kibana Dashboard showing user engagement metrics",
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "The new metrics provided new insights into user engagement, directly informing the product team's strategy. The visualizations and reports are presented weekly to key stakeholders including Meta, NBA, FOX, ESPN, NASCAR, TNT, and UFC, which strengthened business relationships.",
      },
      {
        type: "image",
        src: "./images/user_engagement_chart.png",
        alt: "Chart showing user engagement over time",
      },
      {
        type: "section",
        title: "Technical Deep Dive",
        content: `<ul>
                <li>Refactored and modularized existing Python data processing scripts, replacing static, hard-coded functions with dynamic ones to improve code maintainability and allow for flexible analysis of user session data.</li>
                <li>Engineered new tracking metrics in Kibana to capture granular user interactions, including party participation rates, daily active users by VR device, and time spent in specific virtual lobbies.</li>
                <li>Automated the generation of Pandas DataFrames by creating Kibana dashboard queries, enabling programmatic data retrieval with parameters like date range and country.</li>
                <li>Led the design and implementation of a user segmentation system to classify users as "New," "Returning," or "Reactivated." This involved architecting and creating a new schema in Google BigQuery to track detailed user session data.</li>
                <li>Scaled the analytics database to over one million rows, capturing user login instances, session durations, and engagement with specific sports content (NBA, UFC, FOX). This new data powers weekly and monthly reports for key stakeholders.</li>
            </ul>`,
      },
    ],
    tools: ["Python", "Google BigQuery", "Elastic (Kibana)", "Docker"],
    repoName: null, // No repo for this one
  },
  "infix-to-postfix": {
    title: "Infix to Postfix Expression Converter",
    meta: "Completed: September 2024",
    date: "2024-09-15",
    description:
      "Built a C++ converter for mathematical expressions using a custom stack implementation, demonstrating core data structure principles.",
    preference: 8,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "Learn how to implement a stack-based approach for mathematical expression conversion while gaining a deeper understanding of the Last-In-First-Out (LIFO) principle.",
      },
      {
        type: "slideshow",
        slides: [{ type: "video", videoId: "IVdsBvC5hFk" }],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          "Created a custom stack library in C++ that follows the Last-In-First-Out (LIFO) principle to convert infix expressions (containing numbers, variables, and operators) into postfix notation. Implemented a template-based stack class to support multiple data types, showcasing proficiency in generic programming and reusable code design.",
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "Developing a custom stack class reinforced my understanding of fundamental data structures and their real-world applications.",
      },
    ],
    tools: ["C++"],
    repoName: "InfixToPostfix",
  },
  "binary-expression-tree": {
    title: "Binary Expression Tree for Postfix Evaluation",
    meta: "Completed: October 2024",
    date: "2024-10-15",
    description:
      "Implemented a binary expression tree in C++ to parse postfix expressions and convert them back to their original infix format.",
    preference: 7,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "Gain experience with binary trees by implementing an expression tree that reconstructs infix notation from postfix expressions by using recursive functions.",
      },
      {
        type: "slideshow",
        slides: [{ type: "video", videoId: "8xIQjOaIbU4" }],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          "Designed and implemented a custom binary tree library to construct an expression tree from postfix input. The program recursively traverses the tree, reconstructs a fully parenthesized infix expression, and displays the result. Additionally, it calculates and outputs the total number of nodes and leaves, reinforcing binary tree manipulation techniques.",
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "Strengthened understanding of binary tree structures, improving problem-solving skills related to hierarchical data processing. Optimized computational efficiency by 30% through the implementation of binary tree algorithms.",
      },
    ],
    tools: ["C++"],
    repoName: "BinaryExpressionTree",
  },
  "real-estate-mls": {
    title: "Real Estate Agent & Property Listings Website",
    meta: "Completed: November 2024",
    date: "2024-09-30",
    description:
      "Developed a full-stack real estate listings website with PHP and MySQL, enabling users to search for properties and view agent information.",
    preference: 9,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "Accessing and organizing real estate agent information and property listings manually can be time-consuming and inefficient, requiring a more structured and searchable solution.",
      },
      {
        type: "slideshow",
        slides: [
          {
            type: "image",
            src: "./images/house_listings.jpg",
            alt: "House Listings Screenshot",
          },
          {
            type: "image",
            src: "./images/agents.jpg",
            alt: "Agents Screenshot",
          },
          {
            type: "image",
            src: "./images/buyers.jpg",
            alt: "Buyers Screenshot",
          },
          {
            type: "image",
            src: "./images/search_houses.jpg",
            alt: "Search Houses Screenshot",
          },
        ],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          "Built a dynamic website using PHP with a MySQL backend, allowing users to efficiently query and retrieve real estate agent details and property listings. Implemented a structured database schema for optimized search performance and seamless data retrieval.",
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "Improved data accessibility by enabling users to quickly find real estate agents and property listings, enhancing user experience and reducing search time. The system ensures efficient query handling, making property searches more seamless and reliable.",
      },
    ],
    tools: ["PHP", "MySQL", "XAAMP"],
    repoName: "RealEstateMLS",
  },
  "house-price-prediction-model": {
    title: "House Price Prediction Model",
    meta: "Completed: January 2025",
    date: "2025-01-01",
    description:
      "Developed a machine learning model using Python and scikit-learn to predict California house prices with a high degree of accuracy.",
    preference: 3,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "Real estate pricing is influenced by multiple variables, making it difficult to estimate home values accurately. Manual analysis of large datasets can be inefficient and prone to inaccuracies which brings problems to the buyers, sellers, and investors.",
      },
      {
        type: "slideshow",
        slides: [
          {
            type: "image",
            src: "./images/database.png",
            alt: "Database Schema",
          },
          {
            type: "image",
            src: "./images/populations.png",
            alt: "Population Visualization",
          },
          {
            type: "image",
            src: "./images/boxes.png",
            alt: "Box Plot Visualization",
          },
          {
            type: "image",
            src: "./images/boxes_populations.png",
            alt: "Box Plot with Population",
          },
        ],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          "Built a machine learning model using Pandas, Seaborn, and scikit-learn, leveraging a Random Forest Regressor to predict median house prices across 20,000+ districts in California. The model was trained on extensive data preprocessing, including feature selection and visualization, which improved accuracy by 15%. To enhance accessibility, the dataset was uploaded to an SQL database using XAAMP, allowing users to efficiently search for properties based on location and price.",
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "The model achieved a mean absolute error (MAE) of $32,000 across all test data, providing reliable price predictions. The SQL database implementation optimized query performance, resulting in 50% faster lookups compared to traditional CSV-based searches, improving the efficiency of property analysis.",
      },
    ],
    tools: ["Python", "Machine Learning", "MySQL", "XAAMP"],
    repoName: "HousePricePredictionModel",
  },
  "course-content-creator": {
    title: "Course Content Creator",
    meta: "Completed: November 2023",
    date: "2023-11-05",
    description:
      "Applied C++ OOP principles, including aggregation and operator overloading, to build a system for managing course content.",
    preference: 11,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "Develop a robust object-oriented program utilizing key principles such as aggregation, operator overloading, and dynamic memory allocation to improve class interaction and efficiency.",
      },
      {
        type: "slideshow",
        slides: [{ type: "video", videoId: "JbU7EJcvkMU" }],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          "Designed a system with three interconnected classes, including two subclasses, to demonstrate effective class hierarchy and communication. Implemented operator overloading to streamline data processing and leveraged dynamic memory allocation for optimized resource management.",
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "Improved program efficiency by reducing redundant operations, enhancing memory management, and ensuring seamless interaction between class components.",
      },
    ],
    tools: ["C++"],
    repoName: "CourseContentCreator",
  },
  "account-balance-updater": {
    title: "Account Balance Updater",
    meta: "Completed: April 2023",
    date: "2024-04-10",
    description:
      "Engineered a Java application that uses hash maps to efficiently process and update user account data from text files.",
    preference: 10,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "Develop a program that efficiently processes and updates user account information using data structures and hashmaps.",
      },
      {
        type: "slideshow",
        slides: [{ type: "video", videoId: "1w7Hm6WRVQ0" }],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          "Implemented a Java-based system that reads user data from text files and utilizes hashmaps (mapping integers to objects) for efficient data processing. The program applies class-based structures to organize user records and outputs the updated information to two separate `.txt` files.",
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "Improved data management efficiency by leveraging hashmaps for quick lookups and updates. Strengthened understanding of Java data structures, object-oriented programming, and file I/O operations.",
      },
    ],
    tools: ["Java"],
    repoName: "AccountBalanceUpdater",
  },
  "employee-api-service": {
    title: "Employee Management RESTful API",
    meta: "Completed: October 2025",
    date: "2025-10-01",
    description:
      "Built a secure REST API with Spring Boot to bridge a hypothetical legacy system with a modern SaaS platform, enabling seamless data integration.",
    preference: 4,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "This project addresses a common integration challenge: how to connect a modern third-party SaaS platform with a company's legacy system without a full-scale migration. The goal was to build a program that allows the two systems to communicate securely and efficiently.",
      },
      {
        type: "slideshow",
        slides: [
          {
            type: "image",
            src: "./images/GET.png",
            alt: "GET Request Example",
          },
          {
            type: "image",
            src: "./images/GET_ALL.png",
            alt: "GET ALL Request Example",
          },
          {
            type: "image",
            src: "./images/POST.png",
            alt: "POST Request Example",
          },
          {
            type: "image",
            src: "./images/UPDATE.png",
            alt: "UPDATE Request Example",
          },
          {
            type: "image",
            src: "./images/DELETE.png",
            alt: "DELETE Request Example",
          },
        ],
      },
      {
        type: "section",
        title: "The Solution",
        content: `A REST API is built using Java and the Spring Boot framework to act as a bridge. This API exposes specific, secure endpoints for creating and retrieving employee information. It follows a standard layered architecture:
          <ul>
            <li><b>EmployeeController:</b> Handles the incoming web requests.</li>
            <li><b>EmployeeService:</b> Contains the core business logic.</li>
            <li><b>EmployeeRepository:</b> Manages data persistence with a database.</li>
            <li><b>Data Transfer Objects (DTOs) and Mappers:</b> Used to control and transform the data sent between the client and the database, ensuring that only necessary information is exposed.</li>
          </ul>`,
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "The resulting API successfully decouples the new SaaS platform from the legacy system. It provides a secure and scalable bridge that allows an organization to adopt modern tools without the cost and risk of a disruptive migration, demonstrating a practical approach to enterprise software integration.",
      },
    ],
    tools: ["Java", "SpringBoot", "PostMan", "Gradle"],
    repoName: "EmployeeApiService",
  },
  "llc-web-scraper": {
    title: "Florida Biz Scraper",
    meta: "Completed: July 2024",
    date: "2024-08-01",
    description:
      "Developed and sold a Python web scraping tool that automates LLC data extraction for a real estate client, secured with AWS.",
    preference: 2,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "A real estate wholesaler identified a major inefficiency in their workflow: manually retrieving and organizing LLC data from Florida's public database was time-consuming and limited their ability to scale operations. They needed an automated solution to streamline data collection for lead generation.",
      },
      {
        type: "slideshow",
        slides: [
          { type: "video", videoId: "0UrxO8MvBnE" },
          {
            type: "image",
            src: "./images/llc_webscraping_1.jpg",
            alt: "Project Screenshot 2",
          },
          {
            type: "image",
            src: "./images/llc_webscraping_2.jpg",
            alt: "Project Screenshot 3",
          },
        ],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          'In collaboration with the real estate wholesaler, I developed a Python-based web scraping application that automates the extraction of LLC ownership data from <a href="https://sunbiz.org" target="_blank">Sunbiz.org</a>. The software processes over 100 companies per minute, converting the extracted information into a structured Excel file. To meet client security requirements, I implemented a Two-Factor Authentication (2FA) system using Amazon WorkMail and URL extension removal via AWS Lambda to ensure data integrity.',
      },
      {
        type: "section",
        title: "The Impact",
        content:
          'The tool significantly reduced manual workload, increasing data retrieval efficiency by automating an otherwise tedious process. Furthermore, the project laid the groundwork for a scalable business model by establishing <a href="#" onclick="return false;"><b>https://floridabizscraper.com</b></a> <i>(inactive)</i>, with future subscription-based revenue capabilities.',
      },
      {
        type: "section",
        title: "Currently Private",
        className: "download-section",
        content:
          "I am working on publicly releasing this program for commercial use. If you would like to see this program, please contact me through any of the available platforms.",
      },
    ],
    tools: ["Python", "AWS", "BeautifulSoup", "PyQt6"],
    repoName: null,
  },
  "monoalphabetic-cipher-decryptor": {
    title: "Mono-Alphabetic Cipher Decryption",
    meta: "Completed: February 2025",
    date: "2025-02-05",
    description:
      "Created a C++ program to decrypt mono-alphabetic ciphers by implementing letter frequency analysis and dictionary mapping.",
    preference: 6,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "Create a decryption program capable of deciphering a paragraph-long encoded message encrypted using a mono-alphabetic cipher.",
      },
      {
        type: "slideshow",
        slides: [
          {
            type: "image",
            src: "./images/input.png",
            alt: "Project Screenshot 1",
          },
          {
            type: "image",
            src: "./images/output.png",
            alt: "Project Screenshot 2",
          },
        ],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          'Implemented letter frequency analysis to identify the most commonly occurring characters in the encrypted text. Mapped these characters to the most frequent letters in the English language using dictionaries to reconstruct the original message. The decryption process used a predefined key, <strong>"BUTINA"</strong>, as a reference for reversing the encryption.',
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "Successfully automated the decryption of mono-alphabetic ciphers, demonstrating proficiency in frequency analysis, dictionary-based mapping, and cryptographic principles.",
      },
    ],
    tools: ["C++"],
    repoName: "MonoalphabeticCipherDecryptor",
  },
  "password-server": {
    title: "Local Database with Hash Maps and Encryption",
    meta: "Completed: November 2024",
    date: "2024-11-15",
    description:
      "Built a secure user authentication system in C++ featuring a custom hash table and Argon2id password encryption via libsodium.",
    preference: 5,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "Develop a high-performance and secure user authentication system using a custom hash table for efficient data management.",
      },
      {
        type: "slideshow",
        slides: [{ type: "video", videoId: "0w2jQ7dA6SU" }],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          'Designed and implemented a custom hash table with file storage and dynamic rehashing, enabling efficient management of over 10,000 user accounts. Integrated the <a href="https://libsodium.org/" target="_blank">libsodium</a> library to implement Argon2id hashing, ensuring secure credential storage resistant to brute-force attacks.',
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "Optimized encryption performance by 20% compared to prior methods while significantly improving data retrieval speed, making the system highly scalable and secure.",
      },
    ],
    tools: ["C++", "Libsodium", "Argon2id"],
    repoName: "PasswordServer",
  },
  "simple-chess-simulator": {
    title: "Chess Game",
    meta: "Completed: September 2023",
    date: "2023-09-15",
    description:
      "Developed a simple chess simulator in C++ to demonstrate object-oriented programming, encapsulation, and class-based design.",
    preference: 12,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "Gain hands-on experience with object-oriented programming (OOP) by implementing classes and encapsulation principles using getter and setter functions.",
      },
      {
        type: "slideshow",
        slides: [{ type: "video", videoId: "_FmuFbDI-n4" }],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          "Developed a program that demonstrates encapsulation through the use of getter and setter methods within classes. Implemented a chessboard output to provide a visual representation of the game's state, reinforcing object interaction within the program.",
      },
      {
        type: "section",
        title: "The Impact",
        content:
          "Strengthened understanding of OOP fundamentals by applying encapsulation techniques, improving code organization, and introducing structured class-based design.",
      },
    ],
    tools: ["C++"],
    repoName: "SimpleChessSimulator",
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = projectsData;
}
