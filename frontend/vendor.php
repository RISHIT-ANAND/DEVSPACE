<!DOCTYPE html>
<html>
<head>
<title>Vendor agreement</title>
<style>
table {
border-collapse: collapse;
width: 100%;
color: #588c7e;
font-family: monospace;
font-size: 25px;
text-align: left;
}
th {
background-color: #588c7e;
color: white;
}
tr:nth-child(even) {background-color: #f2f2f2}
</style>
</head>
<body>
<table>
<tr>
<th> Product Id</th>
<th>Current date</th>
<th>Expiry date</th>
</tr>
<?php
$conn = mysqli_connect("remotemysql.com", "Uiz0hUNUje", "k24nEVIJ78", "Uiz0hUNUje");
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$sql = "select productid from Agreement where datediff((expirydate,curdate()) < 15)";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
// output data of each row
while($row = $result->fetch_assoc()) {
echo "<tr><td>" . $row["productid"]. "</td><td>" . $row["curdate"] . "</td><td>"
. $row["expirydate"]. "</td></tr>";
}
echo "</table>";
} else { echo "0 results"; }
$conn->close();
?>
</table>
</body>
</html>