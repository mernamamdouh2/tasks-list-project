import { z } from "zod";

// Create Task Schema
export const createTaskSchema = z.object({
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title should be of type string"
    })
        .min(2, { message: "title should be at least 2 characters long" })
        .max(200, { message: "title should be less than 200 characters" }),

    description: z.string({
        required_error: "description is required",
        invalid_type_error: "description should be of type string"
    })
        .min(4, { message: "description should be at least 4 characters long" })
});

// Update Task Schema
export const updateTaskSchema = z.object({
    id: z.string({
        required_error: "ID is required",
        invalid_type_error: "ID should be of type string"
    }),
    title: z.string({
        required_error: "title is required",
        invalid_type_error: "title should be of type string"
    })
        .min(2, { message: "Title should be at least 2 characters long" })
        .max(200, { message: "Title should be less than 200 characters" }),
    status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"], {
        required_error: "status is required",
        invalid_type_error: "status should be one of: TODO, IN_PROGRESS, COMPLETED"
    }),
    description: z.string({
        required_error: "description is required",
        invalid_type_error: "description should be of type string"
    })
        .min(4, { message: "Description should be at least 4 characters long" })
});