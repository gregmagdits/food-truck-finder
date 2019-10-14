CREATE DATABASE  IF NOT EXISTS `food_truck_finder` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `food_truck_finder`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 54.209.1.45    Database: food_truck_finder
-- ------------------------------------------------------
-- Server version	5.5.62

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
-- Table structure for table `app_user`
--

DROP TABLE IF EXISTS `app_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `food_truck`
--

DROP TABLE IF EXISTS `food_truck`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food_truck` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `tag_line` varchar(100) NOT NULL,
  `food_truck_establishment_id` int(11) DEFAULT NULL,
  `website` varchar(100) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `location` point /*!80003 SRID 4326 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_truck_establishment_id` (`food_truck_establishment_id`),
  CONSTRAINT `food_truck_ibfk_1` FOREIGN KEY (`food_truck_establishment_id`) REFERENCES `food_truck_establishment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `food_truck_establishment`
--

DROP TABLE IF EXISTS `food_truck_establishment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food_truck_establishment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `food_truck_food_item`
--

DROP TABLE IF EXISTS `food_truck_food_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food_truck_food_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `food_truck_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `photo` varchar(255) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_item_food_truck_idx` (`food_truck_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `food_truck_food_item_likes`
--

DROP TABLE IF EXISTS `food_truck_food_item_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food_truck_food_item_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `food_item_id` int(11) NOT NULL,
  `app_user_id` int(11) NOT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `app_user_id` (`app_user_id`),
  KEY `likes_food_item_idx` (`food_item_id`),
  CONSTRAINT `food_truck_food_item_likes_ibfk_1` FOREIGN KEY (`food_item_id`) REFERENCES `food_truck_food_item` (`id`),
  CONSTRAINT `food_truck_food_item_likes_ibfk_2` FOREIGN KEY (`app_user_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `food_truck_food_item_reviews`
--

DROP TABLE IF EXISTS `food_truck_food_item_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food_truck_food_item_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `food_item_id` int(11) NOT NULL,
  `app_user_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_item_id` (`food_item_id`),
  KEY `app_user_id` (`app_user_id`),
  CONSTRAINT `food_truck_food_item_reviews_ibfk_1` FOREIGN KEY (`food_item_id`) REFERENCES `food_truck_food_item` (`id`),
  CONSTRAINT `food_truck_food_item_reviews_ibfk_2` FOREIGN KEY (`app_user_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `food_truck_food_truck_reviews`
--

DROP TABLE IF EXISTS `food_truck_food_truck_reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `food_truck_food_truck_reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `food_truck_id` int(11) NOT NULL,
  `app_user_id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `review` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_truck_id` (`food_truck_id`),
  KEY `app_user_id` (`app_user_id`),
  CONSTRAINT `food_truck_food_truck_reviews_ibfk_1` FOREIGN KEY (`food_truck_id`) REFERENCES `food_truck` (`id`),
  CONSTRAINT `food_truck_food_truck_reviews_ibfk_2` FOREIGN KEY (`app_user_id`) REFERENCES `app_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `vendor_user`
--

DROP TABLE IF EXISTS `vendor_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vendor_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `food_truck_establishment_id` int(11) DEFAULT NULL,
  `phone_number` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_truck_establishment_id` (`food_truck_establishment_id`),
  CONSTRAINT `vendor_user_ibfk_1` FOREIGN KEY (`food_truck_establishment_id`) REFERENCES `food_truck_establishment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-06  9:38:28
