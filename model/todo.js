// importer le client prisma
import { PrismaClient } from "@prisma/client";

// Créer une instance du client prisma
const prisma = new PrismaClient();

const listeDesTodos = [];

/**
 * supprime un todo dans la liste de todos
 * @param {*} id
 */
export const supprimerTodo = (id) => {
  const todo = listeDesTodos.find((todo) => todo.id === id);
  const indexTodoASupprimer = listeDesTodos.indexOf(todo);
  if (indexTodoASupprimer > -1) {
    listeDesTodos.splice(indexTodoASupprimer, 1);
  }
};

/**
 * Permet d'ajouter une tâche à la liste des tâches
 * @param {*} titre, description, statut, priorite, date_limite, assignation
 * @returns
 */
export const ajoutTodo = async (titre, description, statut, priorite, date_creation, date_limite, assignation) => {
    const todo = await prisma.todo.create({
        data: {
            titre,
            description,
            statut,
            priorite,
            date_creation,
            date_limite,
            assignation,
        },
    });
    return todo;
};

/**
 * Pour obtenir la liste de toutes les tâches
 * @returns la liste des tâches
 */
export const getTodos = async () => {
  const todos = await prisma.todo.findMany();
  return todos;
};

/**
 * Pour obtenir une tâche par son id
 * @returns la tâche
 */
export const getTodo = async (id) => {
  const todo = await prisma.todo.findUnique({
    where: {
        id,
    },
});
  return todo;
};

/**
 * Pour mettre a jour une tâche
 * @param {*} id 
 * @returns la tâche mise a jour
 */
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
