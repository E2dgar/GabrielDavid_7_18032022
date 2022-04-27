const domBuilder = {
  wrapper: (tag, className) => {
    const domElement = document.createElement(tag);
    domElement.className = className;

    return domElement;
  },
  elementWithContent: (tag, content) => {
    const domElement = document.createElement(tag);
    domElement.textContent = content;
    return domElement;
  },
  removeElements: (elements) => {
    elements.forEach((element) => element.remove());
  },
};

export default domBuilder;
