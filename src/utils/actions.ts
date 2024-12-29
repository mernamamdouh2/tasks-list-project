"use server";

import { CreateTaskDto, UpdateTaskDto } from "./dtos";

import { Status } from "@prisma/client";
import prisma from "@/utils/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

//  "use server"; ---> to convert normal function to server action function instead of api end-point
//  "use server"; put this in above line in this page
//  name='title' in input & name='description' in textarea are necessary to transform the title and description to formData
//  next.js doesn't allow to put any function inside action, if function is server action does allow to put it in action like this: action={createTask} - not action={createTask()}
//  formData.get("title") --> title here because name='title' in input
//  Server Action Function must be in server component not client component
// Create Task
export async function createTask({ title, description }: CreateTaskDto) {
    if (typeof title !== 'string' || title.length < 2) return;
    if (typeof description !== 'string' || description.length < 4) return;

    try {
        await prisma.task.create({
            data: { title, description }
        });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("could not create the task, please try again");
    }
    
    // make comment for revalidatePath("/"); because I convert HomePage from static to dynamic
    //revalidatePath("/"); // for make refresh for table in production mode
    redirect("/");
}

// Delete Task
export async function deleteTask(formData: FormData) {
    const id = formData.get('id')?.toString();
    if (!id) return;

    try {
        await prisma.task.delete({ where: { id: parseInt(id) } });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("could not delete the task, please try again");
    }

    //revalidatePath("/");
    redirect("/");
}

// Update Task
export async function updateTask({ id, title, description, status }: UpdateTaskDto) {
    // const title = formData.get("title")?.toString();
    // const description = formData.get("description")?.toString();
    // const status = formData.get("status") as Status;
    // const id = formData.get("id")?.toString();

    if (typeof title !== 'string' || title.length < 2) return;
    if (typeof description !== 'string' || description.length < 4) return;
    if (!status) return;
    if (typeof id !== 'string') return;

    try {
        await prisma.task.update({
            where: { id: parseInt(id) },
            data: { title, description, status }
        });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new Error("could not update the task, please try again");
    }

    //revalidatePath("/");
    revalidatePath(`/task/${id}`);
    redirect(`/task/${id}`);
}