function generateObjectFromAttribute(objectArray, attribute) {
    let objectFromId = {}
    objectArray.forEach(
        (object) => {
            objectFromId[attribute] = object;
        }
    )
    return objectFromId;
}

export {generateObjectFromAttribute}