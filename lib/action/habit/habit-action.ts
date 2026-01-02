
'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache"


export async function createHabit(formData: FormData): Promise<void>{
    try {
        const title = formData.get("title") as string;
        if(typeof title !== "string" || title.trim() === ""){
            throw new Error("Invalid Habit Title")
        }
        await prisma.habit.create({
            data: {title}
        })
    } catch (error) {
        console.log("Error creating Habit " + error)
    }
    revalidatePath("/")
}