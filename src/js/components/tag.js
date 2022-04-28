const createTag = (textTag, select) => {
  console.log("select", select);
  const tagsSelectTypeContainer = document.querySelector(
    `.${select}-container`
  );

  const box = document.createElement("div");
  box.className = `tag ${select}-tag tag-${textTag.replaceAll(" ", "-")}`;

  const content = document.createElement("span");
  content.textContent = textTag;

  const closeTag = document.createElement("button");
  closeTag.className = "close-tag";
  closeTag.setAttribute("data-tag", `${textTag.replaceAll(" ", "-")}`);
  closeTag.setAttribute("data-select", select);

  box.append(content, closeTag);
  tagsSelectTypeContainer.append(box);

  return closeTag;
};

export default createTag;
