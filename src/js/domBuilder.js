const domBuilder = {
  /*Creation de wrapper */
  wrapper: (tag, className) => {
    const domElement = document.createElement(tag);
    domElement.className = className;

    return domElement;
  },
  /*Création d'éléments avec contenu */
  elementWithContent: (tag, content) => {
    const domElement = document.createElement(tag);
    domElement.textContent = content;
    return domElement;
  },
  /*Suprresson d'éléments du DOM */
  removeElements: (elements) => {
    elements.forEach((element) => element.remove());
  },
};

export default domBuilder;
