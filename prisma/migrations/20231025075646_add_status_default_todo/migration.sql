-- AlterTable
ALTER TABLE `task` MODIFY `Status` ENUM('todo', 'pending', 'completed') NOT NULL DEFAULT 'todo';
