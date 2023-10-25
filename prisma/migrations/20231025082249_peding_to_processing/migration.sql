/*
  Warnings:

  - The values [pending] on the enum `Task_Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `Status` ENUM('todo', 'processing', 'completed') NOT NULL DEFAULT 'todo';
