# 🌦️ AeroWeather

AeroWeather is a lightweight weather application built using vanilla JavaScript that demonstrates real-world API handling, asynchronous programming, and UI interactivity.

---

## 🚀 Project Overview

AeroWeather allows users to search for any city and get real-time weather data along with a 24-hour temperature average. It integrates geocoding and weather APIs to provide accurate, location-based forecasts.

---

## 🧠 What I Learned

This project focused heavily on **asynchronous JavaScript concepts**:

* ✅ Mastered **Promises** and how API calls return asynchronous data
* ✅ Implemented **async/await** across multiple chained API calls
* ✅ Understood **error handling** using `try/catch` in async functions
* ✅ Learned **debouncing (300ms delay)** to optimize API requests
* ✅ Improved understanding of **DOM manipulation + async data flow**

---

## 🔢 Key Project Metrics

* 📡 **2 APIs integrated**

  * Open-Meteo Geocoding API
  * Open-Meteo Weather API

* ⚡ **5+ async functions implemented**

  * `getCoordinates()`
  * `getGeocodingSuggestions()`
  * `getWeather()`
  * `processWeatherForLocation()`
  * `init()`

* 🔁 **300ms debounce delay** for search optimization

* 🌍 **Up to 5 location suggestions** per query

* 🌡️ **24-hour temperature dataset processed**

* 📊 **1 computed metric**: average temperature using array reduction

---

## 🏗️ Features

### 🔍 Smart Search with Suggestions

* Real-time city suggestions while typing
* Debounced API calls (reduces unnecessary requests)

### 🌦️ Weather Data Display

* Current temperature
* Weather condition description
* Location name and country

### 📈 Data Processing

* Calculates **24-hour average temperature** using:

  ```js
  nums.reduce((acc, num) => acc + num, 0) / nums.length;
  ```

### ⚙️ Default Load

* Loads weather for **Mumbai (19.0728, 72.8826)** on startup

---

## 🔧 Tech Stack

* **JavaScript (ES6+)**
* **Fetch API**
* **HTML + CSS**
* **Open-Meteo API**

---

## 🧩 Core Logic Flow

1. User types a city name
2. Debounced input triggers geocoding suggestions
3. User selects a location or presses enter
4. Coordinates are fetched
5. Weather API is called using latitude & longitude
6. UI updates with:

   * Temperature
   * Description
   * 24-hour average

---

## ⚠️ Error Handling

* Displays message when:

  * City is not found
  * API request fails
* Prevents empty search submissions

---

## 📚 Key Concepts Practiced

* Asynchronous data flow
* API chaining
* Event-driven programming
* Array manipulation (`reduce`)
* UI state management

---

## 📌 Future Improvements

* Add 7-day forecast
* Add loading spinner
* Improve UI/UX animations
* Store recent searches

---

## 🏁 Conclusion

AeroWeather is a strong foundation project that demonstrates practical usage of **Promises, async/await, and API integration**, along with performance optimization techniques like debouncing and efficient data handling.

---
