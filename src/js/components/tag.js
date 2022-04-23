const createTag = (textTag, tagType) => {
  const tagsContainer = document.querySelector(".tags");
  const box = document.createElement("div");
  box.className = `tag ${tagType} tag-${textTag}`;

  const content = document.createElement("span");
  content.textContent = textTag;

  const closeTag = document.createElement("button");
  closeTag.className = "close-tag";
  closeTag.setAttribute("data-tag", `${textTag}`);

  box.append(content, closeTag);
  tagsContainer.append(box);

  return closeTag;
};

export default createTag;
