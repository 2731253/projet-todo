// importer le client prisma
import { PrismaClient } from "@prisma/client";

import bcrypt from "bcrypt";

// Créer une instance du client prisma
const prisma = new PrismaClient();

function formatDate(date) {
  if (date == null) {
    return "";
  }
  const d = new Date(date);
  return d.toLocaleDateString("fr-FR");
}
const statut = {
  1: "À faire",
  2: "En cours",
  3: "En révision",
  4: "Terminée",
};

const priorite = {
  1: "Faible",
  2: "Moyenne",
  3: "Élevée",
};

// initialisation des statuts
export const initialisation = async () => {
  const statuts = ["À faire", "En cours", "En révision", "Terminée"];
  const priorites = ["Faible", "Moyenne", "Élevée"];

  for (const nom of statuts) {
    // Vérifier si le statut existe déjà
    const statutExiste = await prisma.statut.findUnique({
      where: { nom },
    });

    // Si le statut n'existe pas, l'insérer
    if (!statutExiste) {
      await prisma.statut.create({
        data: { nom },
      });
      console.log(`Statut ajouté : ${nom}`);
    }
  }

  for (const nom of priorites) {
    // Vérifier si la priorite existe déjà
    const prioriteExiste = await prisma.priorite.findUnique({
      where: { nom },
    });

    // Si le statut n'existe pas, l'insérer
    if (!prioriteExiste) {
      await prisma.priorite.create({
        data: { nom },
      });
      console.log(`Priorité ajouté : ${nom}`);
    }
  }

  const nombre_utilisateurs = await prisma.user.count();
  if (nombre_utilisateurs === 0) {
    let nom = "Etudiant";
    let email = "etudiant@email.com";
    let password = await bcrypt.hash("password", 10);
    let type = "user";
    await prisma.user.create({
      data: { nom, email, password, type },
    });
    console.log(`Utilisateur ajouté : ${nom}`);

    nom = "Admin";
    email = "admin@email.com";
    password = await bcrypt.hash("password", 10);
    type = "admin";
    await prisma.user.create({
      data: { nom, email, password, type },
    });
    console.log(`Administarteur ajouté : ${nom}`);
  }
};

await initialisation();

/**
 * supprime un todo dans la liste de todos
 * @param {*} id
 * @returns la tache supprime
 */
export const supprimerTodo = async (id) => {
  const changement = `Supprimer Todo: {id}`;
  const par_user_id = 1;
  const todo_id = id;
  await prisma.changement.create({
    data: {
      changement,
      par_user_id,
      todo_id,
    },
  });

  const todo = await prisma.todo.delete({
    where: {
      id: id,
    },
  });

  return todo;
};

/**
 * Permet d'ajouter une tâche à la liste des tâches
 * @param {*} titre, description, statut, priorite, date_limite, assignation
 * @returns
 */
export const ajoutTodo = async (
  titre,
  description,
  statut_id,
  priorite_id,
  date_creation,
  date_limite,
  assignation_id
) => {
  if (date_creation) {
    date_creation = new Date(date_creation);
  }
  if (date_limite) {
    date_limite = new Date(date_limite);
  }
  const todo = await prisma.todo.create({
    data: {
      titre,
      description,
      statut_id,
      priorite_id,
      date_creation,
      date_limite,
      assignation_id,
    },
  });


  ConversionDate(todo);
  const changement = `a ajouté la tache ${todo.titre}`;
  const par_user_id = 1;
  const todo_id = todo.id;
  await prisma.changement.create({
    data: {
      changement,
      par_user_id,
      todo_id,
    },
  });
  return todo;
};

/**
 * Pour obtenir la liste de toutes les tâches
 * @returns la liste des tâches
 */
export const getTodos = async () => {
  const todos = await prisma.todo.findMany({
    include: {
      priorite: true,
    },
  });
  todos.forEach((todo) => {
    ConversionDate(todo);
  });
  return todos;
};

/**
 * Pour obtenir la liste de toutes les priorites
 * @returns la liste des priorites
 */
export const getPriorites = async () => {
  const priorites = await prisma.priorite.findMany();
  return priorites;
};

/**
 * Pour obtenir la liste de toutes les statuts
 * @returns la liste des statuts
 */
export const getStatuts = async () => {
  const statuts = await prisma.statut.findMany();
  return statuts;
};

/**
 * Pour obtenir la liste de tous les utilisateurs
 * @returns la liste des utilisateurs
 */
export const getUtilisateurs = async () => {
  const utilisateurs = await prisma.user.findMany();
  return utilisateurs;
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
    include: {
      statut: true,
      priorite: true,
      assignation: true,
      changements: {
        include: {
          par_user: true,
        },
      },
    },
  });
  if (todo) {
  ConversionDate(todo);
  };
  return todo;
};

/**
 * Pour mettre a jour une tâche
 * @param {*} id
 * @returns la tâche mise a jour
 */

export const updateTodo = async (
  id,
  titre,
  description,
  statut_id,
  priorite_id,
  date_limite,
  assignation_id
) => {
  if (date_limite) {
    date_limite = new Date(date_limite);
  }
  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      titre,
      description,
      statut_id,
      priorite_id,
      date_limite,
      assignation_id,
    },
  });
  if (todo) {
    ConversionDate(todo);
    const changement = `a modifier la tache ${todo.titre}`;
    const par_user_id = 1;
    const todo_id = todo.id;
    await prisma.changement.create({
      data: {
        changement,
        par_user_id,
        todo_id,
      },
    });
  }
  return todo;
};

/**
 * Pour obtenir une tâche par son filterType qui est l'Id dans la table priorite
 * @returns la tâche
 */
export const getFilterTodo = async (filterType) => {
  const todos = await prisma.todo.findMany({
    where: {
      priorite_id: filterType,
    },
    include: {
      priorite: true,
    }
  }
  );
  todos.forEach(todo => {
    ConversionDate(todo);
  })
  return todos;
};

/**
 * Pour obtenir une liste des tache trier en fonction soit de la date de creation soit de la date finale(sortBy)
 * @returns la tâche
 */
export const getSortedTodos = async (sortBy, sort) => {
  let todos;
  if (sortBy === "date_limite") {
    todos = await prisma.todo.findMany({
      orderBy: {
        date_limite: sort,
      },
      include: {
        priorite: true,
      }
    }
    );
  }
  else {
    todos = await prisma.todo.findMany({
      orderBy: {
        date_creation: sort,
      },
      include: {
        priorite: true,
      }
    }
    );
  }

  todos.forEach(todo => {
    ConversionDate(todo);
  })

  return todos;
};

const ConversionDate =(todo) => {
  
    if (todo.date_creation) {
      todo.date_creation = new Date(todo.date_creation).getTime();
    }
    if (todo.date_limite) {
      todo.date_limite = new Date(todo.date_limite).getTime();
    }

    if (todo.changements) {
      for (let i = 0; i < todo.changements.length ; i++) {
        todo.changements[i].date_creation = new Date(todo.changements[i].date_creation).getTime();
      }
    }
  
};
