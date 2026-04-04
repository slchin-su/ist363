 fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects/[objectID]")
    .then((response) => response.text())
    .then((text) => JSON.parse(text))
    .then((result) => parseData(result))
    .catch((error) => console.error(error));