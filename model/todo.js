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
