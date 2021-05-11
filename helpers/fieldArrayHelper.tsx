//returns a valid element name property for properly use fieldArray collection of Reach-hook-form
export const getFieldName = (name: string, collectionName: string, index: number) => {
    if (collectionName) {
        return `${collectionName}[${index}].${name}`;
    }
    else {
        return name;
    }
};

//Used to avoid warning for non unique IDs
export const getFieldId = (name: string, collectionName: string, index: number) => {
    if (collectionName) {
        return `${collectionName}_${index}_${name}`;
    }
    else {
        return name;
    }
}

//errors: formContext or useForm errors collection
export const getFieldError = (name: string, collectionName: string, index: number, errors: any) => {
    if (collectionName) {
        if (errors[collectionName] && errors[collectionName].length > index) {
            return errors[collectionName][index]?.[name];
        }
    }
    else {
        return errors[name];
    }
    return null;
}