/*
  Warnings:

  - You are about to alter the column `Time` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `Time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
