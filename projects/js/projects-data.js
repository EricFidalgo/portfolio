/* project-data.js */
const projectsData = {
"ybvr-internship": {
    title: "Data Engineering at YBVR",
    thumbnail: "./images/ybvr/main.jpg",
    meta: "Internship: May 2025 – July 2025 | Part-Time: September 2025 - June 2026",
    date: "2025-10-03",
    displayDate: "May 2025 – June 2026",
    description: "Architected a serverless ETL pipeline using Docker and Google Cloud Run to automate user analytics for VR applications, reducing reporting latency from weekly to hourly.",
    preference: 1,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content: "The legacy reporting workflow for the Xtadium application relied on a manual process: generating temporary Excel files, copying tables into a master spreadsheet, and manually updating PowerPoint slides. This workflow was error-prone, labor-intensive, and limited stakeholders to weekly updates, making it impossible to react to user behavior in real-time."
      },
      {
        type: "slideshow",
        slides: [
          {
            type: "image",
            src: "./images/ybvr/xtadium_app.png",
            alt: "Xtadium Application Screenshot"
          },
          {
            type: "image",
            src: "./images/ybvr/kibana_dashboard.png",
            alt: "BigQuery Schema and Cloud Run Architecture"
          },
          {
            type: "image",
            src: "./images/ybvr/bigquery_schema.png",
            alt: "BigQuery Schema and Cloud Run Architecture"
          }
        ]
      },
      {
        type: "section",
        title: "The Solution",
        content: "I deprecated the manual Excel workflow by engineering a fully automated, serverless ETL pipeline. I containerized the extraction logic into four distinct Docker images, each responsible for querying specific Elastic metrics and uploading them to dedicated BigQuery tables. These containers are orchestrated via Google Cloud Run and triggered by hourly cron jobs, ensuring continuous data ingestion. To visualize this data, I integrated BigQuery with Data Studio, enabling dynamic, self-updating dashboards."
      },
      {
        type: "image",
        src: "./images/ybvr/looker_dashboard.png",
        alt: "Data Studio Dashboard showing real-time metrics"
      },
      {
        type: "section",
        title: "The Impact",
        content: "The transition from manual reporting to an automated pipeline reduced data latency from weekly to hourly, providing near real-time insights. We eliminated 100% of human data entry errors and replaced static presentations with live dashboards. These tools are now the primary source of truth for key stakeholders including Meta, NBA, FOX, ESPN, NASCAR, TNT, and UFC."
      },
      {
        type: "slideshow",
        slides: [
          {
            type: "image",
            src: "./images/ybvr/looker_dashboard2.png",
            alt: "Automated engagement metrics chart"
          },
          {
            type: "image",
            src: "./images/ybvr/looker_dashboard3.png",
            alt: "Automated engagement metrics chart"
          },
          {
            type: "image",
            src: "./images/ybvr/looker_dashboard4.png",
            alt: "Automated engagement metrics chart"
          },
          {
            type: "image",
            src: "./images/ybvr/looker_dashboard5.png",
            alt: "Automated engagement metrics chart"
          }
        ]
      },
      {
        type: "section",
        title: "Technical Deep Dive",
        content: "<ul><li><strong>Serverless Architecture:</strong> Deployed 4 Dockerized Python microservices to Google Cloud Run, utilizing cron jobs for scheduled hourly execution to ensure near real-time data freshness.</li><li><strong>BigQuery Warehousing:</strong> Designed a normalized schema in BigQuery to handle over 4 million rows of session data, optimizing tables for cost-effective querying and long-term storage.</li><li><strong>Automated ETL:</strong> Wrote Python scripts to extract raw JSON from Elastic, transform it into structured Pandas DataFrames, and load it directly into BigQuery, bypassing legacy Excel steps entirely.</li><li><strong>Business Intelligence Integration:</strong> Structured the data specifically for Data Studio consumption, enabling the creation of interactive dashboards that automatically reflect the latest hourly data without human intervention.</li><li><strong>Metric Engineering:</strong> Refactored the tracking codebase to capture granular user interactions, such as party participation rates and specific VR device usage, providing deeper behavioral insights than previously possible.</li></ul>"
      }
    ],
    tools: ["Python", "Google Cloud Run", "BigQuery", "Docker", "Data Studio", "Elastic"],
    repoName: null
  },
  "house-price-prediction-model": {
    title: "House Price Prediction Model",
    thumbnail: "./images/house/main.jpg",
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
            src: "./images/house/database.png",
            alt: "Database Schema",
          },
          {
            type: "image",
            src: "./images/house/populations.png",
            alt: "Population Visualization",
          },
          {
            type: "image",
            src: "./images/house/boxes.png",
            alt: "Box Plot Visualization",
          },
          {
            type: "image",
            src: "./images/house/boxes_populations.png",
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
  "employee-api-service": {
    title: "Employee Management RESTful API",
    thumbnail: "./images/employee/main.jpg",
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
            src: "./images/employee/GET.png",
            alt: "GET Request Example",
          },
          {
            type: "image",
            src: "./images/employee/GET_ALL.png",
            alt: "GET ALL Request Example",
          },
          {
            type: "image",
            src: "./images/employee/POST.png",
            alt: "POST Request Example",
          },
          {
            type: "image",
            src: "./images/employee/UPDATE.png",
            alt: "UPDATE Request Example",
          },
          {
            type: "image",
            src: "./images/employee/DELETE.png",
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
    thumbnail: "./images/llc/main.png",
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
            src: "./images/llc/llc_webscraping_1.jpg",
            alt: "Project Screenshot 2",
          },
          {
            type: "image",
            src: "./images/llc/llc_webscraping_2.jpg",
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
  "password-server": {
    title: "Local Database with Hash Maps and Encryption",
    thumbnail: "./images/encrypt/main.png",
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
  "ovi-wellness-website": {
    title: "OVI Wellness Website & Branding",
    thumbnail: "./images/ovi/main.jpg",
    meta: "Client Project: 2026",
    date: "2026-01-01",
    displayDate: "2026",
    description:
      "Logo and a hand-built, bilingual website for a medical wellness clinic, made in two months of close work with the client.",
    preference: 6,
    contentBlocks: [
      {
        type: "section",
        title: "The Challenge",
        content:
          "OVI Wellness is a doctor-led medical wellness clinic in St. Petersburg, Florida. It offers a wide range of treatments, from hormone optimization and medical weight loss to peptide therapy, IV therapy and specialty lab testing. The clinic wanted a logo and a website that present all of these services in one place, where a prospective patient can compare the options and book a consultation.",
      },
      {
        type: "slideshow",
        slides: [
          {
            type: "image",
            src: "./images/ovi/main.jpg",
            alt: "OVI Wellness home page on a desktop screen",
          },
          {
            type: "image",
            src: "./images/ovi/phone.jpg",
            alt: "OVI Wellness home page on a phone screen",
          },
        ],
      },
      {
        type: "section",
        title: "The Solution",
        content:
          'Over two months of close collaboration with the clinic, I designed custom logo artwork and built a fully custom website from the ground up. The site gives each treatment area its own page and adds a team page, FAQs, membership plans, the clinic\'s location and hours, and a "Book Your Consultation" call to action throughout. It also includes an English and Spanish language switch and scroll animations, and it adapts to both phone and desktop screens.',
      },
      {
        type: "section",
        title: "The Impact",
        content:
          'OVI Wellness now has its own logo and a live website. Patients can browse every treatment, compare membership plans, find the clinic and book a consultation from a phone or a desktop, in English or Spanish. See the live site at <a href="https://oviwellness.com/" target="_blank" rel="noopener noreferrer">oviwellness.com</a>.',
      },
    ],
    tools: ["HTML", "CSS", "JavaScript", "Bootstrap", "GSAP"],
    repoName: null,
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = projectsData;
}
