-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: cyberaliens
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Agreement`
--

DROP TABLE IF EXISTS `Agreement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Agreement` (
  `agreementid` bigint NOT NULL AUTO_INCREMENT,
  `vendorid` bigint NOT NULL,
  `productid` bigint NOT NULL,
  `agreementdate` date DEFAULT NULL,
  `expirydate` date DEFAULT NULL,
  `expirystatus` tinyint(1) DEFAULT '1',
  `agreementurl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` float DEFAULT NULL,
  `proposedprice` float DEFAULT NULL,
  PRIMARY KEY (`agreementid`),
  KEY `vendorid` (`vendorid`),
  KEY `productid` (`productid`),
  CONSTRAINT `Agreement_ibfk_1` FOREIGN KEY (`vendorid`) REFERENCES `Vendor` (`vendorid`),
  CONSTRAINT `Agreement_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `Product` (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Agreement`
--

LOCK TABLES `Agreement` WRITE;
/*!40000 ALTER TABLE `Agreement` DISABLE KEYS */;
INSERT INTO `Agreement` VALUES (1,1,1,'2021-03-20','2021-09-20',0,'https://sample.url',1.01,1.01),(2,2,1,'2020-12-15','2021-06-15',0,'https://sample.url',1.1,1.1),(3,3,1,'2020-10-05','2021-04-05',0,'https://sample.url',1.1,1.1),(4,4,1,'2020-03-10','2020-09-10',1,'https://sample.url',1.25,1.25),(5,5,1,'2020-04-10','2020-10-10',1,'https://sample.url',1.02,1.02),(6,6,2,'2020-10-05','2021-04-05',0,'https://sample.url',3.58,3.58),(7,7,2,'2020-01-26','2020-07-26',1,'https://sample.url',3.98,3.98),(8,8,2,'2020-12-06','2021-06-06',0,'https://sample.url',4.03,4.03),(9,9,2,'2021-01-03','2021-07-03',0,'https://sample.url',1.25,1.25),(10,10,2,'2020-10-31','2021-04-30',0,'https://sample.url',3.05,3.05),(11,11,3,'2020-10-01','2021-04-01',0,'https://sample.url',10.05,10.05),(12,12,3,'2020-12-25','2021-06-25',0,'https://sample.url',9.23,9.23),(13,13,3,'2020-11-20','2021-05-20',0,'https://sample.url',10.38,10.38),(14,14,3,'2020-12-03','2021-06-03',0,'https://sample.url',9.95,9.95),(15,15,3,'2020-09-27','2021-03-27',0,'https://sample.url',10.52,10.52),(16,5,3,'2020-04-10','2020-10-10',1,'https://sample.url',10.5,10.5),(17,2,2,'2020-09-30','2021-03-30',0,'https://sample.url',3.68,3.68);
/*!40000 ALTER TABLE `Agreement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `productid` bigint NOT NULL AUTO_INCREMENT,
  `productname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`productid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
INSERT INTO `Product` VALUES (1,'Cocoa'),(2,'Sugar'),(3,'Oil');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Vendor`
--

DROP TABLE IF EXISTS `Vendor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Vendor` (
  `vendorid` bigint NOT NULL AUTO_INCREMENT,
  `vendorname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(25) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`vendorid`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Vendor`
--

LOCK TABLES `Vendor` WRITE;
/*!40000 ALTER TABLE `Vendor` DISABLE KEYS */;
INSERT INTO `Vendor` VALUES (1,'Farmer John','123 ABC Street, Auckland','sharathct22@gmail.com','021021021'),(2,'Rohit Pande','456 DEF Street, Auckland','rohitpande@yahoo.com','021123456'),(3,'Sharath','7896 GHI Street, Auckland','thesct22@gmail.com','0212345678'),(4,'Cherian Sharath','465 XYZ Street, Auckland','cheriansharath5@gmail.com','0212345678'),(5,'Moose Machine','5432 THE Street, Auckland','the-moose-machine@outlook.com','02154394385'),(6,'Rishit Anand','7896 GHI Street, Mumbai','rishit.anand2020@vitstudent.ac.in','0212345678'),(7,'Anand Rishit','854 ABC Street, Mumbai','rishit.anand.RA@gmail.com','+919820523547'),(8,'Another Vendor','6574 HGEC Street, Coimbatore','rishitanand079@gmail.com','+919820685155'),(9,'Mohammed Amin','561 DAC Road, New Delhi','mdrushdalamin1@gmail.com','+919820665413'),(10,'Cherian Thomas','5168 AOR Road, Cochin','cherian.thomas2017@vitstudent.ac.in','+919820587411'),(11,'Rohit Amarnath Pande','456 OCH Road, Calcutta','rohitpande@yahoo.com','+919820543254'),(12,'Rhea Shastri','126 OCOH Road, Mumbai','panderohit@gmail.com','+919820543254'),(13,'Rohit Pande','543 NERC Road, Mumbai','the-moose-machine@outlook.com','+91982068735'),(14,'Pande Rohit','5463 RCEM Road, Mumbai','rohitpande@yahoo.com','+919820514641'),(15,'Super Suppliers','541 HLIS Road, Chennai','rishit.anand2020@vitstudent.ac.in','+919820543254');
/*!40000 ALTER TABLE `Vendor` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-03-20 20:06:24
