ALTER TABLE `comments` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `createdAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `issues` ADD `status` int DEFAULT 0;