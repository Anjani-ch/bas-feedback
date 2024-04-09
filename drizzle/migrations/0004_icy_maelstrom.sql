ALTER TABLE `comments` ADD `updatedAt` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `issues` ADD `updatedAt` timestamp DEFAULT (now());