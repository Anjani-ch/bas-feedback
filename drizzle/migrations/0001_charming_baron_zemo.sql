ALTER TABLE `comments` MODIFY COLUMN `issueId` serial AUTO_INCREMENT;--> statement-breakpoint
ALTER TABLE `issues` MODIFY COLUMN `assignedUser` serial AUTO_INCREMENT;