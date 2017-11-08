-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: portal_yii2
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audit_requests`
--

DROP TABLE IF EXISTS `audit_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audit_requests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `db_id` int(11) DEFAULT NULL,
  `sb_id` varchar(45) DEFAULT NULL,
  `old_status` varchar(45) DEFAULT NULL,
  `new_status` varchar(45) DEFAULT NULL,
  `old_driver_id` int(11) DEFAULT NULL,
  `new_driver_id` int(11) DEFAULT NULL,
  `old_workgroup_id` int(11) DEFAULT NULL,
  `new_workgroup_id` int(11) DEFAULT NULL,
  `old_assignee` varchar(250) DEFAULT NULL,
  `new_assignee` varchar(250) DEFAULT NULL,
  `old_ride_start_time` int(11) DEFAULT NULL,
  `new_ride_start_time` int(11) DEFAULT NULL,
  `old_ride_end_time` int(11) DEFAULT NULL,
  `new_ride_end_time` int(11) DEFAULT NULL,
  `old_ride_duration` varchar(250) DEFAULT NULL,
  `new_ride_duration` varchar(250) DEFAULT NULL,
  `old_ride_distance` varchar(250) DEFAULT NULL,
  `new_ride_distance` varchar(250) DEFAULT NULL,
  `old_ride_idle_time` varchar(250) DEFAULT NULL,
  `new_ride_idle_time` varchar(250) DEFAULT NULL,
  `old_ride_price` varchar(250) DEFAULT NULL,
  `new_ride_price` varchar(250) DEFAULT NULL,
  `old_solution` text,
  `new_solution` text,
  `old_closure_code` int(11) DEFAULT NULL,
  `new_closure_code` int(11) DEFAULT NULL,
  `date_edit` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audit_requests`
--

LOCK TABLES `audit_requests` WRITE;
/*!40000 ALTER TABLE `audit_requests` DISABLE KEYS */;
INSERT INTO `audit_requests` VALUES (7,4,60,'SD105963525','2','2',NULL,16,5,5,'4','4',1509014994,1509014994,NULL,NULL,'null','null','','','null','null','null','null','Водитель:Петров Олег Валерьевич\nтел.79607778899  bmw белый A584ЕН','Водитель:Петров Олег Валерьевич\nтел.79607778899  bmw белый A584ЕН',1,1,1510121466),(8,4,60,'SD105963525','2','2',16,16,5,5,'4','4',1509014994,1509014994,NULL,NULL,'null','null','null','null','null','null','null','','Водитель:Петров Олег Валерьевич\nтел.79607778899  bmw белый A584ЕН','Клиент ждёт\nВодитель:Петров Олег Валерьевич\nтел.79607778899  bmw белый A584ЕН',1,1,1510121494),(9,4,60,'SD105963525','2','5',16,16,5,5,'4','4',1509014994,1510127745,NULL,NULL,'null','null','null','null','null','null','null','','Клиент ждёт\nВодитель:Петров Олег Валерьевич\nтел.79607778899  bmw белый A584ЕН','Клиент ждёт\nВодитель:Петров Олег Валерьевич\nтел.79607778899  bmw белый A584ЕН\nВодитель:Третьяк Леонид Иванович\nтел.79601554545  BMW БЕЛЫЙ номер',1,1,1510127745),(10,4,60,'SD105963525','5','7',16,16,5,5,'4','4',1510127745,1510127745,NULL,1510127802,'null','23:42','null','234','null','23:42','null','234324','Клиент ждёт\nВодитель:Петров Олег Валерьевич\nтел.79607778899  bmw белый A584ЕН\nВодитель:Третьяк Леонид Иванович\nтел.79601554545  BMW БЕЛЫЙ номер','Клиент ждёт\nВодитель:Петров Олег Валерьевич\nтел.79607778899  bmw белый A584ЕН\nВодитель:Третьяк Леонид Иванович\nтел.79601554545  BMW БЕЛЫЙ номер',1,1,1510127802),(11,4,84,'SD106054350','2','2',NULL,16,5,5,'4','4',1505481600,1505481600,NULL,NULL,'null','null','','','null','null','null','null','null','null',NULL,NULL,1510128754),(12,4,79,'SD106052401','2','2',NULL,NULL,5,5,NULL,'4',1505478900,1505478900,NULL,NULL,'null','null','','','null','null','null','null','null','null',NULL,NULL,1510132061),(13,4,80,'SD106052991','2','5',0,16,5,5,NULL,'4',1505481300,1510132336,NULL,NULL,'null','null','null','null','null','null','null','null','null','Водитель:Третьяк Леонид Иванович\nтел.79601554545  BMW БЕЛЫЙ номер',NULL,1,1510132336),(14,4,80,'SD106052991','5','8',16,16,5,5,'4','4',1510132336,1510132336,NULL,1510132371,'null','null','null','null','null','null','null','','Водитель:Третьяк Леонид Иванович\nтел.79601554545  BMW БЕЛЫЙ номер','Заявка отозвана по звонку',1,4,1510132371),(15,4,82,'SD106053222','2','2',NULL,NULL,5,5,NULL,'4',1505481600,1505481600,NULL,NULL,'null','null','null','null','null','null','null','null','null','null',NULL,NULL,1510132648),(16,4,81,'SD106053030','2','5',0,16,5,5,NULL,'4',1505482200,1510133029,NULL,NULL,'null','null','null','null','null','null','null','null','null','Водитель:Третьяк Леонид Иванович\nтел.79601554545  BMW БЕЛЫЙ номер',NULL,1,1510133029),(17,4,81,'SD106053030','5','7',16,16,5,5,'4','4',1510133029,1510133029,NULL,1510133054,'null','12:32','null','213','null','21:32','null','213213','Водитель:Третьяк Леонид Иванович\nтел.79601554545  BMW БЕЛЫЙ номер','Водитель:Третьяк Леонид Иванович\nтел.79601554545  BMW БЕЛЫЙ номер',1,1,1510133055);
/*!40000 ALTER TABLE `audit_requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-08 12:47:14
