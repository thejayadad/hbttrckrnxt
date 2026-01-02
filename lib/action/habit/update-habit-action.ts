'use server'
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateHabit(formData: FormData): Promise<void>{
    try {
        const id = formData.get('id')
        const title = formData.get("title")
        if(typeof id !== 'string' || id.trim() === ''){
            throw new Error("Invalid Habit ID")
        }
        if(typeof title !== 'string' || title.trim() === ''){
            throw new Error("Invalid Title input")
        }
        const existingHabit = await prisma.habit.findUnique({where: {id}})
        if(!existingHabit){
            throw new Error("Habit Not found")
        }
        await prisma.habit.update({
            where: {id},
            data: {title}
        })
    } catch (error) {
        console.log("Error updating Habit " + error)
    }
    revalidatePath("/")
}