CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- 
-- Volcar la base de datos para la tabla `news`
-- 

INSERT INTO `news` VALUES (2, 'El Grupo de Teatro San Francisco Solano volverá a representar la vida de Francisco de Asís', '<p>¡Tenemos una emocionante noticia para todos los amantes del teatro! El Grupo de Teatro San Francisco Solano se complace en anunciar una nueva fecha para la aclamada obra<strong> "Francisco de Asís"</strong>. La presentación tendrá lugar en el prestigioso <strong><u>Teatro Garnelo de Montilla</u></strong> el día <strong><u>15 de agosto de 2024 a las 19:00 horas.</u></strong></p><p><br></p><p>"Francisco de Asís" es una obra que relata la inspiradora vida del santo, desde su juventud llena de privilegios hasta su renuncia a una vida de riquezas para dedicarse a la pobreza y al servicio de los más necesitados. La obra se centra en los momentos más cruciales de su vida, destacando su profunda transformación espiritual y su impacto duradero en la historia del cristianismo. Los espectadores podrán seguir su viaje, repleto de desafíos y revelaciones, pero sin desvelar todos los detalles, para que puedan descubrir su historia en el teatro.</p><p><br></p><p>Además de la narrativa cautivadora y las interpretaciones magistrales de nuestro elenco, esta nueva representación contará con grandes novedades audiovisuales. Hemos incorporado una pantalla LED totalmente inmersiva, que permitirá a los espectadores vivir una experiencia visual sin precedentes. Esta tecnología avanzada enriquece la puesta en escena y sumerge al público en la atmósfera y los paisajes que marcaron la vida de San Francisco de Asís.</p><p><br></p><p>No te pierdas esta oportunidad única de presenciar una historia conmovedora y universal, traída a la vida con innovadoras técnicas escénicas. ¡Te esperamos en el Teatro Garnelo para una noche inolvidable!</p><p><br></p><p>Para más información y para la compra de entradas, visita nuestro sitio web o nuestras redes sociales.</p><p><br></p><p>¡Nos vemos en el teatro!</p>', 'https://i.ibb.co/x72fw3q/unnamed.jpg', NULL);
INSERT INTO `news` VALUES (3, 'Todo listo para el ''''Cuento de navidad''''', '<p>El&nbsp;<a href="https://www.facebook.com/GRPSANFCOSOLANO" rel="noopener noreferrer" target="_blank" style="color: rgb(209, 0, 20); background-color: transparent;">Grupo de Teatro San Francisco Solano</a>&nbsp;ha preparado para estas navidades la representación de la obra de&nbsp;<em>«Cuento de Navidad»</em>&nbsp;de Charles Dickens</p><p>El&nbsp;<a href="https://www.facebook.com/GRPSANFCOSOLANO" rel="noopener noreferrer" target="_blank" style="color: rgb(209, 0, 20); background-color: transparent;">Grupo de Teatro San Francisco Solano</a>&nbsp;nos vuelve a sorprender este año con la adaptación del clásico navideño&nbsp;<em>«Cuento de Navidad»</em>, que contará con la presencia de 30 con los&nbsp;<em>artistas</em>&nbsp;sobre el escenario.</p><p>En esta ocasión, los beneficios de esta obra irán destinados a la&nbsp;<a href="https://www.facebook.com/Junta-Local-de-Montilla-AECC-208877769582152/" rel="noopener noreferrer" target="_blank" style="color: rgb(209, 0, 20); background-color: transparent;">Junta Local de Montilla AECC</a>&nbsp;y más concretamente a la lucha contra el Cáncer Infantil.</p><p>Los días 6, 7 y 8 de Diciembre serán las representaciones en el Teatro Garnelo, siendo el donativo de 7€.</p><p><strong>Cuento de Navidad</strong></p><p>Dickens escribió&nbsp;Cuento de Navidad&nbsp;como respuesta a las actitudes sociales que los británicos mostraban en su época respecto a la pobreza, en particular a la pobreza infantil, y deseaba usar esta novela corta como una manera de exponer sus argumentos en contra de esos puntos de vista.</p><p>Ebenezer Scrooge, un mezquino prestamista, descrito en la historia como&nbsp;<em>Aquel empedernido pecador era un avaro que sabía agarrar con fuerza, arrancar, retorcer, apretar, raspar y, sobre todo, duro y cortante como esos pedernales que no despiden vivíficas chispas si no al contacto del eslabón</em>»</p><p>La historia muestra a Scrooge como el paradigma del egoísmo, así como las posibles repercusiones devenidas de ignorar a los pobres, especialmente a los niños; estos quedan representados por las figuras alegóricas de Necesidad e Ignorancia.</p><p>La novela se divide en cinco capítulos denominados «estrofas», en consonancia con el título del libro.</p><ul><li class="ql-align-justify">Primera estrofa:&nbsp;El espectro de Marley</li><li class="ql-align-justify">Segunda estrofa: El primero de los tres espíritus</li><li class="ql-align-justify">Tercera estrofa:&nbsp;El segundo de los tres espíritus</li><li class="ql-align-justify">Cuarta estrofa:&nbsp;El último de los espíritus</li><li class="ql-align-justify">Quinta estrofa:&nbsp;Fin del cuento</li></ul><p>Sin duda, un gran momento para recordar nuestra condición humana, donde la generosidad y la buena fe debería ser el motor del mundo.</p>', 'https://i.ibb.co/PxSKgqx/cuento-Navidad.jpg', NULL);
INSERT INTO `news` VALUES (4, 'El Grupo de Teatro galardonado en la  cuarta edicion de la Gala Cultural de Montilla', '<p>El Teatro Garnelo acogió este viernes la cuarta edición de la Gala Cultural de Montilla, que promovió la Asociación Cultura Viva, en colaboración con la Concejalí­a de Cultura del Ayuntamiento de Montilla, y que rindió homenaje al insigne marino montillano Don Diego de Alvear y Ponce de León, el gran héroe de la defensa de la Isla de León y gobernador poí­tico-militar de la ciudad de Cádiz en los años en los que se promulgó la Constitución de 1812.</p><p><br></p><p>El Grupo de Teatro fue galardonado en la categorí­a de Artes Escénicas</p>', 'https://i.ibb.co/zSPNpKQ/IMG-20230623-215051.jpg', NULL);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `orders`
-- 

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_number` varchar(100) NOT NULL,
  `price` int(11) NOT NULL,
  `purchased_at` datetime NOT NULL,
  `paymentMethod` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

-- 
-- Volcar la base de datos para la tabla `orders`
-- 

INSERT INTO `orders` VALUES (1, 1, 3, '7d5f33e5-c335-4d42-9ca6-271fb84949f5', 6, '2024-06-09 12:32:57', NULL, NULL);
INSERT INTO `orders` VALUES (2, 1, 3, '84052ba9-122b-4fe5-b8a2-afd2492615f2', 6, '2024-06-09 12:32:57', NULL, NULL);
INSERT INTO `orders` VALUES (3, 1, 3, '33359a94-03c3-464c-af75-1e761a5ff8dc', 6, '2024-06-09 12:32:57', NULL, NULL);
INSERT INTO `orders` VALUES (4, 2, 3, '6f3bb3b8-9614-4539-9851-fa83c87a4036', 6, '2024-06-09 13:22:12', NULL, NULL);
INSERT INTO `orders` VALUES (5, 2, 3, '2a116779-8aae-445d-ad6a-60f0f625d700', 6, '2024-06-09 13:22:12', NULL, NULL);
INSERT INTO `orders` VALUES (6, 2, 4, '6b486a2e-2a7c-4ac1-99df-70bfb5b969ae', 12, '2024-06-09 13:22:12', NULL, NULL);
INSERT INTO `orders` VALUES (7, 2, 1, '5fd10f35-b87a-4fde-b024-66dfb2e53b48', 10, '2024-06-09 13:22:12', NULL, NULL);
INSERT INTO `orders` VALUES (8, 2, 1, '53ce903d-8283-47de-aa7e-13294c412b67', 10, '2024-06-09 13:22:12', NULL, NULL);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `performances`
-- 

CREATE TABLE `performances` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `performance_date` datetime NOT NULL,
  `theater_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `theater_id` (`theater_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 AUTO_INCREMENT=8 ;

-- 
-- Volcar la base de datos para la tabla `performances`
-- 

INSERT INTO `performances` VALUES (1, 'Francisco de Asís', 'Francisco de Asís', '2024-06-11 20:35:00', 1, 'https://i.ibb.co/GV07VcC/CARTEL-REPRESENTACION-SAN-FRANCISCO-DE-ASIS.jpg', 'https://www.youtube.com/watch?v=NmNnaz-_ulg');
INSERT INTO `performances` VALUES (7, 'Cuento de Navidad', 'Adaptación del clásico navideño «Cuento de Navidad» de Charles Dickens.', '2024-12-07 16:00:00', 2, 'https://i.ibb.co/PxSKgqx/cuento-Navidad.jpg', 'https://vimeo.com/954203176');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `productCartLines`
-- 

CREATE TABLE `productCartLines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=163 DEFAULT CHARSET=latin1 AUTO_INCREMENT=163 ;

-- 
-- Volcar la base de datos para la tabla `productCartLines`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `products`
-- 

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- 
-- Volcar la base de datos para la tabla `products`
-- 

INSERT INTO `products` VALUES (1, 'Libro Francisco de Asís', 'Libro "Francisco de Asís a través del Teatro". Libro de la obra teatral de Francisco de Asís.', 10.00, 'https://i.ibb.co/KjJGxTf/collage-gloria-portada.jpg');
INSERT INTO `products` VALUES (3, 'Mochila Grupo de Teatro', 'Mochila de cuerdas con logo del Grupo de Teatro. Color Negro. ', 5.50, 'https://i.ibb.co/zFsgZZd/mochila-spook-1.png');
INSERT INTO `products` VALUES (4, 'Tote Bag Grupo Teatro', 'Tote Bag con el logo del Grupo de Teatro. Color Negro', 12.00, 'https://i.ibb.co/4Pyy6Sz/7602-02-2-1.png');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `rows`
-- 

CREATE TABLE `rows` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `row_number` varchar(10) NOT NULL,
  `theater_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `theater_id` (`theater_id`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

-- 
-- Volcar la base de datos para la tabla `rows`
-- 

INSERT INTO `rows` VALUES (1, '1', 1);
INSERT INTO `rows` VALUES (2, '2', 1);
INSERT INTO `rows` VALUES (3, '3', 1);
INSERT INTO `rows` VALUES (4, '4', 1);
INSERT INTO `rows` VALUES (5, '5', 1);
INSERT INTO `rows` VALUES (6, '6', 1);
INSERT INTO `rows` VALUES (7, '7', 1);
INSERT INTO `rows` VALUES (8, '8', 1);
INSERT INTO `rows` VALUES (9, '9', 1);
INSERT INTO `rows` VALUES (10, '10', 1);
INSERT INTO `rows` VALUES (11, '11', 1);
INSERT INTO `rows` VALUES (12, '12', 1);
INSERT INTO `rows` VALUES (13, '1', 2);
INSERT INTO `rows` VALUES (14, '2', 2);
INSERT INTO `rows` VALUES (15, '3', 2);
INSERT INTO `rows` VALUES (16, '4', 2);
INSERT INTO `rows` VALUES (17, '5', 2);
INSERT INTO `rows` VALUES (18, '6', 2);
INSERT INTO `rows` VALUES (19, '7', 2);
INSERT INTO `rows` VALUES (20, '8', 2);
INSERT INTO `rows` VALUES (21, '9', 2);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `seatDetails`
-- 

CREATE TABLE `seatDetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seat_id` int(11) DEFAULT NULL,
  `performance_id` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `is_reserved` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `seat_id` (`seat_id`)
) ENGINE=MyISAM AUTO_INCREMENT=312 DEFAULT CHARSET=latin1 AUTO_INCREMENT=312 ;

-- 
-- Volcar la base de datos para la tabla `seatDetails`
-- 

INSERT INTO `seatDetails` VALUES (1, 1, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (2, 7, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (3, 8, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (4, 9, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (5, 10, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (6, 11, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (7, 12, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (8, 13, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (9, 14, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (10, 15, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (11, 16, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (12, 17, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (13, 18, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (14, 19, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (15, 20, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (16, 21, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (17, 22, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (18, 23, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (19, 24, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (20, 2, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (212, 25, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (211, 26, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (23, 3, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (24, 27, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (25, 28, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (26, 29, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (27, 4, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (28, 30, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (29, 31, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (30, 32, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (31, 5, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (32, 33, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (33, 34, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (34, 35, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (35, 36, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (36, 37, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (37, 38, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (38, 6, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (39, 39, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (40, 40, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (41, 41, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (42, 42, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (43, 43, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (44, 44, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (45, 45, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (46, 46, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (47, 47, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (48, 48, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (49, 49, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (50, 50, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (51, 51, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (52, 52, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (53, 53, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (54, 54, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (55, 55, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (56, 56, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (57, 57, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (58, 58, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (59, 59, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (60, 60, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (61, 61, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (62, 62, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (63, 63, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (64, 64, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (65, 65, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (66, 66, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (67, 67, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (68, 68, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (69, 69, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (70, 70, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (71, 71, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (72, 72, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (73, 73, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (74, 74, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (75, 75, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (76, 76, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (77, 77, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (78, 78, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (79, 79, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (80, 80, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (81, 81, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (82, 82, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (83, 83, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (84, 84, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (85, 85, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (86, 86, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (87, 87, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (88, 88, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (89, 89, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (90, 90, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (91, 91, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (92, 92, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (93, 93, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (94, 94, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (95, 95, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (96, 96, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (97, 97, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (98, 98, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (99, 99, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (100, 100, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (101, 101, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (102, 102, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (103, 103, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (104, 104, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (105, 105, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (106, 106, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (107, 107, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (108, 108, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (109, 109, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (110, 110, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (111, 111, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (112, 112, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (113, 113, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (114, 114, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (115, 115, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (116, 116, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (117, 117, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (118, 118, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (119, 119, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (120, 120, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (121, 121, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (122, 122, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (123, 123, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (124, 124, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (125, 125, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (126, 126, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (127, 127, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (128, 128, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (129, 129, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (130, 130, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (131, 131, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (132, 132, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (133, 133, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (134, 134, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (135, 135, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (136, 136, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (137, 137, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (138, 138, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (139, 139, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (140, 140, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (141, 141, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (142, 142, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (143, 143, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (144, 144, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (145, 145, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (146, 146, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (147, 147, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (148, 148, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (149, 149, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (150, 150, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (151, 151, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (152, 152, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (153, 153, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (154, 154, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (155, 155, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (156, 156, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (157, 157, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (158, 160, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (159, 161, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (160, 162, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (161, 163, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (162, 164, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (163, 165, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (164, 166, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (165, 167, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (166, 168, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (167, 169, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (168, 170, 1, 15.00, 1);
INSERT INTO `seatDetails` VALUES (169, 171, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (170, 172, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (171, 173, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (172, 174, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (173, 175, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (174, 176, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (175, 178, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (176, 179, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (177, 180, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (178, 181, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (179, 182, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (180, 183, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (181, 184, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (182, 185, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (183, 186, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (184, 187, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (185, 188, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (186, 189, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (187, 190, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (188, 191, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (189, 192, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (190, 193, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (191, 194, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (192, 195, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (193, 196, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (194, 197, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (195, 198, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (196, 199, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (197, 200, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (198, 201, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (199, 202, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (200, 203, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (201, 204, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (202, 205, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (203, 206, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (204, 207, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (205, 208, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (206, 209, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (207, 210, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (208, 211, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (209, 212, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (210, 213, 1, 15.00, NULL);
INSERT INTO `seatDetails` VALUES (213, 214, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (214, 221, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (215, 222, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (216, 223, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (217, 224, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (218, 225, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (219, 226, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (220, 227, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (221, 228, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (222, 229, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (223, 230, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (224, 231, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (225, 232, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (226, 233, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (227, 234, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (228, 235, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (229, 236, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (230, 237, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (231, 215, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (232, 238, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (233, 216, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (234, 239, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (235, 240, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (236, 241, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (237, 217, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (238, 242, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (239, 243, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (240, 244, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (241, 218, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (242, 245, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (243, 246, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (244, 247, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (245, 248, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (246, 249, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (247, 250, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (248, 251, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (249, 252, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (250, 219, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (251, 253, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (252, 254, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (253, 255, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (254, 220, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (255, 256, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (256, 257, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (257, 258, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (258, 259, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (259, 260, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (260, 261, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (261, 262, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (262, 263, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (263, 264, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (264, 265, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (265, 266, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (266, 267, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (267, 268, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (268, 269, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (269, 270, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (270, 271, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (271, 272, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (272, 273, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (273, 274, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (274, 275, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (275, 276, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (276, 277, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (277, 278, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (278, 279, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (279, 280, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (280, 281, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (281, 282, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (282, 283, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (283, 284, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (284, 285, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (285, 286, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (286, 287, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (287, 288, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (288, 289, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (289, 290, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (290, 291, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (291, 292, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (292, 293, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (293, 294, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (294, 295, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (295, 296, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (296, 297, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (297, 298, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (298, 299, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (299, 300, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (300, 301, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (301, 302, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (302, 303, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (303, 304, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (304, 305, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (305, 306, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (306, 307, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (307, 308, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (308, 309, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (309, 310, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (310, 311, 7, 12.50, NULL);
INSERT INTO `seatDetails` VALUES (311, 312, 7, 12.50, NULL);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `seats`
-- 

CREATE TABLE `seats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seat_number` varchar(50) NOT NULL,
  `row_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `row_id` (`row_id`)
) ENGINE=MyISAM AUTO_INCREMENT=313 DEFAULT CHARSET=latin1 AUTO_INCREMENT=313 ;

