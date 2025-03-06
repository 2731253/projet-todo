import { Router } from "express";

const router = Router();

//Definition des routes
/*  ............. */

//Mise a jour d'une tâche
export const updateTodo = async (id) => {
    const todo = await prisma.todo.findUnique({
        where: {
            id,
        },
    });
 
    const todoUpdated = await prisma.todo.update({
        where: {
            id,
        },
        data: {
            est_faite: !todo.est_faite,
        },
    });
 
    return todoUpdated;
};
export default router;
