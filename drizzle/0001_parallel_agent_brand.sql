CREATE TABLE `appointments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`tutorName` varchar(255) NOT NULL,
	`petName` varchar(255) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`serviceDescription` text NOT NULL,
	`appointmentDate` timestamp NOT NULL,
	`appointmentTime` varchar(10) NOT NULL,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `appointments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;