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
<th> Vendor ID</th>
<th> Vendor Name</th>
<th> Vendor Phone</th>
<th> Vendor Email</th>
<th> Product ID</th>
<th> Product Name</th>
<th>Signing date</th>
<th>Expiry date</th>
<th>Price</th>
<th>Pickup</th>
</tr>
<?php
$conn = mysqli_connect("remotemysql.com", "Uiz0hUNUje", "k24nEVIJ78", "Uiz0hUNUje");
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
$sqlvendor = "select returnedid,vp.vpid as vpid,vendorname,email,phone,vp.vendorid as vendorid from returned left join vp on returned.vpid=vp.vpid left join Vendor on vp.vendorid=Vendor.vendorid where vp.vpid in(select returned.vpid from returned)";
$sqlproduct = "select productname,Product.productid as productid from returned left join vp on returned.vpid=vp.vpid left join Product on vp.productid=Product.productid where vp.vpid in(select vpid from returned)";
$sqlreturn = "select agreementdate,expirydate,price,collect from returned";
$resultvendor = $conn->query($sqlvendor);
$resultproduct = $conn->query($sqlproduct);
$resultreturn = $conn->query($sqlreturn);

if ($resultreturn->num_rows > 0) {
// output data of each row

$myArray[] = null; 
$i=0;
while($row = $resultvendor->fetch_assoc()) {

    $myArray[$i]->vendorid = $row["vendorid"];
    $myArray[$i]->vendorname = $row["vendorname"];
    $myArray[$i]->email = $row["email"];
    $i=$i+1;
}
$i=0;
while($row = $resultproduct->fetch_assoc()) {
    $myArray[$i]->productid = $row["productid"];
    $myArray[$i]->productname = $row["productname"];
    $i=$i+1;
}
$i=0;
while($row = $resultreturn->fetch_assoc()) {
    $myArray[$i]->agreementdate = $row["agreementdate"];
    $myArray[$i]->expirydate = $row["expirydate"];
    $myArray[$i]->price = $row["price"];
    $myArray[$i]->collect = $row["collect"];
    $i=$i+1;
}
foreach($myArray as $val){
    echo "<tr><td>" . $val->vendorid . "</td><td>" . $val->vendorid . "</td><td>"
. $val->email . "</td><td>" . $val->productid . "</td><td>" . $val->productname . "</td><td>"
. $val->agreementdate . "</td><td>" . $val->expirydate . "</td><td>"
. $val->price . "</td><td>" . $val->collect . "</td></tr>";
}
echo "</table>";
} else { echo "0 results"; }
$conn->close();
?>
</table>
</body>
</html>