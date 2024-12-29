export type CreateTaskDto = {
    title: string;
    description: string;
}

export type UpdateTaskDto = {
    id: string;
    title: string;
    description: string;
    status: "TODO" | "IN_PROGRESS" | "COMPLETED";
};