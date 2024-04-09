CREATE TABLE `comments` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`issueId` int,
	`createdAt` datetime,
	`content` text,
	`type` int,
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `issues` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`createdAt` datetime,
	`title` text,
	`description` text,
	`fromEmail` text,
	`priority` int,
	`assignedUser` int,
	CONSTRAINT `issues_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` text,
	`email` text,
	`passwordHash` text,
	CONSTRAINT `users_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_issueId_issues_id_fk` FOREIGN KEY (`issueId`) REFERENCES `issues`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `issues` ADD CONSTRAINT `issues_assignedUser_users_id_fk` FOREIGN KEY (`assignedUser`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;