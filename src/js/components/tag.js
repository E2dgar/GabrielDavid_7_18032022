const createTag = (textTag, select) => {
  /*On sélectionne le wrapper dans lequel on va ajouter les tags suivant le select*/
  const tagsSelectTypeContainer = document.querySelector(
    `.${select}-container`
  );

  /*On crée une div qui conteindra le tag*/
  const box = document.createElement("div");
  box.className = `tag ${select}-tag tag-${textTag.replaceAll(" ", "-")}`;

  /*On y ajoute le texte du tag */
  const content = document.createElement("span");
  content.textContent = textTag;

  /*On crée le button de supression du tag */
  const closeTag = document.createElement("button");
  closeTag.className = "close-tag";
  closeTag.setAttribute("data-tag", `${textTag.replaceAll(" ", "-")}`);
  closeTag.setAttribute("data-select", select);

  /*On ajoute au DOM*/
  box.append(content, closeTag);
  tagsSelectTypeContainer.append(box);

  /*On return closeTag pourpouvoir y ajouter un écouteur*/
  return closeTag;
};

export default createTag;
