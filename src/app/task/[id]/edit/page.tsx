import EditTaskForm from "@/components/EditTaskForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/utils/db";

interface EditTaskPageProps {
    params: { id: string };
}

const EditTaskPage = async ({ params }: EditTaskPageProps) => {
    const task = await prisma.task.findUnique({
        where: { id: parseInt(params.id) }
    });

    if (!task) notFound();

    return (
        <section>
            <Link className="underline block mb-10" href={`/task/${task.id}`}>
                {"<< "} Back to task details
            </Link>
            <div className="w-2/3 mx-auto rounded-md p-5 bg-slate-800 border-2 border-gray-300">
                <h1 className="mb-7 font-bold text-3xl">Edit Task</h1>
                <EditTaskForm task={task} />
            </div>
        </section>
    );
};

export default EditTaskPage;