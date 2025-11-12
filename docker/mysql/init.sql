-- MySQL 初始化脚本
-- 创建应用用户并授予必要的权限

-- 创建应用用户（如果不存在）
CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'app_password';

-- 授予应用用户对应用数据库的完全权限
GRANT ALL PRIVILEGES ON `nest_study_db_dev`.* TO 'app_user'@'%';

-- 授予应用用户创建和管理影子数据库的权限
-- 这是 Prisma migrate 所需的权限
GRANT CREATE, ALTER, DROP, REFERENCES ON *.* TO 'app_user'@'%';

-- 授予应用用户创建临时表的权限
GRANT CREATE TEMPORARY TABLES ON *.* TO 'app_user'@'%';

-- 授予应用用户锁定表的权限
GRANT LOCK TABLES ON *.* TO 'app_user'@'%';

-- 授予应用用户执行权限
GRANT EXECUTE ON *.* TO 'app_user'@'%';

-- 授予应用用户创建和删除数据库的权限（用于影子数据库）
GRANT CREATE, DROP ON *.* TO 'app_user'@'%';

-- 立即应用权限更改
FLUSH PRIVILEGES;

-- 创建应用数据库（如果不存在）
CREATE DATABASE IF NOT EXISTS `nest_study_db_dev` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;