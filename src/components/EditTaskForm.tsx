"use client";

import { Status } from "@prisma/client";
import { UpdateTaskDto } from "@/utils/dtos";
import { toast } from "react-toastify";
import { updateTask } from "@/utils/actions";
import { updateTaskSchema } from "@/utils/validationSchema";

interface EditTaskFormProps {
    task: {
        id: number;
        title: string;
        description: string;
        status: Status;
        // createdAt: Date;
        // updatedAt: Date;
    };
}

const EditTaskForm = ({ task }: EditTaskFormProps) => {
    const clientAction = async (formData: FormData) => {
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
        const status = formData.get("status") as Status;
        const id = formData.get("id")?.toString();

        const validation = updateTaskSchema.safeParse({ id, title, description, status });
        if (!validation.success) {
            return toast.error(validation.error.errors[0].message);
        }

        try {
            await updateTask({ id, title, description, status } as UpdateTaskDto);
            toast.success("Task updated successfully");
        } catch (error) {
            toast.error("Failed to update task. Please try again.");
        }
    };

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                await clientAction(formData);
            }}
            className="flex flex-col gap-6"
        >
            <input type="hidden" value={task.id.toString()} name="id" />
            <input
                type="text"
                placeholder="Task Title"
                name="title"
                className="p-2 text-xl rounded-md text-gray-950"
                defaultValue={task.title}
            />
            <select
                name="status"
                defaultValue={task.status}
                className="p-2 text-xl rounded-md text-gray-950"
            >
                <option value="TODO">TODO</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="COMPLETED">COMPLETED</option>
            </select>
            <textarea
                name="description"
                rows={5}
                placeholder="Task Description"
                defaultValue={task.description}
                className="p-2 text-xl rounded-md text-gray-950 resize-none"
            ></textarea>
            <button
                type="submit"
                className="bg-cyan-300 hover:bg-cyan-400 text-black font-semibold text-xl rounded-md p-3 transition-colors"
            >
                Edit Task
            </button>
        </form>
    );
};

export default EditTaskForm;