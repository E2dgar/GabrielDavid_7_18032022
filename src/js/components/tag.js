const createTag = (textTag, tagType) => {
  console.log("text", tagType);
  const tagsContainer = document.querySelector(".tags");
  const box = document.createElement("div");
  box.className = `tag ${tagType}-tag`;

  const content = document.createElement("span");
  content.textContent = textTag;

  const closeTag = document.createElement("button");
  closeTag.className = "close-tag";

  box.append(content, closeTag);
  tagsContainer.append(box);
};

export default createTag;
