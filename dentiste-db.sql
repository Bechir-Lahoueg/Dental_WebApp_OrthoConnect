-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2024 at 07:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dentiste-db`
--

-- --------------------------------------------------------

--
-- Table structure for table `demandes`
--

CREATE TABLE `demandes` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `size` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `contenance` varchar(255) DEFAULT NULL,
  `dueDate` date DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `status` enum('En attente','Accepté','Rejeté') DEFAULT 'En attente',
  `userId` int(11) DEFAULT NULL,
  `creation_date` datetime DEFAULT current_timestamp(),
  `final_product` enum('En attente','En cours','Terminé') DEFAULT 'En attente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `demandes`
--

INSERT INTO `demandes` (`id`, `type`, `description`, `size`, `quantity`, `contenance`, `dueDate`, `price`, `status`, `userId`, `creation_date`, `final_product`) VALUES
(69, 'Protège-dents sportifs', 'couleur vert', '11 cm', 2, '', '2024-11-29', 300.00, 'Accepté', 1, '2024-11-02 15:04:59', 'Terminé'),
(70, 'Protège-dents sportifs', 'efez', '12 cm', 5, 'fzefz', '2024-11-30', 200.00, 'Accepté', 1, '2024-11-13 12:50:25', 'Terminé'),
(71, 'Facettes dentaires', 'fs', '12 cm', 1, 'zefzef', '2024-11-29', 300.00, 'Accepté', 1, '2024-11-25 12:55:15', 'Terminé'),
(72, 'Appareils dentaires', 'dcvv', '11', 1, '022', '2024-11-29', 3000.00, 'Accepté', 1, '2024-11-26 23:37:58', 'Terminé'),
(73, 'Facettes dentaires', 'oranger', '12 cm', 5, '', '2024-12-08', 2000.00, 'Accepté', 1, '2024-11-29 00:30:28', 'En cours'),
(74, 'Appareils dentaires', 'burgundy', '20', 8, '', '2024-11-30', 8000.00, 'Accepté', 1, '2024-11-29 08:59:59', 'En cours'),
(75, 'Appareils dentaires', 'bbbbbbllllllllll', '58', 5, '', '2024-11-30', 80000.00, 'Accepté', 1, '2024-11-29 09:08:07', 'Terminé'),
(76, 'Blanchiment d\'éteins', 'marque x', '100', 1, '', '2024-12-01', 200.00, 'Accepté', 1, '2024-11-29 09:25:37', 'Terminé');

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `name`, `age`, `email`) VALUES
(16, 'bechir', 21, 'bechir@gmail.com'),
(23, 'safwen', 22, 'safwen@gmail.com'),
(26, 'fida', 21, 'fidasassi@gmail.com'),
(27, 'islem', 3, 'islmtk@gmzil.com'),
(28, 'mazn', 6, 'maznmedb@gmail.com'),
(29, 'chaimaaaaa', 10, 'chaimaaaaaaaa@gla.cp');

-- --------------------------------------------------------

--
-- Table structure for table `prothesiste`
--

CREATE TABLE `prothesiste` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `secret_code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `prothesiste`
--

INSERT INTO `prothesiste` (`id`, `email`, `password`, `secret_code`, `name`) VALUES
(1, 'admin@pro.com', '12345678', 'YTREZA4321', 'Oussama');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `secret_code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `secret_code`, `name`) VALUES
(1, 'admin@test.com', '12345678', 'AZERTY1234', 'Mohamed');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `demandes`
--
ALTER TABLE `demandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prothesiste`
--
ALTER TABLE `prothesiste`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `demandes`
--
ALTER TABLE `demandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `prothesiste`
--
ALTER TABLE `prothesiste`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `demandes`
--
ALTER TABLE `demandes`
  ADD CONSTRAINT `demandes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
