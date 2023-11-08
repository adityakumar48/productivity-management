/*
  Warnings:

  - You are about to alter the column `Status` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `Task` MODIFY `Status` ENUM('TASK', 'IN_PROCESSING', 'COMPLETED', 'MARK_AS_COMPLETED') NOT NULL DEFAULT 'TASK';
