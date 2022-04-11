const domBuilder = {
  domElement:
    /**
     * Create DOM element and insert textContent
     * @param {string} element
     * @param {string || null}  textContent
     * @param {string || null} className
     * @returns
     */
    (element, textContent, className) => {
      const domElement = document.createElement(element);
      if (textContent) {
        domElement.textContent = textContent;
      }
      if (className) {
        domElement.className = className;
      }
      return domElement;
    },
};

export default domBuilder;