-- 
-- Volcar la base de datos para la tabla `seats`
-- 

INSERT INTO `seats` VALUES (1, '1', 1);
INSERT INTO `seats` VALUES (2, '2', 1);
INSERT INTO `seats` VALUES (3, '3', 1);
INSERT INTO `seats` VALUES (4, '4', 1);
INSERT INTO `seats` VALUES (5, '5', 1);
INSERT INTO `seats` VALUES (6, '6', 1);
INSERT INTO `seats` VALUES (7, '7', 1);
INSERT INTO `seats` VALUES (8, '8', 1);
INSERT INTO `seats` VALUES (9, '9', 1);
INSERT INTO `seats` VALUES (10, '10', 1);
INSERT INTO `seats` VALUES (11, '11', 1);
INSERT INTO `seats` VALUES (12, '12', 1);
INSERT INTO `seats` VALUES (13, '13', 1);
INSERT INTO `seats` VALUES (14, '14', 1);
INSERT INTO `seats` VALUES (15, '15', 1);
INSERT INTO `seats` VALUES (16, '16', 1);
INSERT INTO `seats` VALUES (17, '17', 1);
INSERT INTO `seats` VALUES (18, '1', 2);
INSERT INTO `seats` VALUES (19, '2', 2);
INSERT INTO `seats` VALUES (20, '3', 2);
INSERT INTO `seats` VALUES (21, '4', 2);
INSERT INTO `seats` VALUES (22, '5', 2);
INSERT INTO `seats` VALUES (23, '6', 2);
INSERT INTO `seats` VALUES (24, '7', 2);
INSERT INTO `seats` VALUES (25, '8', 2);
INSERT INTO `seats` VALUES (26, '9', 2);
INSERT INTO `seats` VALUES (27, '10', 2);
INSERT INTO `seats` VALUES (28, '11', 2);
INSERT INTO `seats` VALUES (29, '12', 2);
INSERT INTO `seats` VALUES (30, '13', 2);
INSERT INTO `seats` VALUES (31, '14', 2);
INSERT INTO `seats` VALUES (32, '15', 2);
INSERT INTO `seats` VALUES (33, '16', 2);
INSERT INTO `seats` VALUES (34, '17', 2);
INSERT INTO `seats` VALUES (35, '18', 2);
INSERT INTO `seats` VALUES (36, '1', 3);
INSERT INTO `seats` VALUES (37, '2', 3);
INSERT INTO `seats` VALUES (38, '3', 3);
INSERT INTO `seats` VALUES (39, '4', 3);
INSERT INTO `seats` VALUES (40, '5', 3);
INSERT INTO `seats` VALUES (41, '6', 3);
INSERT INTO `seats` VALUES (42, '7', 3);
INSERT INTO `seats` VALUES (43, '8', 3);
INSERT INTO `seats` VALUES (44, '9', 3);
INSERT INTO `seats` VALUES (45, '10', 3);
INSERT INTO `seats` VALUES (46, '11', 3);
INSERT INTO `seats` VALUES (47, '12', 3);
INSERT INTO `seats` VALUES (48, '13', 3);
INSERT INTO `seats` VALUES (49, '14', 3);
INSERT INTO `seats` VALUES (50, '15', 3);
INSERT INTO `seats` VALUES (51, '16', 3);
INSERT INTO `seats` VALUES (52, '17', 3);
INSERT INTO `seats` VALUES (53, '1', 4);
INSERT INTO `seats` VALUES (54, '2', 4);
INSERT INTO `seats` VALUES (55, '3', 4);
INSERT INTO `seats` VALUES (56, '4', 4);
INSERT INTO `seats` VALUES (57, '5', 4);
INSERT INTO `seats` VALUES (58, '6', 4);
INSERT INTO `seats` VALUES (59, '7', 4);
INSERT INTO `seats` VALUES (60, '8', 4);
INSERT INTO `seats` VALUES (61, '9', 4);
INSERT INTO `seats` VALUES (62, '10', 4);
INSERT INTO `seats` VALUES (63, '11', 4);
INSERT INTO `seats` VALUES (64, '12', 4);
INSERT INTO `seats` VALUES (65, '13', 4);
INSERT INTO `seats` VALUES (66, '14', 4);
INSERT INTO `seats` VALUES (67, '15', 4);
INSERT INTO `seats` VALUES (68, '16', 4);
INSERT INTO `seats` VALUES (69, '17', 4);
INSERT INTO `seats` VALUES (70, '18', 4);
INSERT INTO `seats` VALUES (71, '1', 5);
INSERT INTO `seats` VALUES (72, '2', 5);
INSERT INTO `seats` VALUES (73, '3', 5);
INSERT INTO `seats` VALUES (74, '4', 5);
INSERT INTO `seats` VALUES (75, '5', 5);
INSERT INTO `seats` VALUES (76, '6', 5);
INSERT INTO `seats` VALUES (77, '7', 5);
INSERT INTO `seats` VALUES (78, '8', 5);
INSERT INTO `seats` VALUES (79, '9', 5);
INSERT INTO `seats` VALUES (80, '10', 5);
INSERT INTO `seats` VALUES (81, '11', 5);
INSERT INTO `seats` VALUES (82, '12', 5);
INSERT INTO `seats` VALUES (83, '13', 5);
INSERT INTO `seats` VALUES (84, '14', 5);
INSERT INTO `seats` VALUES (85, '15', 5);
INSERT INTO `seats` VALUES (86, '16', 5);
INSERT INTO `seats` VALUES (87, '17', 5);
INSERT INTO `seats` VALUES (88, '1', 6);
INSERT INTO `seats` VALUES (89, '2', 6);
INSERT INTO `seats` VALUES (90, '3', 6);
INSERT INTO `seats` VALUES (91, '4', 6);
INSERT INTO `seats` VALUES (92, '5', 6);
INSERT INTO `seats` VALUES (93, '6', 6);
INSERT INTO `seats` VALUES (94, '7', 6);
INSERT INTO `seats` VALUES (95, '8', 6);
INSERT INTO `seats` VALUES (96, '9', 6);
INSERT INTO `seats` VALUES (97, '10', 6);
INSERT INTO `seats` VALUES (98, '11', 6);
INSERT INTO `seats` VALUES (99, '12', 6);
INSERT INTO `seats` VALUES (100, '13', 6);
INSERT INTO `seats` VALUES (101, '14', 6);
INSERT INTO `seats` VALUES (102, '15', 6);
INSERT INTO `seats` VALUES (103, '16', 6);
INSERT INTO `seats` VALUES (104, '17', 6);
INSERT INTO `seats` VALUES (105, '18', 6);
INSERT INTO `seats` VALUES (106, '1', 7);
INSERT INTO `seats` VALUES (107, '2', 7);
INSERT INTO `seats` VALUES (108, '3', 7);
INSERT INTO `seats` VALUES (109, '4', 7);
INSERT INTO `seats` VALUES (110, '5', 7);
INSERT INTO `seats` VALUES (111, '6', 7);
INSERT INTO `seats` VALUES (112, '7', 7);
INSERT INTO `seats` VALUES (113, '8', 7);
INSERT INTO `seats` VALUES (114, '9', 7);
INSERT INTO `seats` VALUES (115, '10', 7);
INSERT INTO `seats` VALUES (116, '11', 7);
INSERT INTO `seats` VALUES (117, '12', 7);
INSERT INTO `seats` VALUES (118, '13', 7);
INSERT INTO `seats` VALUES (119, '14', 7);
INSERT INTO `seats` VALUES (120, '15', 7);
INSERT INTO `seats` VALUES (121, '16', 7);
INSERT INTO `seats` VALUES (122, '17', 7);
INSERT INTO `seats` VALUES (123, '1', 8);
INSERT INTO `seats` VALUES (124, '2', 8);
INSERT INTO `seats` VALUES (125, '3', 8);
INSERT INTO `seats` VALUES (126, '4', 8);
INSERT INTO `seats` VALUES (127, '5', 8);
INSERT INTO `seats` VALUES (128, '6', 8);
INSERT INTO `seats` VALUES (129, '7', 8);
INSERT INTO `seats` VALUES (130, '8', 8);
INSERT INTO `seats` VALUES (131, '9', 8);
INSERT INTO `seats` VALUES (132, '10', 8);
INSERT INTO `seats` VALUES (133, '11', 8);
INSERT INTO `seats` VALUES (134, '12', 8);
INSERT INTO `seats` VALUES (135, '13', 8);
INSERT INTO `seats` VALUES (136, '14', 8);
INSERT INTO `seats` VALUES (137, '15', 8);
INSERT INTO `seats` VALUES (138, '16', 8);
INSERT INTO `seats` VALUES (139, '17', 8);
INSERT INTO `seats` VALUES (140, '18', 8);
INSERT INTO `seats` VALUES (141, '1', 9);
INSERT INTO `seats` VALUES (142, '2', 9);
INSERT INTO `seats` VALUES (143, '3', 9);
INSERT INTO `seats` VALUES (144, '4', 9);
INSERT INTO `seats` VALUES (145, '5', 9);
INSERT INTO `seats` VALUES (146, '6', 9);
INSERT INTO `seats` VALUES (147, '7', 9);
INSERT INTO `seats` VALUES (148, '8', 9);
INSERT INTO `seats` VALUES (149, '9', 9);
INSERT INTO `seats` VALUES (150, '10', 9);
INSERT INTO `seats` VALUES (151, '11', 9);
INSERT INTO `seats` VALUES (152, '12', 9);
INSERT INTO `seats` VALUES (153, '13', 9);
INSERT INTO `seats` VALUES (154, '14', 9);
INSERT INTO `seats` VALUES (155, '15', 9);
INSERT INTO `seats` VALUES (156, '16', 9);
INSERT INTO `seats` VALUES (157, '17', 9);
INSERT INTO `seats` VALUES (178, '18', 10);
INSERT INTO `seats` VALUES (160, '1', 10);
INSERT INTO `seats` VALUES (161, '2', 10);
INSERT INTO `seats` VALUES (162, '3', 10);
INSERT INTO `seats` VALUES (163, '4', 10);
INSERT INTO `seats` VALUES (164, '5', 10);
INSERT INTO `seats` VALUES (165, '6', 10);
INSERT INTO `seats` VALUES (166, '7', 10);
INSERT INTO `seats` VALUES (167, '8', 10);
INSERT INTO `seats` VALUES (168, '9', 10);
INSERT INTO `seats` VALUES (169, '10', 10);
INSERT INTO `seats` VALUES (170, '11', 10);
INSERT INTO `seats` VALUES (171, '12', 10);
INSERT INTO `seats` VALUES (172, '13', 10);
INSERT INTO `seats` VALUES (173, '14', 10);
INSERT INTO `seats` VALUES (174, '15', 10);
INSERT INTO `seats` VALUES (175, '16', 10);
INSERT INTO `seats` VALUES (176, '17', 10);
INSERT INTO `seats` VALUES (179, '1', 11);
INSERT INTO `seats` VALUES (180, '2', 11);
INSERT INTO `seats` VALUES (181, '3', 11);
INSERT INTO `seats` VALUES (182, '4', 11);
INSERT INTO `seats` VALUES (183, '5', 11);
INSERT INTO `seats` VALUES (184, '6', 11);
INSERT INTO `seats` VALUES (185, '7', 11);
INSERT INTO `seats` VALUES (186, '8', 11);
INSERT INTO `seats` VALUES (187, '9', 11);
INSERT INTO `seats` VALUES (188, '10', 11);
INSERT INTO `seats` VALUES (189, '11', 11);
INSERT INTO `seats` VALUES (190, '12', 11);
INSERT INTO `seats` VALUES (191, '13', 11);
INSERT INTO `seats` VALUES (192, '14', 11);
INSERT INTO `seats` VALUES (193, '15', 11);
INSERT INTO `seats` VALUES (194, '16', 11);
INSERT INTO `seats` VALUES (195, '17', 11);
INSERT INTO `seats` VALUES (196, '1', 12);
INSERT INTO `seats` VALUES (197, '2', 12);
INSERT INTO `seats` VALUES (198, '3', 12);
INSERT INTO `seats` VALUES (199, '4', 12);
INSERT INTO `seats` VALUES (200, '5', 12);
INSERT INTO `seats` VALUES (201, '6', 12);
INSERT INTO `seats` VALUES (202, '7', 12);
INSERT INTO `seats` VALUES (203, '8', 12);
INSERT INTO `seats` VALUES (204, '9', 12);
INSERT INTO `seats` VALUES (205, '10', 12);
INSERT INTO `seats` VALUES (206, '11', 12);
INSERT INTO `seats` VALUES (207, '12', 12);
INSERT INTO `seats` VALUES (208, '13', 12);
INSERT INTO `seats` VALUES (209, '14', 12);
INSERT INTO `seats` VALUES (210, '15', 12);
INSERT INTO `seats` VALUES (211, '16', 12);
INSERT INTO `seats` VALUES (212, '17', 12);
INSERT INTO `seats` VALUES (213, '18', 12);
INSERT INTO `seats` VALUES (214, '1', 13);
INSERT INTO `seats` VALUES (215, '2', 13);
INSERT INTO `seats` VALUES (216, '3', 13);
INSERT INTO `seats` VALUES (217, '4', 13);
INSERT INTO `seats` VALUES (218, '5', 13);
INSERT INTO `seats` VALUES (219, '6', 13);
INSERT INTO `seats` VALUES (220, '7', 13);
INSERT INTO `seats` VALUES (221, '8', 13);
INSERT INTO `seats` VALUES (222, '9', 13);
INSERT INTO `seats` VALUES (223, '10', 13);
INSERT INTO `seats` VALUES (224, '11', 13);
INSERT INTO `seats` VALUES (225, '1', 14);
INSERT INTO `seats` VALUES (226, '2', 14);
INSERT INTO `seats` VALUES (227, '3', 14);
INSERT INTO `seats` VALUES (228, '4', 14);
INSERT INTO `seats` VALUES (229, '5', 14);
INSERT INTO `seats` VALUES (230, '6', 14);
INSERT INTO `seats` VALUES (231, '7', 14);
INSERT INTO `seats` VALUES (232, '8', 14);
INSERT INTO `seats` VALUES (233, '9', 14);
INSERT INTO `seats` VALUES (234, '10', 14);
INSERT INTO `seats` VALUES (235, '11', 14);
INSERT INTO `seats` VALUES (236, '1', 15);
INSERT INTO `seats` VALUES (237, '2', 15);
INSERT INTO `seats` VALUES (238, '3', 15);
INSERT INTO `seats` VALUES (239, '4', 15);
INSERT INTO `seats` VALUES (240, '5', 15);
INSERT INTO `seats` VALUES (241, '6', 15);
INSERT INTO `seats` VALUES (242, '7', 15);
INSERT INTO `seats` VALUES (243, '8', 15);
INSERT INTO `seats` VALUES (244, '9', 15);
INSERT INTO `seats` VALUES (245, '10', 15);
INSERT INTO `seats` VALUES (246, '11', 15);
INSERT INTO `seats` VALUES (247, '1', 16);
INSERT INTO `seats` VALUES (248, '2', 16);
INSERT INTO `seats` VALUES (249, '3', 16);
INSERT INTO `seats` VALUES (250, '4', 16);
INSERT INTO `seats` VALUES (251, '5', 16);
INSERT INTO `seats` VALUES (252, '6', 16);
INSERT INTO `seats` VALUES (253, '7', 16);
INSERT INTO `seats` VALUES (254, '8', 16);
INSERT INTO `seats` VALUES (255, '9', 16);
INSERT INTO `seats` VALUES (256, '10', 16);
INSERT INTO `seats` VALUES (257, '11', 16);
INSERT INTO `seats` VALUES (258, '1', 17);
INSERT INTO `seats` VALUES (259, '2', 17);
INSERT INTO `seats` VALUES (260, '3', 17);
INSERT INTO `seats` VALUES (261, '4', 17);
INSERT INTO `seats` VALUES (262, '5', 17);
INSERT INTO `seats` VALUES (263, '6', 17);
INSERT INTO `seats` VALUES (264, '7', 17);
INSERT INTO `seats` VALUES (265, '8', 17);
INSERT INTO `seats` VALUES (266, '9', 17);
INSERT INTO `seats` VALUES (267, '10', 17);
INSERT INTO `seats` VALUES (268, '11', 17);
INSERT INTO `seats` VALUES (269, '1', 18);
INSERT INTO `seats` VALUES (270, '2', 18);
INSERT INTO `seats` VALUES (271, '3', 18);
INSERT INTO `seats` VALUES (272, '4', 18);
INSERT INTO `seats` VALUES (273, '5', 18);
INSERT INTO `seats` VALUES (274, '6', 18);
INSERT INTO `seats` VALUES (275, '7', 18);
INSERT INTO `seats` VALUES (276, '8', 18);
INSERT INTO `seats` VALUES (277, '9', 18);
INSERT INTO `seats` VALUES (278, '10', 18);
INSERT INTO `seats` VALUES (279, '11', 18);
INSERT INTO `seats` VALUES (280, '1', 19);
INSERT INTO `seats` VALUES (281, '2', 19);
INSERT INTO `seats` VALUES (282, '3', 19);
INSERT INTO `seats` VALUES (283, '4', 19);
INSERT INTO `seats` VALUES (284, '5', 19);
INSERT INTO `seats` VALUES (285, '6', 19);
INSERT INTO `seats` VALUES (286, '7', 19);
INSERT INTO `seats` VALUES (287, '8', 19);
INSERT INTO `seats` VALUES (288, '9', 19);
INSERT INTO `seats` VALUES (289, '10', 19);
INSERT INTO `seats` VALUES (290, '11', 19);
INSERT INTO `seats` VALUES (291, '1', 20);
INSERT INTO `seats` VALUES (292, '2', 20);
INSERT INTO `seats` VALUES (293, '3', 20);
INSERT INTO `seats` VALUES (294, '4', 20);
INSERT INTO `seats` VALUES (295, '5', 20);
INSERT INTO `seats` VALUES (296, '6', 20);
INSERT INTO `seats` VALUES (297, '7', 20);
INSERT INTO `seats` VALUES (298, '8', 20);
INSERT INTO `seats` VALUES (299, '9', 20);
INSERT INTO `seats` VALUES (300, '10', 20);
INSERT INTO `seats` VALUES (301, '11', 20);
INSERT INTO `seats` VALUES (302, '1', 21);
INSERT INTO `seats` VALUES (303, '2', 21);
INSERT INTO `seats` VALUES (304, '3', 21);
INSERT INTO `seats` VALUES (305, '4', 21);
INSERT INTO `seats` VALUES (306, '5', 21);
INSERT INTO `seats` VALUES (307, '6', 21);
INSERT INTO `seats` VALUES (308, '7', 21);
INSERT INTO `seats` VALUES (309, '8', 21);
INSERT INTO `seats` VALUES (310, '9', 21);
INSERT INTO `seats` VALUES (311, '10', 21);
INSERT INTO `seats` VALUES (312, '11', 21);

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `theaters`
-- 

