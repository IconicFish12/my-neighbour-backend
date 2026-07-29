/*
  Warnings:

  - You are about to drop the column `userId` on the `tb_tagihan` table. All the data in the column will be lost.
  - You are about to drop the `_ForumPostToPostTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_ForumPostToPostTag" DROP CONSTRAINT "_ForumPostToPostTag_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_ForumPostToPostTag" DROP CONSTRAINT "_ForumPostToPostTag_B_fkey";

-- DropForeignKey
ALTER TABLE "public"."tb_penghuni" DROP CONSTRAINT "tb_penghuni_unit_id_fkey";

-- AlterTable
ALTER TABLE "public"."tb_penghuni" ALTER COLUMN "residentStatus" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."tb_tagihan" DROP COLUMN "userId";

-- DropTable
DROP TABLE "public"."_ForumPostToPostTag";

-- CreateTable
CREATE TABLE "public"."_ForumPostsToPostTags" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ForumPostsToPostTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ForumPostsToPostTags_B_index" ON "public"."_ForumPostsToPostTags"("B");

-- AddForeignKey
ALTER TABLE "public"."tb_penghuni" ADD CONSTRAINT "tb_penghuni_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "public"."tb_unit_hunian"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ForumPostsToPostTags" ADD CONSTRAINT "_ForumPostsToPostTags_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."tb_postingan_forum"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_ForumPostsToPostTags" ADD CONSTRAINT "_ForumPostsToPostTags_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."tb_PostTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
