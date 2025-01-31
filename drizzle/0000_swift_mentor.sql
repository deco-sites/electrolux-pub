CREATE TABLE `productMeasurements` (
	`identifier` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`subjectOf` text,
	`propertyID` text NOT NULL,
	`unitCode` text,
	`maxValue` real,
	`minValue` real,
	FOREIGN KEY (`subjectOf`) REFERENCES `products`(`sku`) ON UPDATE no action ON DELETE no action
);