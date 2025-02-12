-- -- phpMyAdmin SQL Dump
-- -- version 5.2.1
-- -- https://www.phpmyadmin.net/
-- --
-- -- Host: localhost
-- -- Generation Time: Feb 02, 2025 at 12:37 PM
-- -- Wersja serwera: 10.4.28-MariaDB
-- -- Wersja PHP: 8.0.28

-- SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
-- START TRANSACTION;
-- SET time_zone = "+00:00";


-- /*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
-- /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
-- /*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
-- /*!40101 SET NAMES utf8mb4 */;

-- --
-- -- Database: `weather_app`
-- --

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `cache`
-- --

-- CREATE TABLE `cache` (
--   `key` varchar(255) NOT NULL,
--   `value` mediumtext NOT NULL,
--   `expiration` int(11) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `cache_locks`
-- --

-- CREATE TABLE `cache_locks` (
--   `key` varchar(255) NOT NULL,
--   `owner` varchar(255) NOT NULL,
--   `expiration` int(11) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `cities`
-- --

-- CREATE TABLE `cities` (
--   `id` bigint(20) UNSIGNED NOT NULL,
--   `openweather_city_id` bigint(20) NOT NULL,
--   `name` varchar(100) NOT NULL,
--   `state` varchar(100) DEFAULT NULL,
--   `country_code` varchar(10) DEFAULT NULL,
--   `lat` double DEFAULT NULL,
--   `lon` double DEFAULT NULL,
--   `timezone` int(11) DEFAULT NULL,
--   `population` int(11) DEFAULT NULL,
--   `created_at` timestamp NULL DEFAULT NULL,
--   `updated_at` timestamp NULL DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --
-- -- Dumping data for table `cities`
-- --

-- INSERT INTO `cities` (`id`, `openweather_city_id`, `name`, `state`, `country_code`, `lat`, `lon`, `timezone`, `population`, `created_at`, `updated_at`) VALUES
-- (1, 758445, 'Stalowa Wola', NULL, 'PL', 50.5829, 22.0533, 3600, NULL, '2025-02-02 10:30:23', '2025-02-02 10:30:23');

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `failed_jobs`
-- --

-- CREATE TABLE `failed_jobs` (
--   `id` bigint(20) UNSIGNED NOT NULL,
--   `uuid` varchar(255) NOT NULL,
--   `connection` text NOT NULL,
--   `queue` text NOT NULL,
--   `payload` longtext NOT NULL,
--   `exception` longtext NOT NULL,
--   `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `jobs`
-- --

-- CREATE TABLE `jobs` (
--   `id` bigint(20) UNSIGNED NOT NULL,
--   `queue` varchar(255) NOT NULL,
--   `payload` longtext NOT NULL,
--   `attempts` tinyint(3) UNSIGNED NOT NULL,
--   `reserved_at` int(10) UNSIGNED DEFAULT NULL,
--   `available_at` int(10) UNSIGNED NOT NULL,
--   `created_at` int(10) UNSIGNED NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `job_batches`
-- --

-- CREATE TABLE `job_batches` (
--   `id` varchar(255) NOT NULL,
--   `name` varchar(255) NOT NULL,
--   `total_jobs` int(11) NOT NULL,
--   `pending_jobs` int(11) NOT NULL,
--   `failed_jobs` int(11) NOT NULL,
--   `failed_job_ids` longtext NOT NULL,
--   `options` mediumtext DEFAULT NULL,
--   `cancelled_at` int(11) DEFAULT NULL,
--   `created_at` int(11) NOT NULL,
--   `finished_at` int(11) DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `migrations`
-- --

-- CREATE TABLE `migrations` (
--   `id` int(10) UNSIGNED NOT NULL,
--   `migration` varchar(255) NOT NULL,
--   `batch` int(11) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --
-- -- Dumping data for table `migrations`
-- --

-- INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
-- (1, '0001_01_01_000000_create_users_table', 1),
-- (2, '0001_01_01_000001_create_cache_table', 1),
-- (3, '0001_01_01_000002_create_jobs_table', 1),
-- (4, '2024_06_18_042605_create_personal_access_tokens_table', 1),
-- (5, '2025_01_28_082349_create_cities_table', 1),
-- (6, '2025_01_28_082426_create_user_cities_table', 1),
-- (7, '2025_01_28_082455_create_weather_data_table', 1);

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `password_reset_tokens`
-- --

-- CREATE TABLE `password_reset_tokens` (
--   `email` varchar(255) NOT NULL,
--   `token` varchar(255) NOT NULL,
--   `created_at` timestamp NULL DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `personal_access_tokens`
-- --

-- CREATE TABLE `personal_access_tokens` (
--   `id` bigint(20) UNSIGNED NOT NULL,
--   `tokenable_type` varchar(255) NOT NULL,
--   `tokenable_id` bigint(20) UNSIGNED NOT NULL,
--   `name` varchar(255) NOT NULL,
--   `token` varchar(64) NOT NULL,
--   `abilities` text DEFAULT NULL,
--   `last_used_at` timestamp NULL DEFAULT NULL,
--   `expires_at` timestamp NULL DEFAULT NULL,
--   `created_at` timestamp NULL DEFAULT NULL,
--   `updated_at` timestamp NULL DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --
-- -- Dumping data for table `personal_access_tokens`
-- --

-- INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
-- (1, 'App\\Models\\User', 12, 'dawid', 'ef98f3c3c30c2dd1c0a3c3571d9d13d470fb937c80f70f574ff49b86208329cf', '[\"*\"]', '2025-02-02 10:30:30', NULL, '2025-02-02 10:30:13', '2025-02-02 10:30:30');

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `sessions`
-- --

-- CREATE TABLE `sessions` (
--   `id` varchar(255) NOT NULL,
--   `user_id` bigint(20) UNSIGNED DEFAULT NULL,
--   `ip_address` varchar(45) DEFAULT NULL,
--   `user_agent` text DEFAULT NULL,
--   `payload` longtext NOT NULL,
--   `last_activity` int(11) NOT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `users`
-- --

-- CREATE TABLE `users` (
--   `id` bigint(20) UNSIGNED NOT NULL,
--   `name` varchar(255) NOT NULL,
--   `email` varchar(255) NOT NULL,
--   `email_verified_at` timestamp NULL DEFAULT NULL,
--   `password` varchar(255) NOT NULL,
--   `remember_token` varchar(100) DEFAULT NULL,
--   `created_at` timestamp NULL DEFAULT NULL,
--   `updated_at` timestamp NULL DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --
-- -- Dumping data for table `users`
-- --

-- INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
-- (1, 'Merritt Shanahan I', 'wuckert.deondre@example.net', '2025-02-02 10:26:15', '$2y$12$aSrm7EgO65yPO.p2fwZGRuo8iUtmjERIZiVP7WO3uK3kphudVtHrq', 'Bs56gbbBMQ', '2025-02-02 10:26:16', '2025-02-02 10:26:16'),
-- (2, 'Abigail Crist DVM', 'jessie99@example.org', '2025-02-02 10:26:16', '$2y$12$.ZNUr/Y5ZP/92glvtcTBlepntor7cQrgKpAHO3mQ6pagbbfVUZywa', 'il5UBMvNDT', '2025-02-02 10:26:16', '2025-02-02 10:26:16'),
-- (3, 'Prof. Romaine Gerlach V', 'psporer@example.com', '2025-02-02 10:26:16', '$2y$12$Lft2J5jH019Pi2gY6/PEY.NVuCHRo47TndRCGH7gtrAPDiREDOlhG', 'D9qgsbDqMC', '2025-02-02 10:26:17', '2025-02-02 10:26:17'),
-- (4, 'Dr. Columbus Simonis DDS', 'alyson43@example.com', '2025-02-02 10:26:17', '$2y$12$DRyQh9ZwMFb4HrRf0caKF.uXRWEyxDVmf18y2HRH01uXlik.AfGiu', 'lpkogo3FXJ', '2025-02-02 10:26:17', '2025-02-02 10:26:17'),
-- (5, 'Selina Walker', 'jamir65@example.com', '2025-02-02 10:26:17', '$2y$12$UqCEk03bFZhngGTPtcO8Lug/bnm2SGYNSbcD2FDONhzedQ4q2Z3dK', 'VGFxYR9fj5', '2025-02-02 10:26:17', '2025-02-02 10:26:17'),
-- (6, 'Prof. Rodrick Bergstrom', 'xmurray@example.com', '2025-02-02 10:26:17', '$2y$12$8TPSxodaLCAejgLSODFmjOlGTAJyNBUjDuWWU0ITSBrBlZUshGPmy', 'QJKzU4IzaY', '2025-02-02 10:26:18', '2025-02-02 10:26:18'),
-- (7, 'Dena Jones MD', 'abdullah80@example.org', '2025-02-02 10:26:18', '$2y$12$mwlyLOtCjwL2YGsBptJraeUA4v584bghCCYQjNZ1cORWGZx44pefO', 'Oa9EUyn8OR', '2025-02-02 10:26:18', '2025-02-02 10:26:18'),
-- (8, 'Miss Loma Dickens', 'jakubowski.dillan@example.com', '2025-02-02 10:26:18', '$2y$12$OqiUkiSIw829oIYFIASi6u0IJwq11xnaExKiitY8PfPBZIpDEm5/K', 'xtRrj3eVV4', '2025-02-02 10:26:18', '2025-02-02 10:26:18'),
-- (9, 'Rylee Koepp DVM', 'jaskolski.kenny@example.org', '2025-02-02 10:26:18', '$2y$12$1rsWN3gYwcFwiKlfCUfIUuaFR.JYOwYjGMVi8QF.BguH/oTz.Vcnu', 'lZMXzXKtEL', '2025-02-02 10:26:19', '2025-02-02 10:26:19'),
-- (10, 'Mr. Trevor Tremblay', 'kcarroll@example.org', '2025-02-02 10:26:19', '$2y$12$CbTVYu5wUQNGRvnAxcHa7e8H1eVPKtw7ggKC5AXBxgznvtmkEnzi2', 'RKtCikFNL4', '2025-02-02 10:26:19', '2025-02-02 10:26:19'),
-- (11, 'Test User', 'test@example.com', '2025-02-02 10:26:19', '$2y$12$o.cv5cfKcf555LRBWctwZeItn66tKefdWhkgtJo5oae.MICMSs4Wu', 'MngEYmpIYQ', '2025-02-02 10:26:20', '2025-02-02 10:26:20'),
-- (12, 'dawid', 'dawid@onet.pl', NULL, '$2y$12$OaVmFLMHvqT87g8pye69FOdXidJwPseZugAj9sJqlUmEaKhzcxizG', NULL, '2025-02-02 10:30:13', '2025-02-02 10:30:13');

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `user_cities`
-- --

-- CREATE TABLE `user_cities` (
--   `id` bigint(20) UNSIGNED NOT NULL,
--   `user_id` bigint(20) UNSIGNED NOT NULL,
--   `city_id` bigint(20) UNSIGNED NOT NULL,
--   `created_at` timestamp NULL DEFAULT NULL,
--   `updated_at` timestamp NULL DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --
-- -- Dumping data for table `user_cities`
-- --

-- INSERT INTO `user_cities` (`id`, `user_id`, `city_id`, `created_at`, `updated_at`) VALUES
-- (1, 12, 1, '2025-02-02 10:30:24', '2025-02-02 10:30:24');

-- -- --------------------------------------------------------

-- --
-- -- Struktura tabeli dla tabeli `weather_data`
-- --

-- CREATE TABLE `weather_data` (
--   `id` bigint(20) UNSIGNED NOT NULL,
--   `city_id` bigint(20) UNSIGNED NOT NULL,
--   `forecast_time` timestamp NULL DEFAULT NULL,
--   `temperature` double DEFAULT NULL,
--   `feels_like` double DEFAULT NULL,
--   `pressure` int(11) DEFAULT NULL,
--   `humidity` int(11) DEFAULT NULL,
--   `clouds` int(11) DEFAULT NULL,
--   `wind_speed` double DEFAULT NULL,
--   `wind_deg` double DEFAULT NULL,
--   `visibility` int(11) DEFAULT NULL,
--   `rain` double DEFAULT NULL,
--   `snow` double DEFAULT NULL,
--   `weather_main` varchar(50) DEFAULT NULL,
--   `weather_description` varchar(100) DEFAULT NULL,
--   `created_at` timestamp NULL DEFAULT NULL,
--   `updated_at` timestamp NULL DEFAULT NULL
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --
-- -- Dumping data for table `weather_data`
-- --

-- INSERT INTO `weather_data` (`id`, `city_id`, `forecast_time`, `temperature`, `feels_like`, `pressure`, `humidity`, `clouds`, `wind_speed`, `wind_deg`, `visibility`, `rain`, `snow`, `weather_main`, `weather_description`, `created_at`, `updated_at`) VALUES
-- (1, 1, '2025-02-02 10:30:23', 3.25, 2.19, 1024, 74, 100, 1.34, 264, 10000, NULL, NULL, 'Clouds', 'overcast clouds', NULL, NULL),
-- (2, 1, '2025-02-02 10:30:25', 3.25, 2.19, 1025, 74, 100, 1.34, 264, 10000, NULL, NULL, 'Clouds', 'overcast clouds', NULL, NULL);

-- --
-- -- Indeksy dla zrzutów tabel
-- --

-- --
-- -- Indeksy dla tabeli `cache`
-- --
-- ALTER TABLE `cache`
--   ADD PRIMARY KEY (`key`);

-- --
-- -- Indeksy dla tabeli `cache_locks`
-- --
-- ALTER TABLE `cache_locks`
--   ADD PRIMARY KEY (`key`);

-- --
-- -- Indeksy dla tabeli `cities`
-- --
-- ALTER TABLE `cities`
--   ADD PRIMARY KEY (`id`),
--   ADD UNIQUE KEY `cities_openweather_city_id_unique` (`openweather_city_id`);

-- --
-- -- Indeksy dla tabeli `failed_jobs`
-- --
-- ALTER TABLE `failed_jobs`
--   ADD PRIMARY KEY (`id`),
--   ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

-- --
-- -- Indeksy dla tabeli `jobs`
-- --
-- ALTER TABLE `jobs`
--   ADD PRIMARY KEY (`id`),
--   ADD KEY `jobs_queue_index` (`queue`);

-- --
-- -- Indeksy dla tabeli `job_batches`
-- --
-- ALTER TABLE `job_batches`
--   ADD PRIMARY KEY (`id`);

-- --
-- -- Indeksy dla tabeli `migrations`
-- --
-- ALTER TABLE `migrations`
--   ADD PRIMARY KEY (`id`);

-- --
-- -- Indeksy dla tabeli `password_reset_tokens`
-- --
-- ALTER TABLE `password_reset_tokens`
--   ADD PRIMARY KEY (`email`);

-- --
-- -- Indeksy dla tabeli `personal_access_tokens`
-- --
-- ALTER TABLE `personal_access_tokens`
--   ADD PRIMARY KEY (`id`),
--   ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
--   ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

-- --
-- -- Indeksy dla tabeli `sessions`
-- --
-- ALTER TABLE `sessions`
--   ADD PRIMARY KEY (`id`),
--   ADD KEY `sessions_user_id_index` (`user_id`),
--   ADD KEY `sessions_last_activity_index` (`last_activity`);

-- --
-- -- Indeksy dla tabeli `users`
-- --
-- ALTER TABLE `users`
--   ADD PRIMARY KEY (`id`),
--   ADD UNIQUE KEY `users_email_unique` (`email`);

-- --
-- -- Indeksy dla tabeli `user_cities`
-- --
-- ALTER TABLE `user_cities`
--   ADD PRIMARY KEY (`id`),
--   ADD UNIQUE KEY `user_cities_user_id_city_id_unique` (`user_id`,`city_id`),
--   ADD KEY `user_cities_city_id_foreign` (`city_id`);

-- --
-- -- Indeksy dla tabeli `weather_data`
-- --
-- ALTER TABLE `weather_data`
--   ADD PRIMARY KEY (`id`),
--   ADD KEY `weather_data_city_id_foreign` (`city_id`);

-- --
-- -- AUTO_INCREMENT for dumped tables
-- --

-- --
-- -- AUTO_INCREMENT for table `cities`
-- --
-- ALTER TABLE `cities`
--   MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

-- --
-- -- AUTO_INCREMENT for table `failed_jobs`
-- --
-- ALTER TABLE `failed_jobs`
--   MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

-- --
-- -- AUTO_INCREMENT for table `jobs`
-- --
-- ALTER TABLE `jobs`
--   MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

-- --
-- -- AUTO_INCREMENT for table `migrations`
-- --
-- ALTER TABLE `migrations`
--   MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

-- --
-- -- AUTO_INCREMENT for table `personal_access_tokens`
-- --
-- ALTER TABLE `personal_access_tokens`
--   MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

-- --
-- -- AUTO_INCREMENT for table `users`
-- --
-- ALTER TABLE `users`
--   MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

-- --
-- -- AUTO_INCREMENT for table `user_cities`
-- --
-- ALTER TABLE `user_cities`
--   MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

-- --
-- -- AUTO_INCREMENT for table `weather_data`
-- --
-- ALTER TABLE `weather_data`
--   MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

-- --
-- -- Constraints for dumped tables
-- --

-- --
-- -- Constraints for table `user_cities`
-- --
-- ALTER TABLE `user_cities`
--   ADD CONSTRAINT `user_cities_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE,
--   ADD CONSTRAINT `user_cities_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

-- --
-- -- Constraints for table `weather_data`
-- --
-- ALTER TABLE `weather_data`
--   ADD CONSTRAINT `weather_data_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE;
-- COMMIT;

-- /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
-- /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
-- /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
