-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 29, 2023 at 10:42 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `stack_over_flow`
--

-- --------------------------------------------------------

--
-- Table structure for table `answer`
--

CREATE TABLE `answer` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `commented_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `answer`
--

INSERT INTO `answer` (`id`, `user_id`, `post_id`, `answer`, `commented_at`) VALUES
(23, 7, 1, 'Well To Be Honest', '2023-05-20 17:45:38'),
(26, 7, 2, 'HHHHHHHHHHHHHHHHHHHHHHHHH', '2023-05-22 11:57:24');

-- --------------------------------------------------------

--
-- Table structure for table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20230519095232', '2023-05-19 11:52:41', 93),
('DoctrineMigrations\\Version20230519194739', '2023-05-19 21:47:48', 19),
('DoctrineMigrations\\Version20230519235553', '2023-05-20 01:55:59', 28),
('DoctrineMigrations\\Version20230520094511', '2023-05-20 11:45:17', 15),
('DoctrineMigrations\\Version20230520170953', '2023-05-20 19:10:01', 93);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `post_image` longtext NOT NULL,
  `post_title` varchar(255) NOT NULL,
  `posted_at` date NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `post_image`, `post_title`, `posted_at`, `user_id`) VALUES
(1, 'https://media.istockphoto.com/id/1443160526/photo/a-blind-woman-uses-a-computer-with-a-braille-display-and-a-computer-keyboard-inclusive-device.jpg?s=612x612&w=is&k=20&c=nnbyfq-mm7bcR0dleRZPklp1o9hvbC8TRQvOIJrE9E4=', 'I Have A Problem In My Github Repositories Can Someone help me', '2023-05-20', 7),
(2, 'https://media.istockphoto.com/id/1403897241/photo/university-students-studying-together-in-the-library.jpg?s=612x612&w=is&k=20&c=zB_Upa1xe5C6SvwDHYEhxRXgGec7OA7SESx_Pp7E1E0=', 'My Problem Is That When I tried to go to php myadmin ', '2023-05-20', 12),
(10, 'https://media.istockphoto.com/id/1419631265/photo/woman-following-online-courses-on-her-laptop-at-home.jpg?s=612x612&w=is&k=20&c=OsjcxuilfSuGAEKYmMtNCnOJwEaSImtv_vFIwZbNzjg=', 'The Solution To This Probel Is Quit Easy ', '2023-05-22', 10);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` longtext NOT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `email`) VALUES
(7, 'BenMrad Bilel', '$2a$10$BA4FstLzERa7wKLuhAnVLuYHTAOVio3WhydB7ciy0JEIrt3ORxrCW', 'admin', 'bilel@gmail.com'),
(10, 'Cherny Samar', '$2a$10$EJWToey2jivMBillGevIxuFsu0ok/.BPXODcF9ZNN6OINory0AQ2a', 'user', 'samar@gmail.com'),
(12, 'BenMrad Aziz', '$2a$10$aD00sdJUACwBPiKvrLyWN.393VAuUTYNMHI5Xt.RwlfJ5Wjn2y1Xy', 'user', 'aziz@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `answer`
--
ALTER TABLE `answer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_DADD4A25A76ED395` (`user_id`),
  ADD KEY `IDX_DADD4A254B89032C` (`post_id`);

--
-- Indexes for table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_5A8A6C8DA76ED395` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_8D93D649E7927C74` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `answer`
--
ALTER TABLE `answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `answer`
--
ALTER TABLE `answer`
  ADD CONSTRAINT `FK_DADD4A254B89032C` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`),
  ADD CONSTRAINT `FK_DADD4A25A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `FK_5A8A6C8DA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
