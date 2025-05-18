-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Tempo de geração: 18/05/2025 às 22:30
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `semnome`
--
CREATE DATABASE IF NOT EXISTS `semnome` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `semnome`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `id_coisa` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `dataHora` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `comentarios`
--

INSERT INTO `comentarios` (`id`, `id_coisa`, `id_usuario`, `comentario`, `dataHora`) VALUES
(9, 7, 11, 'comentario', '2025-05-11 20:08:10');

-- --------------------------------------------------------

--
-- Estrutura para tabela `curtidas`
--

DROP TABLE IF EXISTS `curtidas`;
CREATE TABLE `curtidas` (
  `id` int(11) NOT NULL,
  `id_coisa` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `datahora` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `curtidas`
--

INSERT INTO `curtidas` (`id`, `id_coisa`, `id_usuario`, `datahora`) VALUES
(0, 1, 7, '2025-05-03 10:35:25'),
(0, 1, 9, '2025-05-03 10:35:39'),
(0, 1, 11, '2025-05-03 11:10:14'),
(0, 8, 9, '2025-05-03 11:06:13'),
(0, 8, 11, '2025-05-03 11:10:12'),
(0, 9, 11, '2025-05-03 11:20:20'),
(0, 10, 7, '2025-05-11 18:04:30'),
(0, 10, 8, '2025-05-03 11:22:40'),
(0, 11, 7, '2025-05-11 18:04:23'),
(0, 11, 10, '2025-05-03 11:27:19');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tb_postagens`
--

DROP TABLE IF EXISTS `tb_postagens`;
CREATE TABLE `tb_postagens` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `imagem` varchar(255) NOT NULL,
  `dataPostagem` datetime NOT NULL DEFAULT current_timestamp(),
  `tags` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tb_postagens`
--

INSERT INTO `tb_postagens` (`id`, `id_usuario`, `titulo`, `descricao`, `imagem`, `dataPostagem`, `tags`) VALUES
(1, 7, 'Duende Verde', 'Vilão do Homem-Aranha', 'uploads/20250503144905fotof9855e9adec9092319ba8388d6eed7f1.png', '2025-05-03 09:49:05', '#Filmes; #HomemAranha'),
(8, 9, 'Coringa', 'Vilão do Batman', 'uploads/20250503160331foto0f28ce4f9cef91a4e132fa6c597dc43b.png', '2025-05-03 11:03:31', '#SuperHerois; #Coringa; #Batman'),
(9, 11, 'Super Choque', 'Herói da Warner Bros', 'uploads/20250503162017fotoc338f43f8595286406d8493ecb437540.jpg', '2025-05-03 11:20:17', '#WarnerBros'),
(10, 8, 'Pac-Man', 'Jogo eletrônico desenvolvido em 1980', 'uploads/20250503162222foto289dd8ee34b72db556e46509c8f110d9.png', '2025-05-03 11:22:22', '#JogosAntigos; PacMan'),
(11, 10, 'Assembly', 'Como criar um simples print em assembly', 'uploads/20250503162713foto4a64569b56bffea0acd853331669633f.png', '2025-05-03 11:27:13', '#programação; #Assembly');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `idade` int(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `foto` varchar(255) NOT NULL DEFAULT 'anonymous.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `idade`, `email`, `senha`, `foto`) VALUES
(7, 'Lucas Alves', 20, 'lucas.lupinacci@estudante.unipinhal.edu.br', '81dc9bdb52d04dc20036dbd8313ed055', 'anonymous.png'),
(8, 'Henrique Silviéri', 19, 'henrique.silvieri@estudante.unipinhal.edu.br', '81dc9bdb52d04dc20036dbd8313ed055', 'anonymous.png'),
(9, 'Luiz Henrique', 19, 'luiz.guilherme@estudante.unipinhal.edu.br', '81dc9bdb52d04dc20036dbd8313ed055', 'anonymous.png'),
(10, 'José Eduardo', 32, 'jose.rodrigues@estudante.unipinhal.edu.br', '81dc9bdb52d04dc20036dbd8313ed055', 'anonymous.png'),
(11, 'Amanda Souza', 19, 'amanda.s.souza@estudante.unipinhal.edu.br', '81dc9bdb52d04dc20036dbd8313ed055', 'anonymous.png');

-- --------------------------------------------------------

--
-- Estrutura stand-in para view `view_postagens_com_total_curtidas`
-- (Veja abaixo para a visão atual)
--
DROP VIEW IF EXISTS `view_postagens_com_total_curtidas`;
CREATE TABLE `view_postagens_com_total_curtidas` (
`usuario_id` int(11)
,`nome` varchar(255)
,`idade` int(255)
,`email` varchar(255)
,`foto` varchar(255)
,`postagem_id` int(11)
,`titulo` varchar(255)
,`descricao` text
,`imagem` varchar(255)
,`dataPostagem` datetime
,`tags` varchar(255)
,`total_curtidas` bigint(21)
);

-- --------------------------------------------------------

--
-- Estrutura para view `view_postagens_com_total_curtidas`
--
DROP TABLE IF EXISTS `view_postagens_com_total_curtidas`;

DROP VIEW IF EXISTS `view_postagens_com_total_curtidas`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_postagens_com_total_curtidas`  AS SELECT `u`.`id` AS `usuario_id`, `u`.`nome` AS `nome`, `u`.`idade` AS `idade`, `u`.`email` AS `email`, `u`.`foto` AS `foto`, `p`.`id` AS `postagem_id`, `p`.`titulo` AS `titulo`, `p`.`descricao` AS `descricao`, `p`.`imagem` AS `imagem`, `p`.`dataPostagem` AS `dataPostagem`, `p`.`tags` AS `tags`, coalesce(`c`.`total_curtidas`,0) AS `total_curtidas` FROM ((`tb_postagens` `p` join `usuarios` `u` on(`p`.`id_usuario` = `u`.`id`)) left join (select `curtidas`.`id_coisa` AS `id_coisa`,count(0) AS `total_curtidas` from `curtidas` group by `curtidas`.`id_coisa`) `c` on(`c`.`id_coisa` = `p`.`id`)) ;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `curtidas`
--
ALTER TABLE `curtidas`
  ADD UNIQUE KEY `id_coisa` (`id_coisa`,`id_usuario`);

--
-- Índices de tabela `tb_postagens`
--
ALTER TABLE `tb_postagens`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `tb_postagens`
--
ALTER TABLE `tb_postagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
