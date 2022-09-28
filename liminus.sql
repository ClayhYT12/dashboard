-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28-Set-2022 às 13:45
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `liminus`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens`
--

CREATE TABLE `postagens` (
  `ID` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `body` varchar(255) NOT NULL,
  `footer` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `postagens`
--

INSERT INTO `postagens` (`ID`, `title`, `body`, `footer`, `img`) VALUES
(1, 'primeira postagem', 'esta é uma postagem', '', '/img/logoluminus.png');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cpf` varchar(50) NOT NULL,
  `telefone` varchar(13) NOT NULL,
  `user_plano` varchar(50) NOT NULL,
  `user_mensalidade` float NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`ID`, `user_name`, `user_password`, `email`, `cpf`, `telefone`, `user_plano`, `user_mensalidade`, `date`) VALUES
(1, 'Jose da Silva ', 'Abc123', 'agstartec@gmail.com', '06301602366', '999184021', 'pro', 100, '1995-08-17'),
(2, 'anersom caldas', 'wqeewqwe', 'agstartec@gmail.com', '063.016.023-66', '2147483647', 'pro', 100, '2022-09-24'),
(3, 'Eduardo Henrique Alves Bueno', '23038401luminus', 'eduardohenrique.1598@gmail.com', '04412739120', '0', 'pro', 100, '2022-09-28'),
(4, 'Eduardo Henrique Alves Bueno', '23038401luminus', 'eduardohenrique.1598@gmail.com', '04412739120', '62356324723', 'pro', 100, '2022-09-28');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user_fature`
--

CREATE TABLE `user_fature` (
  `ID` int(11) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `amount` float NOT NULL,
  `date` date NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `user_fature`
--

INSERT INTO `user_fature` (`ID`, `user_name`, `amount`, `date`, `link`) VALUES
(1, 'Jose da Silva ', 1000, '2022-08-31', 'wklfndslksdhfihdskjfhkjsdhfkjhdskjlfhkjsdf');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `postagens`
--
ALTER TABLE `postagens`
  ADD PRIMARY KEY (`ID`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `user_name` (`user_name`);

--
-- Índices para tabela `user_fature`
--
ALTER TABLE `user_fature`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `user_name` (`user_name`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `postagens`
--
ALTER TABLE `postagens`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `user_fature`
--
ALTER TABLE `user_fature`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `user_fature`
--
ALTER TABLE `user_fature`
  ADD CONSTRAINT `user_fature_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `users` (`user_name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
