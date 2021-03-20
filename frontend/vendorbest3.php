<!DOCTYPE html>
<html>
<head>
<title>Best supplier</title>
<style>
h1{
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 300;
  text-align: center;
  margin-bottom: 15px;
}
table{
  width:100%;
  table-layout: fixed;
}
.tbl-header{
  background-color: rgba(255,255,255,0.3);
 }
.tbl-content{
  height:300px;
  overflow-x:auto;
  margin-top: 0px;
  border: 1px solid rgba(255,255,255,0.3);
}
th{
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
}
td{
  padding: 15px;
  text-align: left;
  vertical-align:middle;
  font-weight: 300;
  font-size: 12px;
  color: #fff;
  border-bottom: solid 1px rgba(255,255,255,0.1);
}



@import url(https://fonts.googleapis.com/css?family=Roboto:400,500,300,700);
body{
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
  font-family: 'Roboto', sans-serif;
}
section{
  margin: 50px;
}
</style>
</head>
<body>
<section>
<h1>Best suppliers</h1>
  <div class="tbl-header">
    <table cellpadding="0" cellspacing="0" border="0">
<thead>
<tr>
<th> Product Id</th>
<th>Vendor Id</th>
<th>Vendor Name</th>
<th> Prices </th>
</tr>
</thead>
</table>
<table cellpadding="0" cellspacing="0" border="0">
      <tbody>
<?php
$conn = mysqli_connect("remotemysql.com", "Uiz0hUNUje", "k24nEVIJ78", "Uiz0hUNUje");
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$sql = "SELECT Vendor.vendorid, vendorname, price, productid FROM Agreement INNER JOIN Vendor ON Agreement.vendorid=Vendor.vendorid ORDER BY 3 ASC";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
// output data of each row
while($row = $result->fetch_assoc()) {
echo "<tr><td>" . $row["productid"]. "</td><td>" . $row["vendorid"] . "</td><td>"
. $row["vendorname"]. "</td></tr>" . $row["price"]. "</td></tr>";
}
echo "</table>";
} else { echo "0 results"; }
$conn->close();
?>
</tbody>
</table>
<script>
    $(window).on("load resize ", function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
}).resize();
</script>
</section>
</body>
</html>