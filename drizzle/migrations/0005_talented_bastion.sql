ALTER TABLE `comments` MODIFY COLUMN `issueId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `content` text NOT NULL;--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `type` int NOT NULL;--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `createdAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `updatedAt` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `title` text NOT NULL;--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `description` text NOT NULL;--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `fromEmail` text NOT NULL;--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `priority` int NOT NULL;--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `status` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `passwordHash` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);