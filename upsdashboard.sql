-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 04, 2016 at 03:31 PM
-- Server version: 5.0.45-community-nt
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `upsdashboard`
--
CREATE DATABASE IF NOT EXISTS `upsdashboard` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `upsdashboard`;

-- --------------------------------------------------------

--
-- Table structure for table `dashboarddetails`
--

CREATE TABLE IF NOT EXISTS `dashboarddetails` (
  `id` int(10) NOT NULL auto_increment,
  `dashboardname` varchar(50) NOT NULL,
  `projectnameid` int(10) NOT NULL,
  `templateid` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=273 ;

--
-- Dumping data for table `dashboarddetails`
--

INSERT INTO `dashboarddetails` (`id`, `dashboardname`, `projectnameid`, `templateid`) VALUES
(265, 'dash1', 1, 1),
(266, 'dsada', 1, 1),
(267, 'sdfsdf', 1, 2),
(268, 'asdasdsadsadasdsadsa', 1, 1),
(269, 'asdsadasd', 1, 1),
(270, 'Dash', 1, 1),
(271, 'Dash', 1, 1),
(272, 'Dash', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `dashboardgroups`
--

CREATE TABLE IF NOT EXISTS `dashboardgroups` (
  `id` int(10) NOT NULL auto_increment,
  `dashboardid` int(10) NOT NULL,
  `groupid` int(10) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=10 ;

--
-- Dumping data for table `dashboardgroups`
--

INSERT INTO `dashboardgroups` (`id`, `dashboardid`, `groupid`) VALUES
(1, 268, 2),
(2, 269, 10),
(4, 271, 3),
(5, 272, 3),
(9, 270, 3);

-- --------------------------------------------------------

--
-- Table structure for table `defectdetails`
--

CREATE TABLE IF NOT EXISTS `defectdetails` (
  `id` int(10) NOT NULL auto_increment,
  `defectid` varchar(50) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `raiseddate` datetime NOT NULL,
  `severity` varchar(50) NOT NULL,
  `priority` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `projectid` varchar(100) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Dumping data for table `defectdetails`
--

INSERT INTO `defectdetails` (`id`, `defectid`, `description`, `raiseddate`, `severity`, `priority`, `status`, `projectid`) VALUES
(1, 'UPS-1', 'test data', '2016-04-14 11:32:33', 'Critical', 'High', 'Open', 'OCCG'),
(2, 'UPS-2', 'test data 2', '2016-04-14 15:29:26', 'Critical', 'low', 'Open', 'OCCG'),
(3, 'UPS-3', 'test data 3', '2016-04-16 11:25:00', 'Major', 'High', 'Closed', 'OCCG'),
(4, 'UPS-4', 'test data 4', '2016-04-18 16:27:11', 'Major', 'Medium', 'Reopened', 'OCCG');

-- --------------------------------------------------------

--
-- Table structure for table `groupaccess`
--

CREATE TABLE IF NOT EXISTS `groupaccess` (
  `id` int(11) NOT NULL auto_increment,
  `groupaccessid` int(11) NOT NULL,
  `groupid` int(11) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Dumping data for table `groupaccess`
--

INSERT INTO `groupaccess` (`id`, `groupaccessid`, `groupid`) VALUES
(1, 1, 29),
(2, 2, 29),
(3, 1, 30),
(4, 1, 31),
(5, 1, 32),
(6, 1, 33),
(7, 1, 34),
(8, 1, 35),
(9, 2, 35),
(10, 1, 36),
(11, 2, 36),
(15, 1, 6),
(16, 1, 3),
(17, 1, 15),
(18, 1, 37),
(19, 2, 37),
(21, 1, 38),
(24, 1, 39),
(25, 2, 39);

-- --------------------------------------------------------

--
-- Table structure for table `groupaccesslist`
--

CREATE TABLE IF NOT EXISTS `groupaccesslist` (
  `id` int(10) NOT NULL auto_increment,
  `modulename` varchar(50) NOT NULL,
  `accessname` varchar(50) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `groupaccesslist`
--

INSERT INTO `groupaccesslist` (`id`, `modulename`, `accessname`) VALUES
(1, 'Manage User', 'Create'),
(2, 'Manage User', 'Edit');

-- --------------------------------------------------------

--
-- Table structure for table `groupdetails`
--

CREATE TABLE IF NOT EXISTS `groupdetails` (
  `id` int(10) NOT NULL auto_increment,
  `groupname` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

--
-- Dumping data for table `groupdetails`
--

INSERT INTO `groupdetails` (`id`, `groupname`, `description`) VALUES
(1, '".$groupname."', '".$description."'),
(2, 'asdsadasd', 'sadsad'),
(3, 'Blesswin', 'adsdksa'),
(4, 'asdsad', 'asdsadsd'),
(5, 'asdsad', 'sadsadas'),
(6, 'Bless', 'sadsadfsdf'),
(7, 'dasd', 'asdsad'),
(8, 'dasdsda', 'asdsad'),
(9, 'asdsa', 'sadasd'),
(10, 'sadsad', 'asdsad'),
(11, 'testing', 'sadsad');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE IF NOT EXISTS `members` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` char(128) NOT NULL,
  `salt` char(128) NOT NULL,
  `reset` varchar(1) NOT NULL,
  `token` int(20) NOT NULL,
  `created_on` datetime default NULL,
  `updated_on` datetime default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=61 ;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `username`, `email`, `password`, `salt`, `reset`, `token`, `created_on`, `updated_on`) VALUES
(37, 'Blesswin', 'blesswinprince@gmail.com', '18c8d1e30a84e3f456b2e135926d47c1455c78879ced331a906d591da5ec53f2', '29f6621b7d6d7a67', 'N', 0, '2015-05-24 13:33:43', '2015-07-26 18:00:07'),
(60, 'Dolly', 'dolly.pathak@cognizant.com', '696c1f6ab59ee426f391326e91caf9013fc6482aef1406dde975902b8ca89c92', '459f05d1e59f234', 'N', 0, '2015-07-26 15:02:02', '2015-07-26 18:21:17');

-- --------------------------------------------------------

--
-- Table structure for table `projectdetails`
--

CREATE TABLE IF NOT EXISTS `projectdetails` (
  `id` int(10) NOT NULL auto_increment,
  `projectname` varchar(50) NOT NULL,
  `qeamanager` varchar(50) NOT NULL,
  `applicationname` varchar(50) NOT NULL,
  `releasenumber` varchar(50) NOT NULL,
  `designinterface` varchar(50) NOT NULL,
  `designdomain` varchar(50) NOT NULL,
  `designproject` varchar(50) NOT NULL,
  `designpath` varchar(500) NOT NULL,
  `executioninterface` varchar(50) NOT NULL,
  `executiondomain` varchar(50) NOT NULL,
  `executionproject` varchar(50) NOT NULL,
  `executionpath` varchar(500) NOT NULL,
  `defectsinterface` varchar(50) NOT NULL,
  `defectsdomain` varchar(50) NOT NULL,
  `defectsproject` varchar(50) NOT NULL,
  `defectspath` varchar(500) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=17 ;

--
-- Dumping data for table `projectdetails`
--

INSERT INTO `projectdetails` (`id`, `projectname`, `qeamanager`, `applicationname`, `releasenumber`, `designinterface`, `designdomain`, `designproject`, `designpath`, `executioninterface`, `executiondomain`, `executionproject`, `executionpath`, `defectsinterface`, `defectsdomain`, `defectsproject`, `defectspath`) VALUES
(1, 'UPS', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(2, 'Hoegh Autoliners', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''),
(3, 'kjbkb', 'kjbkjb', 'jbjkbkb', 'kjbkjbk', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(4, 'kjbkb11', 'kjbkjb', 'jbjkbkb', 'kjbkjbk', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(5, 'Bless', 'kjbkjb', 'SAMS', '3.0', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(6, 'klnkbn', 'kbnkjb', 'kjjbkjb', 'kbkbjk', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(7, 'jbjhvbj', 'jhvjhv', 'jhvjhv', 'jhhvjhv', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(8, 'kbkjbkjbkjb', 'jhvkjvjv', 'jhvjhv', 'jvhjhv', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(9, 'kjbkjbk', 'kjbkjb', 'kjbkjb', 'kjbkjb', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(10, 'kjjbkjb', 'kbjkjb', 'kbkjb', 'kbkjb', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(11, 'Proejectname', 'manager', 'application', 'release', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(12, 'test data', '1654654', '654654', '654654', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(13, 'asdsad', 'sadsa', 'sadasd', 'sadsad', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(14, 'asdsadadq32qd3', 'sadasda', 'adsad', 'r23', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(15, 'new project', 'new project', 'sadkszfha', 'dflkhsdklh', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', ''),
(16, 'testerabcd', '565', 'jgfhf', 'jhfhf', 'Quality Center', '', '', '', 'Quality Center', '', '', '', 'Quality Center', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `projectgroups`
--

CREATE TABLE IF NOT EXISTS `projectgroups` (
  `id` int(10) NOT NULL auto_increment,
  `projectid` int(10) NOT NULL,
  `groupid` int(10) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `projectgroups`
--

INSERT INTO `projectgroups` (`id`, `projectid`, `groupid`) VALUES
(1, 14, 3),
(2, 15, 3),
(5, 16, 3);

-- --------------------------------------------------------

--
-- Table structure for table `querydetails`
--

CREATE TABLE IF NOT EXISTS `querydetails` (
  `id` int(10) NOT NULL auto_increment,
  `queryname` varchar(50) NOT NULL,
  `chartname` varchar(50) NOT NULL,
  `searchquery` varchar(5000) NOT NULL,
  `charttype` varchar(50) NOT NULL,
  `ucl` varchar(50) NOT NULL,
  `lcl` varchar(50) NOT NULL,
  `xaxis` varchar(50) NOT NULL,
  `yaxis` varchar(50) NOT NULL,
  `notes` varchar(500) NOT NULL,
  `dashboardid` int(10) NOT NULL,
  `projectid` int(10) NOT NULL,
  `sectionid` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=125 ;

--
-- Dumping data for table `querydetails`
--

INSERT INTO `querydetails` (`id`, `queryname`, `chartname`, `searchquery`, `charttype`, `ucl`, `lcl`, `xaxis`, `yaxis`, `notes`, `dashboardid`, `projectid`, `sectionid`, `type`) VALUES
(116, 'sfhsdj', 'afjgsdjg', 'select count(*) from defectdetails', 'Meter Gauge', '4', '8', '0', '10', '', 265, 1, 'cell01', 'query'),
(117, 'sdsad', 'asdasd', 'select count(*) from defectdetails', 'Value', '', '', '', '', '', 265, 1, 'cell02', 'query'),
(118, 'adasd', 'sadsad', 'select CAST(raiseddate AS DATE), count(*) from defectdetails group by CAST(raiseddate AS DATE)', 'Bar Chart', '', '', '', '', '', 265, 1, 'cell03', 'query'),
(119, 'dasdasd', 'dasdsa', 'select priority, count(*) from defectdetails group by priority', 'Pie Chart', '', '', '', '', '', 265, 1, 'cell04', 'query'),
(120, 'dADSAD', 'SADSAD', 'SELECT pRIORITY, COUNT(*) FROM DEFECTDETAILS GROUP BY priority', 'Donut Chart', '', '', '', '', '', 265, 1, 'cell05', 'query'),
(121, 'FJSDFBJKSDB', 'FSAKJSAFJK', 'select CAST(raiseddate AS DATE), count(*) from defectdetails group by CAST(raiseddate AS DATE)', 'Line Chart', '', '', 'Dateseries', '', '', 265, 1, 'cell06', 'query'),
(122, 'fsdfsd', 'sdfsd', 'select CAST(raiseddate AS DATE), count(*) from defectdetails group by CAST(raiseddate AS DATE)', 'Line Chart', '', '', 'Seriestilldate', '', '', 265, 1, 'cell07', 'query'),
(123, 'sadas', 'sadsa', 'Select description, priority, id, count(*) from defectdetails group by priority', 'Stacked Bar Chart', '', '', '', '', '', 265, 1, 'cell08', 'query'),
(124, 'adsad', 'sadsad', 'select priority, count(*) from defectdetails group by priority', 'Pie Chart', '', '', '', '', '', 270, 1, 'cell01', 'query');

-- --------------------------------------------------------

--
-- Table structure for table `templatelist`
--

CREATE TABLE IF NOT EXISTS `templatelist` (
  `id` int(10) NOT NULL auto_increment,
  `templatename` varchar(50) NOT NULL,
  `templatedetails` longtext NOT NULL,
  `image` blob NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

--
-- Dumping data for table `templatelist`
--

INSERT INTO `templatelist` (`id`, `templatename`, `templatedetails`, `image`) VALUES
(1, 'Quarter Grid', '<div class=''container-fluid''>\n<div class=''row''>\n<div class=''col-sm-6 col-md-3'' id=''cell01''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell01chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell01'');></span></div><div data-id=''cell01'' id=''cell01canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n<div class=''col-sm-6 col-md-3'' id=''cell02''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell02chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell02'');></span></div><div data-id=''cell02'' id=''cell02canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n<div class=''col-sm-6 col-md-3'' id=''cell03''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell03chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell03'');></span></div><div data-id=''cell03'' id=''cell03canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n<div class=''col-sm-6 col-md-3'' id=''cell04''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell03chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell04'');></span></div><div data-id=''cell04'' id=''cell04canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n</div>\n<div class=''row''>\n<div class=''col-sm-6 col-md-3'' id=''cell05''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell05chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell05'');></span></div><div data-id=''cell05'' id=''cell05canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n<div class=''col-sm-6 col-md-3'' id=''cell06''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell06chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell06'');></span></div><div data-id=''cell06'' id=''cell06canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n<div class=''col-sm-6 col-md-3'' id=''cell07''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell07chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell07'');></span></div><div data-id=''cell07'' id=''cell07canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n<div class=''col-sm-6 col-md-3'' id=''cell08''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell08chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell08'');></span></div><div data-id=''cell08'' id=''cell08canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n</div>\n<div class=''row''>\n<div class=''col-sm-6 col-md-3'' id=''cell09''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell09chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell09'');></span></div><div data-id=''cell09'' id=''cell09canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n<div class=''col-sm-6 col-md-3'' id=''cell10''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell10chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell10'');></span></div><div data-id=''cell10'' id=''cell10canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n<div class=''col-sm-6 col-md-3'' id=''cell11''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell11chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell11'');></span></div><div data-id=''cell11'' id=''cell11canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n<div class=''col-sm-6 col-md-3'' id=''cell11''><div class=''chart-wrapper''><div class=''chart-title''><span id=''cell12chartname''>Cell Title</span><span class=''pull-right hidden-xs fa fa-plus'' onclick=addquery(''cell12'');></span></div><div data-id=''cell12'' id=''cell12canvas'' class=''chart-stage'' style=''min-height:200px;min-width:25%;''></div><div class=''chart-notes''>Notes about this chart</div></div></div>\n</div>\n</div>', 0x89504e470d0a1a0a0000000d49484452000002580000017c0803000000246d35530000001974455874536f6674776172650041646f626520496d616765526561647971c9653c0000000f504c5445f6f7f7eceef0e4e6e9ffffffdbdee16b116f4f000004854944415478daecdac10d80400845c155ecbf66af788704e250c1cbfeb9e979265da413b63aec782661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60792661600903cb7e60d94f1858c2c0b21f58f613069630b0ec0796fd8481250c2cfb81653f61600903cb7e60d94f1858c2c0b21f58f613069630b0ec0796fd8481250c2cfb81653f61600903cb7e60d94f1858c2c0b21f58f613069630b08481653f616009034b1858f613069630b08481653f616009034b1858f613069630b08481653f6160096b8315ce351c580e2c079603cb39b01c580e2ce7c0726039b09c03cb81e5c072ae0ed635e97299b0d561fec712e6473f6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2ccf240c2c6160d90f2cfb09034b1858f603cb7ec2c0120696fdc0b29f30b08481653fb0ec270c2c6160d90f2cfb09034b1858f603cb7ec2c0120696fdc0b29f30b08481653fb0ec270c2c6160d90f2cfb09034b1858f603cb7ec2c012069630b0ec270c2c61600903cb7ec2c012069630b0ec270c2c61600903cb7ec2c012069630b0ec270c2c617db0ee49979f49d8eab013ce351c580e2c079603cb39b01c580e2ce7c0726039b09c03cb81e5c072ae0e96bf8b84f9d14f1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb7ec2c0120696fdc0b29f30b08481653fb0ec270c2c6160d90f2cfb09034b1858f603cb7ec2c0120696fdc0b29f30b08481653fb0ec270c2c6160d90f2cfb09034b1858f603cb7ec2c0120696fdc0b29f30b08481250c2cfb09034b1858c2c0b29f30b08481250c2cfb09034b1858c2c0b29f30b08481250c2cfb09034b1858c276c11a75f99984ad0efb943957756039b01c580e2ce7c0726039b09c03cb81e5c0720e2c0796fb292cdfea85b59cbf8b84f9d14f1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb3309034b1858f603cb7ec2c0120696fdc0b29f30b08481653fb0ec270c2c6160d90f2cfb09034b1858f603cb7ec2c0120696fdc0b29f30b08481653fb0ec270c2c6160d90f2cfb09034b1858f603cb7ec2c0120696fdc0b29f30b08481250c2cfb09034b1858c2c0b29f30b08481250c2cfb09034b1858c2c0b29f30b08481250c2cfb09034b1858c25685bd020c00034a3edcd9fad6e70000000049454e44ae426082),
(2, 'Hero Sidebar', '  <div class=''container-fluid''>\r\n\r\n    <div class=''row''>\r\n      <div class=''col-sm-3''>\r\n        <div class=''chart-wrapper''>\r\n          <div class=''chart-title''>\r\n            Cell Title\r\n          </div>\r\n          <div class=''chart-stage''>\r\n            <img data-src=''holder.js/100%x650/white''>\r\n          </div>\r\n          <div class=''chart-notes''>\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=''col-sm-9''>\r\n        <div class=''row''>\r\n          <div class=''col-sm-12''>\r\n            <div class=''chart-wrapper''>\r\n              <div class=''chart-title''>\r\n                Cell Title\r\n              </div>\r\n              <div class=''chart-stage''>\r\n                <img data-src=''holder.js/100%x240/white''>\r\n              </div>\r\n              <div class=''chart-notes''>\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=''row''>\r\n          <div class=''col-sm-4''>\r\n            <div class=''chart-wrapper''>\r\n              <div class=''chart-title''>\r\n                Cell Title\r\n              </div>\r\n              <div class=''chart-stage''>\r\n                <img data-src=''holder.js/100%x120/white''>\r\n              </div>\r\n              <div class=''chart-notes''>\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=''col-sm-4''>\r\n            <div class=''chart-wrapper''>\r\n              <div class=''chart-title''>\r\n                Cell Title\r\n              </div>\r\n              <div class=''chart-stage''>\r\n                <img data-src=''holder.js/100%x120/white''>\r\n              </div>\r\n              <div class=''chart-notes''>\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=''col-sm-4''>\r\n            <div class=''chart-wrapper''>\r\n              <div class=''chart-title''>\r\n                Cell Title\r\n              </div>\r\n              <div class=''chart-stage''>\r\n                <img data-src=''holder.js/100%x120/white''>\r\n              </div>\r\n              <div class=''chart-notes''>\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class=''row''>\r\n          <div class=''col-sm-4''>\r\n            <div class=''chart-wrapper''>\r\n              <div class=''chart-title''>\r\n                Cell Title\r\n              </div>\r\n              <div class=''chart-stage''>\r\n                <img data-src=''holder.js/100%x120/white''>\r\n              </div>\r\n              <div class=''chart-notes''>\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=''col-sm-4''>\r\n            <div class=''chart-wrapper''>\r\n              <div class=''chart-title''>\r\n                Cell Title\r\n              </div>\r\n              <div class=''chart-stage''>\r\n                <img data-src=''holder.js/100%x120/white''>\r\n              </div>\r\n              <div class=''chart-notes''>\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=''col-sm-4''>\r\n            <div class=''chart-wrapper''>\r\n              <div class=''chart-title''>\r\n                Cell Title\r\n              </div>\r\n              <div class=''chart-stage''>\r\n                <img data-src=''holder.js/100%x120/white''>\r\n              </div>\r\n              <div class=''chart-notes''>\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>', 0x89504e470d0a1a0a0000000d49484452000002580000017c0803000000246d35530000001974455874536f6674776172650041646f626520496d616765526561647971c9653c0000000f504c5445f6f7f7eceef0fbfbfbffffffdbdee10f974bf2000004244944415478daecdab11180300c044119dc7fcd4e094820d28ff62af8b13674ed4edd8fb6825b0596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c0125860810596c01258020b2c8125b0041658024b60092cb00496c0125860092c8125b0c01258024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b6081051658024b60390e5860092c8125b0c01258024b608125b00496c0024b60092c810596c01258020b2c8125b0041658608125b0041658608125b0041658608125b004d67f58a5e0aebeb0141d58024b6081051658024b6081051658024b6081051658024b60810516581a00cbb0e861601906966160b91f589ec930b00c03cbfdc0f24c8681651858ee079667320c2cc3c0723fb03c936160190696fb81e5990c03cb30b0dc0f2ccf6418588681e57e607926c3c0320c2cf703cb331906966160b91f589ec930b00c03cbfdc0f24c8681651858ee079667320c2cc3c0723fb03c936160190696fb81e57e8681651858ee0796fb1906966160b91f58ee6718588681e57e60b99f6160190696fb81e57e8681651858ee0796fb1906966160b91f58ee6718588681e57e60b99f6160190696fb81e57e8681651858ee0796fb1906966160190696fb1906966160190696fb1906966160190696fb1906966160190696fb1906966160190696fb19069661036155a70cfb5c5b588a0e2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c002cbef06bf1b06fc6e30cc7f2cf7330c2cc3c0320c2cf7330c2cc3c0320c2cf7330c2cc3c0320c2cf7330c2cc3c0320c2cf7330c2cc3c0320c2cf7330c2cc3c0320c2cf703cb331906966160b91f589ec930b00c03cbfdc0f24c8681651858ee079667320c2cc3c0723fb03c936160190696fb81e5990c03cb30b0dc0f2ccf6418588681e57e607926c3c0320c2cf703cb331906966160b91f589ec930b00c03cbfdc0f24c8681651858ee079667320c2cc3c0723fb0dccf30b00c03cbfdc0723fc3c0320c2cf703cbfd0c03cb30b0dc0f2cf7330c2cc3c0723fb0dccf30b00c03cbfdc0723fc3c0320c2cf703cbfd0c03cb30b0dc0f2cf7330c2cc3c0723fb0dccf30b00c03cbfdc0723fc3de3a020c00ad6e840b06d6b9660000000049454e44ae426082),
(3, 'Hero Thirds', '<div class="container-fluid">\r\n\r\n    <div class="row">\r\n      <div class="col-sm-8">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <div id="grid-1-1">\r\n              <img data-src="holder.js/100%x240/white/text:#grid-1-1">\r\n            </div>\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x240/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class="row">\r\n      <div class="col-sm-6 col-md-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6 col-md-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6 col-md-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n<!-- end of three -->\r\n      <div class="col-sm-6 col-md-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6 col-md-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6 col-md-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>', 0x89504e470d0a1a0a0000000d49484452000002580000017c0803000000246d35530000001974455874536f6674776172650041646f626520496d616765526561647971c9653c00000012504c5445f6f7f7e4e6e9eceef0eaeceeffffffdbdee1e89e201e000004314944415478daecdab10dc0300845419cd8fbaf9c96da229291ef6df0c595c4d2293d33359a8f09f7040b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c01258020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c01258608105165860092cb0c0020b2cb00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b0041658608125b00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c01258608105165860092cb0c0020b2cb00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b60092cb0c0024b60092cb0c0024b60092cb0c0024b9bb0ded1bb98d20f8125b00496c092c01258024b024b60092c092c8125b0a43a58dd7f4df2185bfc633906588e610b58b680e5186039862d60d902966380e518b680650b588e019663d802962d603906588e610b58b680e5186039862d60d902966380e518b680650b586081e518b680650b586081e518b680650b586081e518b680650b586081e518b680650b586081e518b680650b586081e518b680650b586081e518b680650b586081e518b680650b586081e518b680650b586081e518b680650b586081e5186039862d608105966380e518b6800516588e019663d8021658603906588e610b586081e5186039862d608105966380e518b6800516588e019663d8021658603906588e610b586081e5186039862d608105966380e518b6800516588e7103aceee563d872e818a92ab00496c012581258024b604960092c81258125b004965407cb0f932d1efdc002cb31c0720c5bc0020b2cc700cb316c010b2cb01c032cc7b0052cb0c0720cb01cc316b0c002cb31c0720c5bc0020b2cc700cb316c010b2cb01c032cc7b0052cb0c0720cb01cc316b0c002cb31c0720c5bc0020b2cc700cb316c010b2cb01c032cc7b0052c5bc0720cb01cc316b06c01cb31c0720c5bc0b2052cc700cb316c01cb16b01c032cc7b0052c5bc0720cb01cc316b06c01cb31c0720c5bc0b2052cb0c0720c5bc0b2052cb0c0720c5bc0b2052cb0c0720c5bc0b2052cb0c0720c5bc0b2052cb0c0720c5bc0b2052cb0c0720c5bc0b2052cb0c0720c5bc0b2052cb0c0720c5bc0b2052cb0c0720c5bc0b2052cb0c0720c5bc0b2052cb05af5093000c969f8cadfe311580000000049454e44ae426082),
(4, 'Split Centered', ' <div class="container-fluid">\r\n\r\n    <div class="row">\r\n      <div class="col-sm-3">\r\n        <div class="row">\r\n          <div class="col-sm-12">\r\n            <div class="chart-wrapper">\r\n              <div class="chart-title">\r\n                Cell Title\r\n              </div>\r\n              <div class="chart-stage">\r\n                <img data-src="holder.js/100%x120/white">\r\n              </div>\r\n              <div class="chart-notes">\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class="row">\r\n          <div class="col-sm-12">\r\n            <div class="chart-wrapper">\r\n              <div class="chart-title">\r\n                Cell Title\r\n              </div>\r\n              <div class="chart-stage">\r\n                <img data-src="holder.js/100%x120/white">\r\n              </div>\r\n              <div class="chart-notes">\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x325/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-3">\r\n        <div class="row">\r\n          <div class="col-sm-12">\r\n            <div class="chart-wrapper">\r\n              <div class="chart-title">\r\n                Cell Title\r\n              </div>\r\n              <div class="chart-stage">\r\n                <img data-src="holder.js/100%x120/white">\r\n              </div>\r\n              <div class="chart-notes">\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div class="row">\r\n          <div class="col-sm-12">\r\n            <div class="chart-wrapper">\r\n              <div class="chart-title">\r\n                Cell Title\r\n              </div>\r\n              <div class="chart-stage">\r\n                <img data-src="holder.js/100%x120/white">\r\n              </div>\r\n              <div class="chart-notes">\r\n                Notes about this chart\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="row">\r\n      <div class="col-sm-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class="row">\r\n      <div class="col-sm-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-4">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n  </div>', 0x89504e470d0a1a0a0000000d49484452000002580000017c0803000000246d35530000001974455874536f6674776172650041646f626520496d616765526561647971c9653c0000000f504c5445f6f7f7eceef0e4e6e9ffffffdbdee16b116f4f0000048b4944415478daecda410e842014444110ef7f661337b2d40849a3f54fe09baedd50f6a46bd7d5ddddb8dafd64511f56c0020b2c07165860810516580e2cb0c0020b2cb01c5860810516586039b0c0020b2cb0c07260810516586081e5c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb01c5860810516586039b0c0020b2cb0c07260810516586081e5c0020b2cb0c002cb810516586081350d560b3db01ec38a3ab0c002cb8105165860810596030b2cb0c0020b2c07165860810516580e2cb0c0020bac71b06ad281f50656d494de637d0756d487810516580e2cb0c0020b2cb01c5860810516586039b0c0020b2cb0c07260810516586081e5c0020b2cb0c002cb8105165860810516586081051658608105165860810516586081051658608105165860810516586081051658608105165860810516586081051658608105165860810516586081051658608105165860810516586081051658608105165860810516586081051658608105165860810516586081051658608105165860810516586081051658608105165860810516586081051658604103165860810516580e2cb0c0020b2cb01c5860810516586039b0c0020b2cb0c072608105d6096b4b3ab0dec08a9ab234e7261c580e2c079603cb39b01c580e2ce7c0726039b09c03cb81e5c0726e1cacd5df8df4315a3cf4330658c6d0029616b08c019631b480a5052c6380650c2d606901cb186019430b585ac0320658c6d0029616b08c019631b480a5052c6380650c2d6069010b2cb08ca1052c2d6081059631b480a5052cb0c0328616b0b480051658c6d0029616b0c002cb185ac0d20216586019430b585ac0020b2c6368014b0b586081650c2d6069010b2cb08ca1052c2d6081059631b480a5052cb0c0320658c6d00216586019032c6368010b2cb08c019631b480051658c600cb185ac0020b2c6380650c2d6081059631c0328616b0c002cb186019430b586081650cb08ca1052cb0c0320658c6d00216586019032c6368010b2cb08cf10758ab5f3f8696d018e7461d580e2c079603cb39b01c580e2ce7c0726039b09c03cb81e57e0acb3fe26e0a2c6f98b478e8071658c600cb185ac0020b2c6380650c2d6081059631c0328616b0c002cb186019430b586081650cb08ca1052cb0c0320658c6d00216586019032c6368010b2cb08c019631b480051658c600cb185ac0020b2c6380650c2d6081059631c0328616b0b480650cb08ca1052c2d6019032c6368014b0b58c600cb185ac0d2029631c0328616b0b480650cb08ca1052c2d6019032c6368014b0b586081650c2d6069010b2cb08ca1052c2d6081059631b480a5052cb0c0328616b0b480051658c6d0029616b0c002cb185ac0d20216586019430b585ac0020b2c6368014b0b586081650c2d6069010b2cb08ca1052c2d6081b5d41d020c00b57c6633cfb2b0340000000049454e44ae426082),
(5, 'Split Columns', '  <div class="container-fluid">\r\n\r\n    <div class="row">\r\n      <div class="col-sm-6">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n    </div>\r\n\r\n    <div class="row">\r\n      <div class="col-sm-6">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x240/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x240/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n\r\n    <div class="row">\r\n      <div class="col-sm-6 col-md-3">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6 col-md-3">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6 col-md-3">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-6 col-md-3">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>', 0x89504e470d0a1a0a0000000d49484452000002580000017c0803000000246d35530000001974455874536f6674776172650041646f626520496d616765526561647971c9653c0000000f504c5445eceef0f6f7f7e4e6e9ffffffdbdee12ca3acc8000004514944415478daecda310ec4200c454108b9ff99a3742e6d092448e69de00bcf569b762bd108798d4ccd138005165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c01258608105165860092cb0c0020b2cb00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c0125860810516586081051658608105165860810516586081051658608105165860810596d7000b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c01258608105165860092cb0c0020b2cb00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b2fac4b89c02ac31ad282c01258024b604960092c81258125b004960496c01258d23c58cad43d59355f0e55bf2ef21abe20050b2cb0c0024b6081051658608125b0c0020b2cb0c01258608105165860092cb0c0020b2cb00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c01258608105165860092cb0c0020b2cb0c01258608105165860092cb0c0020b2cb00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c01258608105165860092cb0c0020b2cb00416586081051658020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb0c0020b2cb00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c01258608105165860092cb0c0020b2cb00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c01258608105165860092cb0c0020b2cb00416586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0c0024b6081051658608125b0c0020b2cb0c0f24c6081051658608105165860810516586081051658608105165860810516586081051658020b2cb0c0020b2c8105165860810596c0020b2cb0bef262cad403acae44f1a7284d0b2c8125b004960496c012581258024b604960092cfd14d6567f89c765861d3d6cafefb1e2331976f430b00c03cb30b0dc0f2ccf6418588681e57e607926c3c0320c2cf703cb331906966160b91f589ec930b00c03cbfdc0f24c8681651858ee079667320c2cc3c0723fb03c936160190696fb81e5990c03cb30b0dc0f2ccf6418588681e57e607926c3c0320c2cf703cb331906966160b91f589ec930b00c03cbfdc0723fc3c0320c2cf703cbfd0c03cb30b0dc0f2cf7330c2cc3c0723fb0dccf30b00c03cbfdc0723fc3c0320c2cf703cbfd0c03cb30b0dc0f2cf7330c2cc3c0723fb0dccf30b00c03cbfdc0723fc3c0320c2cf703cbfd0c03cb30b00c03cbfd0c03cb30b00c03cbfd0c03cb30b00c03cbfd0c03cb30b00c03cbfd0c03cb30b00c03cbfd0c03cbb0653d020c00307577309f0209610000000049454e44ae426082),
(6, 'Split Rows', '  <div class="container-fluid">\r\n\r\n    <div class="row">\r\n      <div class="col-sm-3">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-9">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class="row">\r\n      <div class="col-sm-3">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-9">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class="row">\r\n      <div class="col-sm-3">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-9">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <div class="row">\r\n      <div class="col-sm-3">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class="col-sm-9">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Cell Title\r\n          </div>\r\n          <div class="chart-stage">\r\n              <img data-src="holder.js/100%x120/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes about this chart\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>', 0x89504e470d0a1a0a0000000d49484452000002580000017c0803000000246d35530000001974455874536f6674776172650041646f626520496d616765526561647971c9653c0000000f504c5445f6f7f7eceef0e4e6e9ffffffdbdee16b116f4f0000038f4944415478daecdac10d002108454114fbaf79af16200964e75540c21c7f9c4ee5d5d1e4022c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0041658024b60092cb00496c0125860092c8125b0c01258024b608125b054062ba582c01258024b604960092c81258125b004960496c01258d23b58ab53f7654b93b3c792a19fc0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0020b2cb00496c0f21bb0c01258024b608125b00496c0024b60092c810596c01258020b2c81a53a58bb5337acadc9454a058125b00496c092c01258024b024b60092c092c8125b0a477b0ecb164e827b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0041658024b60092cb00496c0125860092c8125b0c01258024b608125b0049666c16ad50d2b34ba940a024b60092c81258125b004960496c012581258024b3f8565dda092ecb164e827b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0c0020b2c8125b0041658024b60092cb00496c0125860092c8125b0c01258024b608125b0049646f50930000fb95d6c9bc855760000000049454e44ae426082),
(7, 'Thirds Grid', '  <div class="container-fluid">\n\n    <div class="row">\n      <div class="col-sm-6 col-md-4">\n        <div class="chart-wrapper">\n          <div class="chart-title">\n            Cell Title\n          </div>\n          <div class="chart-stage">\n            <div id="grid-1-1">\n              <img data-src="holder.js/100%x180/white/text:#grid-1-1">\n            </div>\n          </div>\n          <div class="chart-notes">\n            Notes about this chart\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-6 col-md-4">\n        <div class="chart-wrapper">\n          <div class="chart-title">\n            Cell Title\n          </div>\n          <div class="chart-stage">\n            <img data-src="holder.js/100%x180/white">\n          </div>\n          <div class="chart-notes">\n            Notes about this chart\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-6 col-md-4">\n        <div class="chart-wrapper">\n          <div class="chart-title">\n            Cell Title\n          </div>\n          <div class="chart-stage">\n            <img data-src="holder.js/100%x180/white">\n          </div>\n          <div class="chart-notes">\n            Notes about this chart\n          </div>\n        </div>\n      </div>\n<!-- end of three -->\n      <div class="col-sm-6 col-md-4">\n        <div class="chart-wrapper">\n          <div class="chart-title">\n            Cell Title\n          </div>\n          <div class="chart-stage">\n            <img data-src="holder.js/100%x180/white">\n          </div>\n          <div class="chart-notes">\n            Notes about this chart\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-6 col-md-4">\n        <div class="chart-wrapper">\n          <div class="chart-title">\n            Cell Title\n          </div>\n          <div class="chart-stage">\n            <img data-src="holder.js/100%x180/white">\n          </div>\n          <div class="chart-notes">\n            Notes about this chart\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-6 col-md-4">\n        <div class="chart-wrapper">\n          <div class="chart-title">\n            Cell Title\n          </div>\n          <div class="chart-stage">\n            <img data-src="holder.js/100%x180/white">\n          </div>\n          <div class="chart-notes">\n            Notes about this chart\n          </div>\n        </div>\n      </div>\n<!-- end of three -->\n      <div class="col-sm-6 col-md-4">\n        <div class="chart-wrapper">\n          <div class="chart-title">\n            Cell Title\n          </div>\n          <div class="chart-stage">\n            <img data-src="holder.js/100%x180/white">\n          </div>\n          <div class="chart-notes">\n            Notes about this chart\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-6 col-md-4">\n        <div class="chart-wrapper">\n          <div class="chart-title">\n            Cell Title\n          </div>\n          <div class="chart-stage">\n            <img data-src="holder.js/100%x180/white">\n          </div>\n          <div class="chart-notes">\n            Notes about this chart\n          </div>\n        </div>\n      </div>\n      <div class="col-sm-6 col-md-4">\n        <div class="chart-wrapper">\n          <div class="chart-title">\n            Cell Title\n          </div>\n          <div class="chart-stage">\n            <img data-src="holder.js/100%x180/white">\n          </div>\n          <div class="chart-notes">\n            Notes about this chart\n          </div>\n        </div>\n      </div>\n    </div>\n	</div>\n', 0x89504e470d0a1a0a0000000d49484452000002580000017c0803000000246d35530000001974455874536f6674776172650041646f626520496d616765526561647971c9653c0000000c504c5445f6f7f7eceef0ffffffdbdee15bd86c07000004834944415478daecdab10d0031080441ecefbfe74f29004b80860e4e3b21f10dbf9bce963e1762d80216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58b68025065862d802962d6089019618b680650b58628025862d60d90296186089610b58b68025065862d802962d6089019618b680650b58608125862d60d90216586089610b58b68005165862d802962d6081059618b680650b58608125862d60d90216586089610b58b68005165862d802962d6081059618b680650b58608125862d60d90216586089610b58b68005165862d802962d60810596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d8021658ad609de19763d8d2e7e23af7e0c0726039b01c58ce81e5c0726039079603cb81e55c29ace9b769ccaa303e026cf136031658628025862d60810596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d802962d6089019618b680650b58628025862d60d90296186089610b58b68025065862d802962d6089019618b680650b58628025862d60d90216586089610b58b68005165862d802962d6081059618b680650b58608125862d60d90216586089610b58b68005165862d802962d6081059618b680650b58608125862d60d90216586089610b58b68005165862d802962d6081059618b680650b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b68005165862ec8735fd720c5b9a8e71aeeac0726039b01c58ce81e5c0726039079603cb81e55c29ac33fcf2185bfa9cef065bbccd800596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b680650b58628025862d60d90296186089610b58b68025065862d802962d6089019618b680650b58628025862d60d90296186089610b58b68025065862d802962d6081059618b680650b58608125862d60d90216586089610b58b68005165862d802962d6081059618b680650b58608125862d60d90216586089610b58b68005165862d802962d6081059618b680650b58608125862d60d90216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b680051658628025862d60810596186089610b58608125065862d80216586089019618b680051658628025862d6081059618fbb7fc020c00126f04d75d2038730000000049454e44ae426082),
(8, 'Two and One', '  <div class="container-fluid">\r\n    <div class="row">\r\n\r\n      <div class="col-sm-6">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Pageviews by browser (past 24 hours)\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x350/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            This is a sample text region to describe this chart.\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class="col-sm-6">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Pageviews by browser (past 5 days)\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x350/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes go down here\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n\r\n\r\n    <div class="row">\r\n\r\n      <div class="col-sm-12">\r\n        <div class="chart-wrapper">\r\n          <div class="chart-title">\r\n            Impressions by advertiser\r\n          </div>\r\n          <div class="chart-stage">\r\n            <img data-src="holder.js/100%x150/white">\r\n          </div>\r\n          <div class="chart-notes">\r\n            Notes go down here\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n', 0x89504e470d0a1a0a0000000d49484452000002580000017c08020000009cd15236000000097048597300000b1300000b1301009a9c180000000774494d4507de081b160c18f4fa44380000001d69545874436f6d6d656e7400000000004372656174656420776974682047494d50642e6507000004d14944415478daeddc310a83401445d14c701d82e0fe5724086ee4a54829280831c9fc735abbd7dc198b69491e0050d5d3040008210008210008210008210008210014301c7f5ed6cd46f009f3341a01fe2084c06d9c3be12ba74fbf4601284d0801104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200104200841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000841000210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210400210440084d0080100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100280100220840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840020840070d16002f811f3341a01eed792580180b2fc1a05400801400801400801400801400801400801400801400801400801400801a023e78f6e2feb662600fab07fddde8d1080d28410002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104002104400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801400801e0ad25b102006e8400208400208400208400208400d0bb17ddfc155833017fa60000000049454e44ae426082);

-- --------------------------------------------------------

--
-- Table structure for table `testdesigndetails`
--

CREATE TABLE IF NOT EXISTS `testdesigndetails` (
  `id` int(10) NOT NULL auto_increment,
  `testid` int(50) NOT NULL,
  `testname` int(10) NOT NULL,
  `priority` varchar(50) NOT NULL,
  `designer` varchar(50) NOT NULL,
  `createddate` varchar(50) NOT NULL,
  `reviewer` varchar(50) NOT NULL,
  `reviewed` varchar(50) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `usergroups`
--

CREATE TABLE IF NOT EXISTS `usergroups` (
  `id` int(10) NOT NULL auto_increment,
  `userid` int(10) NOT NULL,
  `groupid` int(10) NOT NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `usergroups`
--

INSERT INTO `usergroups` (`id`, `userid`, `groupid`) VALUES
(1, 57, 2),
(2, 57, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) NOT NULL auto_increment,
  `username` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(30) NOT NULL,
  `active` varchar(1) NOT NULL,
  `created_on` datetime default NULL,
  `updated_on` datetime default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=69 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `firstname`, `lastname`, `active`, `created_on`, `updated_on`) VALUES
(45, 'Blesswin', 'blesswinprince@gmail.com', 'Blesswin', 'Princejjgj', 'N', '2015-05-24 21:32:33', '2016-05-03 09:52:16'),
(55, 'Dolly', 'dolly.pathak@cognizant.com', 'Dolly', 'Pathak', 'Y', '2015-07-26 15:02:02', '2015-07-26 15:02:02'),
(56, 'vjhvjhv', 'jvjhvv', 'jhvjhvj', 'jvhjv', 'Y', '2016-05-03 08:49:07', '2016-05-04 12:15:06'),
(57, 'jvjhvjh', '', 'jhvjhv', 'jhvjhv', 'Y', '2016-05-03 08:53:02', '2016-05-04 12:20:36'),
(58, 'kgigiu', '', 'iugiug', 'iguiug', 'Y', '2016-05-03 08:54:03', '2016-05-03 08:54:03'),
(59, 'jhvjhvjh', 'blesswinprince', 'jhvjhvjhvjh', 'jhvjhvjhvjhv', 'Y', '2016-05-03 09:38:12', '2016-05-03 09:38:12'),
(60, 'Shruthi', '', 'shrithi', 'asdas', 'N', '2016-05-03 09:38:59', '2016-05-03 09:38:59'),
(61, 'kjbkjb', '', 'kbjkjb', 'kjbkjbk', 'Y', '2016-05-03 09:40:16', '2016-05-03 09:40:16'),
(62, 'jbkjb', '', 'kbkjb', 'kiugkg', 'Y', '2016-05-03 09:43:11', '2016-05-03 09:43:11'),
(63, '', '', '', '', 'N', '2016-05-03 18:24:57', '2016-05-03 18:24:57'),
(64, 'sadsadasdadsasdsads', '', 'asdsadsad', 'sadsadsad', 'Y', '2016-05-04 12:16:26', '2016-05-04 12:16:26'),
(65, '34234234', '', 'adsadas', '', 'Y', '2016-05-04 12:17:52', '2016-05-04 12:17:52'),
(66, '34234234sad', '', 'adsadas', '', 'Y', '2016-05-04 12:18:26', '2016-05-04 12:18:26'),
(67, '34234234sad', '', 'adsadas', '', 'Y', '2016-05-04 12:18:37', '2016-05-04 12:18:37'),
(68, 'asdsad2q324r23rsd', '', 'adsadas', '', 'Y', '2016-05-04 12:19:34', '2016-05-04 12:19:34');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