CREATE TABLE `theaters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `theaters`
-- 

INSERT INTO `theaters` VALUES (1, 'Teatro Garnelo', 'Montilla');
INSERT INTO `theaters` VALUES (2, 'Auditorio Municipal', 'Lucena');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `ticketCartLines`
-- 

CREATE TABLE `ticketCartLines` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `seat_id` int(11) DEFAULT NULL,
  `performance_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `seat_id` (`seat_id`),
  KEY `performance_id` (`performance_id`)
) ENGINE=MyISAM AUTO_INCREMENT=273 DEFAULT CHARSET=latin1 AUTO_INCREMENT=273 ;

-- 
-- Volcar la base de datos para la tabla `ticketCartLines`
-- 


-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `tickets`
-- 

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `performance_id` int(11) NOT NULL,
  `seatDetails_id` int(11) NOT NULL,
  `serial_number` varchar(255) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `purchased_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serial_number` (`serial_number`),
  KEY `user_id` (`user_id`),
  KEY `performance_id` (`performance_id`),
  KEY `seat_id` (`seatDetails_id`)
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

-- 
-- Volcar la base de datos para la tabla `tickets`
-- 

INSERT INTO `tickets` VALUES (1, 1, 1, 26, '39f78a79-d3d0-4178-80c5-b8d22c7cda1a', 15, '2024-06-09 12:01:47');
INSERT INTO `tickets` VALUES (2, 1, 1, 25, '73b757e8-f716-4bd4-9a84-343624d81130', 15, '2024-06-09 12:01:47');
INSERT INTO `tickets` VALUES (3, 2, 1, 170, 'a5b4fdfa-8718-4354-b6da-f74a77f288ae', 15, '2024-06-09 13:22:49');
INSERT INTO `tickets` VALUES (4, 2, 1, 169, '8fcb7c22-ffa5-4f0c-b17d-14c03529b103', 15, '2024-06-09 13:22:49');
INSERT INTO `tickets` VALUES (5, 2, 1, 84, 'd611857d-4adf-4c3f-a4f3-aa80f4200803', 15, '2024-06-09 13:22:49');
INSERT INTO `tickets` VALUES (6, 2, 1, 83, '1c4515da-e954-4d8f-a8b1-08aa67568162', 15, '2024-06-09 13:22:49');
INSERT INTO `tickets` VALUES (7, 2, 1, 114, '45f6fc01-ffb5-4e11-823a-def5c0c3d8aa', 15, '2024-06-09 13:22:49');
INSERT INTO `tickets` VALUES (8, 2, 1, 113, '5ac0ad27-adb1-4eec-8881-e4611f547970', 15, '2024-06-09 13:22:49');
INSERT INTO `tickets` VALUES (9, 2, 1, 77, '70c5ae6b-01a8-4183-9167-86da8df2f7e2', 15, '2024-06-09 13:22:49');
INSERT INTO `tickets` VALUES (10, 2, 1, 76, 'bd3f72c0-80a4-46dd-be17-f7fdc8652d1f', 15, '2024-06-09 13:22:49');
INSERT INTO `tickets` VALUES (11, 2, 1, 74, '13e79910-260a-473b-9e24-8d8b75f1b845', 15, '2024-06-09 13:22:49');
INSERT INTO `tickets` VALUES (12, 2, 1, 75, '3acfdfd2-852e-4bcc-ad4a-b9b874258606', 15, '2024-06-09 13:22:49');

-- --------------------------------------------------------

-- 
-- Estructura de tabla para la tabla `users`
-- 

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- 
-- Volcar la base de datos para la tabla `users`
-- 

INSERT INTO `users` VALUES (1, 'admin', '$2b$10$LfI9rBzLDMPbXgAThFn0c.X8M1B2/3neQyQTa7ZwPNDxdL1M03cXW', 'i02copea@uco.es', 'Administrador', 'admin');
INSERT INTO `users` VALUES (2, 'user', '$2b$10$uxu27M9D26a.Mka.kif3iuuUI2DwuzUZZwOSuX1QjYv5ktFcKYFZO', 'user@gmail.com', 'User user user', 'user');
