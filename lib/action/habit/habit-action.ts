
'use server'
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache"
import { auth } from "../user/auth";
import { headers } from "next/headers";

export async function createHabit(formData: FormData): Promise<void>{
    const session = await auth.api.getSession({headers: await headers()})
    if(!session?.user.id){
        throw new Error("Unauthorized")
    }
    const user = session?.user.id
    try {
        const title = formData.get("title") as string;
        if(typeof title !== "string" || title.trim() === ""){
            throw new Error("Invalid Habit Title")
        }
        await prisma.habit.create({
            data: {title, authorId: user}
        })
    } catch (error) {
        console.log("Error creating Habit " + error)
    }
    revalidatePath("/")
}