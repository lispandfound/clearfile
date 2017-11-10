BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS `tags` (
	`tag_id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`note_uuid`	TEXT,
	`tag`	TEXT,
	FOREIGN KEY(`note_uuid`) REFERENCES `notes`(`uuid`) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `notes` (
	`uuid`	TEXT,
	`name`	TEXT,
	`mime`	TEXT,
	`ocr_text`	TEXT,
	PRIMARY KEY(`uuid`)
);
COMMIT;
