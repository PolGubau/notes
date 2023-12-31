"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import prisma from "@/libs/db";
import { CreateTodoFields } from "./schemas";
import { revalidatePath } from "next/cache";

export async function handleCreateTodo(data: CreateTodoFields) {
  const session = await getServerSession(authOptions);

  const userId = session.user.id;

  //   create this new todo in the database

  const res = await prisma.todo.create({
    data: {
      title: data.title,
      content: data.content,
      creatorId: userId,
      ownerId: userId,
    },
  });
  revalidatePath(`/`);
  return res;
}
