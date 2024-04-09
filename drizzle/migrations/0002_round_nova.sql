ALTER TABLE `comments` MODIFY COLUMN `issueId` int;--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `assignedUser` int;--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;