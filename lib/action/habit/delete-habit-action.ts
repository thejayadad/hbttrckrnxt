'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteHabit(formData: FormData): Promise<void>{
    try {
        const id = formData.get("id")
        if(typeof id !== 'string' || id.trim() === ''){
            throw new Error("Invalid Habit Id")
        }
        await prisma.habit.delete({
            where: {id}
        })
    } catch (error) {
        console.log("Error deleting Habit " + error)
    }
    revalidatePath("/")
}