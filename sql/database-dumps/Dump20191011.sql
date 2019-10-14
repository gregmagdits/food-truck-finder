-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 54.167.10.231    Database: food_truck_finder
-- ------------------------------------------------------
-- Server version	8.0.17

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app_user`
--

LOCK TABLES `app_user` WRITE;
/*!40000 ALTER TABLE `app_user` DISABLE KEYS */;
INSERT INTO `app_user` VALUES (1,'gregmagdits',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `app_user` ENABLE KEYS */;
UNLOCK TABLES;

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
  `website` varchar(100) DEFAULT NULL,
  `photo` varchar(255) NOT NULL,
  `location` point /*!80003 SRID 4326 */ DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_truck_establishment_id` (`food_truck_establishment_id`),
  CONSTRAINT `food_truck_ibfk_1` FOREIGN KEY (`food_truck_establishment_id`) REFERENCES `food_truck_establishment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_truck`
--

LOCK TABLES `food_truck` WRITE;
/*!40000 ALTER TABLE `food_truck` DISABLE KEYS */;
INSERT INTO `food_truck` VALUES (1,'Snake-Hill','sausages and stuff','wurst bar in baltimore',NULL,'http://www.snakehillbaltimore.com/SnakeHillGrill/Home/Home.html','s3://pagoda-tech.food-truck-finder/food-truck-images/snake-hill/snake-hill.jpg',NULL,NULL,NULL,NULL,NULL),(2,'Kommie-Pig','Serves mostly pork. Made by communists','In russia, food trucks own you.',NULL,'https://kommiepig.com/index.html','s3://pagoda-tech.food-truck-finder/food-truck-images/kommie-pig/kommie-pig.jpg',NULL,NULL,NULL,NULL,NULL),(3,'Mexican-on-the-run','Made by real Mexicans','Its always time for a burrito.',NULL,NULL,'s3://pagoda-tech.food-truck-finder/food-truck-images/mexican-on-the-run/mexican-on-the-run.jpg',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `food_truck` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `food_truck_establishment`
--

LOCK TABLES `food_truck_establishment` WRITE;
/*!40000 ALTER TABLE `food_truck_establishment` DISABLE KEYS */;
/*!40000 ALTER TABLE `food_truck_establishment` ENABLE KEYS */;
UNLOCK TABLES;

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
  `photo` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `food_item_food_truck_idx` (`food_truck_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_truck_food_item`
--

LOCK TABLES `food_truck_food_item` WRITE;
/*!40000 ALTER TABLE `food_truck_food_item` DISABLE KEYS */;
INSERT INTO `food_truck_food_item` VALUES (1,2,'PLATTER OF RIBS','Served with 2 sides and our special BBQ sauce - 1/4 rack',13,NULL,NULL,NULL,NULL,NULL),(2,2,'PLATTER OF RIBS','Served with 2 sides and our special BBQ sauce - 1/2 rack',19,NULL,NULL,NULL,NULL,NULL),(3,2,'KP REUBEN','Pulled pork, sauerkraut, melted Swiss cheese, mustard and Tiger sauce, on a Kaiser roll',9,NULL,NULL,NULL,NULL,NULL),(4,2,'KP REUBEN','Ham, pulled pork, melted Swiss cheese, pickles, mustard, touch of our BBQ on Kaiser roll',10,NULL,NULL,NULL,NULL,NULL),(5,2,'CHERNOBYL','Ham, pulled pork, bacon, Tiger sauce, BBQ sauce on Hawaiian Kaiser',11,NULL,NULL,NULL,NULL,NULL),(6,2,'PULLED PORK OR SPICY PULLED CHICKEN','Served with 2 sides on a Kaiser roll Platter',12,NULL,NULL,NULL,NULL,NULL),(7,2,'PULLED PORK OR SPICY PULLED CHICKEN','Just Sandwhich',8,NULL,NULL,NULL,NULL,NULL),(8,2,'PORKY FRIES','Fries smothered in pulled pork, cheese, onions and BBQ sauce',12,NULL,NULL,NULL,NULL,NULL),(9,2,'PORKY FRIES','Fries smothered in pulled pork, cheese, onions and BBQ sauce',12,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `food_truck_food_item` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_truck_food_item_likes`
--

LOCK TABLES `food_truck_food_item_likes` WRITE;
/*!40000 ALTER TABLE `food_truck_food_item_likes` DISABLE KEYS */;
INSERT INTO `food_truck_food_item_likes` VALUES (1,3,1,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `food_truck_food_item_likes` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_truck_food_item_reviews`
--

LOCK TABLES `food_truck_food_item_reviews` WRITE;
/*!40000 ALTER TABLE `food_truck_food_item_reviews` DISABLE KEYS */;
INSERT INTO `food_truck_food_item_reviews` VALUES (1,3,1,5,'I was really drunk and ate this. OMG it was delicious',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `food_truck_food_item_reviews` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food_truck_food_truck_reviews`
--

LOCK TABLES `food_truck_food_truck_reviews` WRITE;
/*!40000 ALTER TABLE `food_truck_food_truck_reviews` DISABLE KEYS */;
INSERT INTO `food_truck_food_truck_reviews` VALUES (1,2,1,5,'Kommie pig has got fries that are out of this world',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `food_truck_food_truck_reviews` ENABLE KEYS */;
UNLOCK TABLES;

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

--
-- Dumping data for table `vendor_user`
--

LOCK TABLES `vendor_user` WRITE;
/*!40000 ALTER TABLE `vendor_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `vendor_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-11  7:23:55
