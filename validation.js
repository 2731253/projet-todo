export const isIDValid = (id) => {
    id = parseInt(id);
    return id &&
    typeof id === "number";
}

export const isTitreValid = (titre) => {
    return titre &&
    typeof titre === "string" &&
    titre.length >= 5 &&
    titre.length <= 30;
}

export const isDescriptionValid = (description) => {
    return description &&
    typeof description === "string" &&
    description.length >= 5 &&
    description.length <= 150;
}

export const isStatutValid = (statut_id) => {
    statut_id = parseInt(statut_id);
    return statut_id &&
    typeof statut_id === "number";
}

export const isPrioriteValid = (priorite_id) => {
    priorite_id = parseInt(priorite_id);
    return priorite_id &&
    typeof priorite_id === "number";
}

export const isDateCreationValid = (date_creation) => {
    if (date_creation == null) {
        return true;
    }
    date_creation = parseInt(date_creation);
    return date_creation && typeof date_creation === "number";
}

export const isDateLimiteValid = (date_limite) => {
    if (date_limite == null) {
        return true;
    }
    date_limite = parseInt(date_limite);
    return date_limite && typeof date_limite === "number";
}

export const isAssignationValid = (assignation_id) => {
    assignation_id = parseInt(assignation_id);
    return assignation_id &&
    typeof assignation_id === "number";
}

export const isSortByValid = (sortBy) => {
    sortBy = parseInt(sortBy);
    return sortBy &&
    typeof sortBy === "number";
}

export const isSortValid = (sort) => {
    sort = parseInt(sort);
    return sort &&
    typeof sort === "number";
}

export const isTypeFilterValid = (typeFilter) => {
    typeFilter = parseInt(typeFilter);
    return typeFilter &&
    typeof typeFilter === "number";
}
