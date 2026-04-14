-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 23-02-2023 a las 19:58:18
-- Versión del servidor: 10.4.20-MariaDB-log
-- Versión de PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `497467`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_accesos`
--

CREATE TABLE `tb_accesos` (
  `id_rol` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_accesos`
--

INSERT INTO `tb_accesos` (`id_rol`, `id_menu`) VALUES
(1, 1),
(1, 5),
(2, 1),
(2, 2),
(2, 3),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_detalle_reserva`
--

CREATE TABLE `tb_detalle_reserva` (
  `id` int(11) NOT NULL,
  `id_reservacion` int(11) NOT NULL,
  `id_servicio` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_detalle_reserva`
--

INSERT INTO `tb_detalle_reserva` (`id`, `id_reservacion`, `id_servicio`, `estado`) VALUES
(1, 1, 5, 1),
(2, 3, 6, 1),
(3, 4, 4, 1),
(4, 5, 4, 1),
(5, 7, 4, 1),
(6, 8, 4, 1),
(7, 9, 4, 1),
(8, 9, 5, 1),
(9, 14, 4, 1),
(12, 14, 5, 1),
(13, 9, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_estado_hab`
--

CREATE TABLE `tb_estado_hab` (
  `id` int(11) NOT NULL,
  `detalle` varchar(100) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_estado_hab`
--

INSERT INTO `tb_estado_hab` (`id`, `detalle`, `estado`) VALUES
(1, 'Disponible', 1),
(2, 'Reservada', 1),
(3, 'Ocupada', 1),
(4, 'En Mantenimiento', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_habitaciones`
--

CREATE TABLE `tb_habitaciones` (
  `id` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `piso` int(11) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `id_estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_habitaciones`
--

INSERT INTO `tb_habitaciones` (`id`, `id_tipo`, `piso`, `numero`, `id_estado`) VALUES
(1, 1, 1, '100', 1),
(2, 1, 1, '101', 1),
(3, 1, 1, '102', 2),
(4, 2, 1, '103', 1),
(5, 2, 1, '104', 1),
(6, 2, 1, '105', 1),
(7, 3, 1, '106', 1),
(8, 3, 1, '107', 1),
(9, 4, 1, '108', 4),
(10, 4, 1, '109', 1),
(11, 1, 2, '200', 1),
(12, 1, 2, '201', 1),
(13, 1, 2, '202', 1),
(14, 2, 2, '203', 3),
(15, 2, 2, '204', 1),
(16, 2, 2, '205', 1),
(17, 3, 2, '206', 1),
(18, 3, 2, '207', 1),
(19, 3, 2, '208', 1),
(20, 4, 2, '209', 1),
(21, 4, 2, '210', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_menu`
--

CREATE TABLE `tb_menu` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `pagina` varchar(100) NOT NULL,
  `icono` varchar(100) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_menu`
--

INSERT INTO `tb_menu` (`id`, `nombre`, `pagina`, `icono`, `estado`) VALUES
(1, 'Hotel', '/home', 'assets/icon/about.svg', 1),
(2, 'Reservar', '/reserve', 'assets/icon/reserved.svg', 1),
(3, 'Mi perfil', '/profile', 'assets/icon/profile.svg', 1),
(4, 'Mis Reservaciones', '/my-reservations', 'assets/icon/hotel-door-key.svg', 1),
(5, 'Habitaciones', '/reservation-management', 'assets/icon/hotel-door-key.svg', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_personas`
--

CREATE TABLE `tb_personas` (
  `id` int(11) NOT NULL,
  `nombres` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `fechaNaci` date NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_personas`
--

INSERT INTO `tb_personas` (`id`, `nombres`, `apellidos`, `celular`, `fechaNaci`, `estado`) VALUES
(1, 'Dereck', 'Cisneros', '099859697', '1999-05-21', 1),
(2, 'Ivette', 'Borbor', NULL, '1997-04-14', 1),
(3, 'Jhon', 'Ortiz', '0928225440', '1985-11-23', 1),
(4, 'Nicol', 'Catuto', '0924766041', '1996-08-17', 1),
(5, 'Pierina', 'Villamar', '0972368569', '1990-05-12', 1),
(6, 'isaac', 'matias', '0998596597', '2000-09-05', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_reservaciones`
--

CREATE TABLE `tb_reservaciones` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_habitacion` int(11) NOT NULL,
  `codigo` text NOT NULL,
  `fecha_reserva` datetime NOT NULL,
  `fecha_ingreso` date NOT NULL,
  `fecha_salida` date NOT NULL,
  `comentarios` text NOT NULL,
  `total` float NOT NULL,
  `estado_actual` varchar(4) DEFAULT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_reservaciones`
--

INSERT INTO `tb_reservaciones` (`id`, `id_usuario`, `id_habitacion`, `codigo`, `fecha_reserva`, `fecha_ingreso`, `fecha_salida`, `comentarios`, `total`, `estado_actual`, `estado`) VALUES
(1, 2, 1, 'AEUPmi_ZDvEEVPtH9wP5a', '2023-02-10 00:00:00', '2023-01-02', '2023-01-11', '', 40, 'T', 1),
(3, 3, 18, 'RG0UOPl_ejd_wfCtMkHJv', '2023-02-11 00:00:00', '2023-02-11', '2023-02-16', '', 105, 'T', 1),
(4, 2, 4, 'x2RFvoCsahoXZAndyC6WG', '2023-02-12 00:00:00', '2023-02-17', '2023-02-19', '', 49, 'T', 1),
(5, 6, 5, 'xqL1jH7l-eQt6tROY4QhA', '2023-02-12 00:00:00', '2023-02-15', '2023-02-20', '', 97.5, 'T', 1),
(6, 6, 6, 'HknzsGOH6C0tKyAb5jRib', '2023-02-12 00:00:00', '2023-02-15', '2023-02-20', '', 75, 'T', 1),
(7, 6, 15, 'PBju9H-gFmcJoURX7yBJj', '2023-02-12 00:00:00', '2023-02-15', '2023-02-20', '', 97.5, 'C', 0),
(8, 6, 13, 'o8zdAi0gnbTDuMzHxEXDq', '2023-02-13 00:00:00', '2023-02-15', '2023-02-20', '', 72.5, 'T', 1),
(9, 6, 13, '5S7j1gU7MBPh4hUnRzU6g', '2023-02-16 00:00:00', '2023-02-24', '2023-02-28', '', 68, 'T', 1),
(10, 6, 1, 'clMZZN8_CBt1VfSFcQN3M', '2023-02-16 00:00:00', '2023-02-20', '2023-02-25', '', 50, 'T', 1),
(11, 6, 13, '376KX-89kEV9599l6-bAZ', '2023-02-17 00:00:00', '2023-02-20', '2023-02-25', '', 50, 'T', 1),
(13, 6, 1, 's-A1lzLK73-xQAhGixlXr', '2023-02-17 00:00:00', '2023-02-20', '2023-02-25', '', 50, 'C', 0),
(14, 6, 10, 'er46xkNYV76iBPtU7qd6V', '2023-02-23 00:00:00', '2023-02-24', '2023-02-28', '', 118, 'T', 1),
(15, 6, 2, 'TcT_7b5Yxi_90qWBd0A3M', '2023-02-23 00:00:00', '2023-02-25', '2023-02-27', '', 20, 'T', 1),
(16, 6, 21, '1EQ3dy_f2DPajZumX_dPq', '2023-02-23 00:00:00', '2023-02-25', '2023-02-28', '', 103.5, 'C', 0),
(17, 6, 21, 'BLv8S7cfM_UNh7oA0u4t1', '2023-02-23 00:00:00', '2023-02-25', '2023-02-28', '', 103.5, 'C', 0),
(18, 6, 3, 'Cyk1LwyhJ3v1MFDv0Pc2L', '2023-02-23 00:00:00', '2023-02-25', '2023-02-28', '', 30, 'P', 1),
(19, 6, 14, 'WluwHvUGC1qqdG5PkAxDj', '2023-02-23 00:00:00', '2023-02-25', '2023-02-27', '', 40, 'O', 1),
(20, 6, 9, 'lkv8cYKhOGmWabbq6Fo2y', '2023-02-23 00:00:00', '2023-02-25', '2023-02-27', '', 59, 'T', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_roles`
--

CREATE TABLE `tb_roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_roles`
--

INSERT INTO `tb_roles` (`id`, `rol`, `estado`) VALUES
(1, 'Adminitrador', 1),
(2, 'Cliente', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_servicios`
--

CREATE TABLE `tb_servicios` (
  `id` int(11) NOT NULL,
  `detalle` varchar(255) NOT NULL,
  `icono` varchar(50) NOT NULL,
  `precio` double NOT NULL,
  `es_fijo` tinyint(4) NOT NULL DEFAULT 1,
  `es_opcional` tinyint(4) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_servicios`
--

INSERT INTO `tb_servicios` (`id`, `detalle`, `icono`, `precio`, `es_fijo`, `es_opcional`, `estado`) VALUES
(1, 'Wifi', 'assets/icon/wifi-2.svg', 0, 1, 0, 1),
(2, 'Estacionamiento', 'assets/icon/garage.svg', 0, 1, 0, 1),
(3, 'Maletero', 'assets/icon/hotel-cart.svg', 0, 1, 0, 1),
(4, 'Menú del día', 'assets/icon/room-service.svg', 4.5, 0, 1, 1),
(5, 'Piscina', 'assets/icon/swimming-pool.svg', 10, 1, 1, 1),
(6, 'Gimnasio', 'assets/icon/gymnast.svg', 5, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_tipo_habitacion`
--

CREATE TABLE `tb_tipo_habitacion` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `detalle` text DEFAULT NULL,
  `precioxnoche` double NOT NULL DEFAULT 0,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_tipo_habitacion`
--

INSERT INTO `tb_tipo_habitacion` (`id`, `nombre`, `detalle`, `precioxnoche`, `estado`) VALUES
(1, 'Simple', NULL, 10, 1),
(2, 'Doble', NULL, 15, 1),
(3, 'Matrimonial', NULL, 20, 1),
(4, 'Triple', NULL, 25, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_ubicacion_hab`
--

CREATE TABLE `tb_ubicacion_hab` (
  `id` int(11) NOT NULL,
  `ubicacion` varchar(255) NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_ubicacion_hab`
--

INSERT INTO `tb_ubicacion_hab` (`id`, `ubicacion`, `estado`) VALUES
(1, 'Primer Piso', 1),
(2, 'Segundo Piso', 1),
(3, 'Tercer Piso', 1),
(4, 'Cuarto Piso', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tb_usuarios`
--

CREATE TABLE `tb_usuarios` (
  `id` int(11) NOT NULL,
  `id_persona` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `clave` text NOT NULL,
  `estado` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tb_usuarios`
--

INSERT INTO `tb_usuarios` (`id`, `id_persona`, `id_rol`, `correo`, `clave`, `estado`) VALUES
(1, 1, 1, 'dereck@gmail.com', 'a61222202e4b68c04398a5ae164e6c4e', 1),
(2, 2, 2, 'ivette.borbor@gmail.com', '8f4edb386cfadb37576a22eb0360821d', 1),
(3, 3, 2, 'jhono@hotmail.com', 'a019d0ad6cc73b6e4a2d42e5ab351b50', 1),
(4, 4, 2, 'nicol.catuto@gmail.com', '2b44cc5703e202daa306bf380bf4cfc9', 1),
(5, 5, 2, 'villamar@hoteles.com', '47ebe074a16b90fa5769a1d99c11c3e0', 1),
(6, 6, 2, 'dereckycarolay@gmail.com', '032345855bc785c55e5316c9b6612cf4', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `tb_accesos`
--
ALTER TABLE `tb_accesos`
  ADD KEY `id_rol` (`id_rol`),
  ADD KEY `id_menu` (`id_menu`);

--
-- Indices de la tabla `tb_detalle_reserva`
--
ALTER TABLE `tb_detalle_reserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_reservacion` (`id_reservacion`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `tb_estado_hab`
--
ALTER TABLE `tb_estado_hab`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_habitaciones`
--
ALTER TABLE `tb_habitaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipo` (`id_tipo`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `piso` (`piso`);

--
-- Indices de la tabla `tb_menu`
--
ALTER TABLE `tb_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_personas`
--
ALTER TABLE `tb_personas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_reservaciones`
--
ALTER TABLE `tb_reservaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_habitacion` (`id_habitacion`);

--
-- Indices de la tabla `tb_roles`
--
ALTER TABLE `tb_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_servicios`
--
ALTER TABLE `tb_servicios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_tipo_habitacion`
--
ALTER TABLE `tb_tipo_habitacion`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_ubicacion_hab`
--
ALTER TABLE `tb_ubicacion_hab`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_persona` (`id_persona`),
  ADD KEY `id_rol` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `tb_detalle_reserva`
--
ALTER TABLE `tb_detalle_reserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `tb_estado_hab`
--
ALTER TABLE `tb_estado_hab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_habitaciones`
--
ALTER TABLE `tb_habitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `tb_menu`
--
ALTER TABLE `tb_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `tb_personas`
--
ALTER TABLE `tb_personas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_reservaciones`
--
ALTER TABLE `tb_reservaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `tb_roles`
--
ALTER TABLE `tb_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tb_servicios`
--
ALTER TABLE `tb_servicios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `tb_tipo_habitacion`
--
ALTER TABLE `tb_tipo_habitacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_ubicacion_hab`
--
ALTER TABLE `tb_ubicacion_hab`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tb_accesos`
--
ALTER TABLE `tb_accesos`
  ADD CONSTRAINT `tb_accesos_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `tb_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_accesos_ibfk_2` FOREIGN KEY (`id_menu`) REFERENCES `tb_menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_detalle_reserva`
--
ALTER TABLE `tb_detalle_reserva`
  ADD CONSTRAINT `tb_detalle_reserva_ibfk_1` FOREIGN KEY (`id_reservacion`) REFERENCES `tb_reservaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_detalle_reserva_ibfk_2` FOREIGN KEY (`id_servicio`) REFERENCES `tb_servicios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_habitaciones`
--
ALTER TABLE `tb_habitaciones`
  ADD CONSTRAINT `tb_habitaciones_ibfk_1` FOREIGN KEY (`id_tipo`) REFERENCES `tb_tipo_habitacion` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_habitaciones_ibfk_2` FOREIGN KEY (`id_estado`) REFERENCES `tb_estado_hab` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_habitaciones_ibfk_3` FOREIGN KEY (`piso`) REFERENCES `tb_ubicacion_hab` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_reservaciones`
--
ALTER TABLE `tb_reservaciones`
  ADD CONSTRAINT `tb_reservaciones_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `tb_usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_reservaciones_ibfk_2` FOREIGN KEY (`id_habitacion`) REFERENCES `tb_habitaciones` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tb_usuarios`
--
ALTER TABLE `tb_usuarios`
  ADD CONSTRAINT `tb_usuarios_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `tb_personas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tb_usuarios_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `tb_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
