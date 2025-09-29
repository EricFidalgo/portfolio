<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = ""; // Default XAMPP password for root (often blank)
$dbname = "housing_db"; // Must match the DB name used in tables.sql

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Fetch unique values for dropdowns
$regions = $conn->query("SELECT DISTINCT region FROM housing_regions");
$ocean_proximities = $conn->query("SELECT DISTINCT ocean_proximity FROM housing_regions");

// Handle form submission
$region = isset($_POST['region']) ? $_POST['region'] : '';
$ocean_proximity = isset($_POST['ocean_proximity']) ? $_POST['ocean_proximity'] : '';
$min_price = isset($_POST['min_price']) ? $_POST['min_price'] : '';
$max_price = isset($_POST['max_price']) ? $_POST['max_price'] : '';
$sort_direction = isset($_POST['sort']) ? $_POST['sort'] : '';

// Build the SQL query dynamically
$query = "SELECT * FROM housing_regions WHERE 1=1"; // Base query

// Safely escape user input to avoid SQL injection
if ($region) {
  $region_esc = $conn->real_escape_string($region);
  $query .= " AND region = '$region_esc'";
}
if ($ocean_proximity) {
  $ocean_esc = $conn->real_escape_string($ocean_proximity);
  $query .= " AND ocean_proximity = '$ocean_esc'";
}
if ($min_price !== '') {
  $min_price = floatval($min_price);
  $query .= " AND median_house_value >= $min_price";
}
if ($max_price !== '') {
  $max_price = floatval($max_price);
  $query .= " AND median_house_value <= $max_price";
}

// Add sorting
if ($sort_direction) {
  $query .= " ORDER BY median_house_value " . ($sort_direction === 'asc' ? 'ASC' : 'DESC');
}

// Execute the query
$result = $conn->query($query);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Housing Search</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th,
    td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    th {
      background-color: #f4f4f4;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    .sort-buttons {
      display: inline-block;
      margin-left: 10px;
    }

    .sort-buttons button {
      padding: 2px 5px;
      margin: 0 2px;
      cursor: pointer;
    }

    .active-sort {
      background-color: #007bff;
      color: white;
    }

    .map-container {
      margin: 20px 0;
      max-width: 800px;
    }

    .map-container img {
      max-width: 100%;
      height: auto;
    }

    .results-section {
      margin-top: 30px;
    }
  </style>
</head>

<body>

  <h1>Search for Houses</h1>

  <div class="map-container">
    <img src="california_edited.png" alt="California Map" style="width: 500px;">
  </div>

  <form method="POST" action="">
    <label for="region">Region:</label>
    <select name="region" id="region">
      <option value="">-- Select a Region --</option>
      <?php while ($row = $regions->fetch_assoc()): ?>
        <option value="<?php echo $row['region']; ?>" <?php if ($region == $row['region']) echo 'selected'; ?>>
          <?php echo $row['region']; ?>
        </option>
      <?php endwhile; ?>
    </select>
    <br><br>

    <label for="ocean_proximity">Ocean Proximity:</label>
    <select name="ocean_proximity" id="ocean_proximity">
      <option value="">-- Select Ocean Proximity --</option>
      <?php while ($row = $ocean_proximities->fetch_assoc()): ?>
        <option value="<?php echo $row['ocean_proximity']; ?>" <?php if ($ocean_proximity == $row['ocean_proximity']) echo 'selected'; ?>>
          <?php echo $row['ocean_proximity']; ?>
        </option>
      <?php endwhile; ?>
    </select>
    <br><br>

    <label for="min_price">Min Price:</label>
    <input type="number" name="min_price" id="min_price" placeholder="e.g., 300000"
      value="<?php echo htmlspecialchars($min_price); ?>" min="0">
    <br><br>

    <label for="max_price">Max Price:</label>
    <input type="number" name="max_price" id="max_price" placeholder="e.g., 500000"
      value="<?php echo htmlspecialchars($max_price); ?>" min="0">
    <br><br>

    <!-- Hidden field to track sort direction -->
    <input type="hidden" name="sort" id="sort" value="<?php echo htmlspecialchars($sort_direction); ?>">

    <button type="submit">Search</button>
  </form>

  <?php if (isset($result) && $result->num_rows > 0): ?>
    <div class="results-section">
      <h2>Results:</h2>
      <table>
        <tr>
          <th>Region</th>
          <th>Ocean Proximity</th>
          <th>
            Median House Value
            <div class="sort-buttons">
              <button onclick="updateSort('asc')" class="<?php echo $sort_direction === 'asc' ? 'active-sort' : ''; ?>">↑</button>
              <button onclick="updateSort('desc')" class="<?php echo $sort_direction === 'desc' ? 'active-sort' : ''; ?>">↓</button>
            </div>
          </th>
          <th>Rooms per House</th>
          <th>Bedrooms per Room</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()): ?>
          <tr>
            <td><?php echo htmlspecialchars($row['region']); ?></td>
            <td><?php echo htmlspecialchars($row['ocean_proximity']); ?></td>
            <td><?php echo '$ ' . number_format((int) $row['median_house_value']); ?></td>
            <td><?php echo round($row['rooms_per_house'], 2); ?></td>
            <td>
              <?php
              echo (isset($row['bedrooms_per_room']) && is_numeric($row['bedrooms_per_room']))
                ? round($row['bedrooms_per_room'], 2)
                : 'N/A';
              ?>
            </td>
          </tr>
        <?php endwhile; ?>
      </table>
    </div>
  <?php elseif ($_SERVER['REQUEST_METHOD'] === 'POST'): ?>
    <p>No results found.</p>
  <?php endif; ?>

  <script>
    function updateSort(direction) {
      document.getElementById('sort').value = direction;
      document.querySelector('form').submit();
    }
  </script>

  <?php $conn->close(); ?>
</body>

</html>