import prisma from "@/lib/prisma";
import { createHabit } from "@/lib/action/habit/habit-action";
import { updateHabit } from "@/lib/action/habit/update-habit-action";
import { deleteHabit } from "@/lib/action/habit/delete-habit-action";
export default async function Home() {
  const habits = await prisma.habit.findMany()
  return (
    <div className="px-4">
      homePage
      {habits.map((habit) => (
        <div key={habit.id} className="flex items-center space-x-1">
          <form className="flex items-center" action={updateHabit}>
            <input name="id" id="id" defaultValue={habit.id} hidden/>
            <input
            name="title"
            id=""
            className="input input-sm"
            defaultValue={habit.title}
            />
            <button type="submit">Update</button>
          </form>
          <form action={deleteHabit}>
            <input name="id" defaultValue={habit.id} hidden />
            <button type="submit">Delete</button>
          </form>
        </div>
      ))}
      <div className="mt-6">
        <h1>New Habit</h1>
        <div>
          <form action={createHabit}>
            <input 
              className="input"
              placeholder="Title..."
              name="title"
              id="title"
            />
            <button className="btn">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}
