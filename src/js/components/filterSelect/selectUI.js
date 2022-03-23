const selectUI = (options) => {
  options.forEach((option) => {
    let targetedList = document.querySelector(`.${option.name}-list`);

    option.list.forEach((element) => {
      let optionLi = document.createElement("li");
      optionLi.setAttribute("id", element);
      optionLi.setAttribute("role", "option");
      optionLi.setAttribute("tabindex", 0);
      optionLi.textContent = element;
      targetedList.append(optionLi);
    });
  });

  /*const listboxArea = document.createElement("div");
  listboxArea.className = `listbox-area ${options.style}-style`;

  const label = document.createElement("span");
  label.className = "label";
  label.setAttribute("id", options.name);

  const optionsWrapper = document.createElement("div");
  optionsWrapper.setAttribute("id", `options-wrapper-${options.name}`);

  const selectedOpt = document.createElement("button");
  selectedOpt.className = "select-button";
  selectedOpt.setAttribute("id", `selected-opt-${options.name}`);
  selectedOpt.setAttribute("aria-haspopup", "listbox");
  selectedOpt.setAttribute(
    "aria-labelledby",
    `${options.name} selected-opt-${options.name}`
  );
  selectedOpt.textContent = options.name;

  const list = document.createElement("ul");
  list.className = "hidden";
  list.setAttribute("id", `options-list-${options.name}`);
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-labelledby", options.name);
  list.setAttribute("tabindex", 0);

  options.list.forEach((option) => {
    let optionLi = document.createElement("li");
    optionLi.setAttribute("id", option);
    optionLi.setAttribute("role", "option");
    optionLi.setAttribute("tabindex", 0);
    optionLi.textContent = option;

    list.append(optionLi);
  });

  optionsWrapper.append(selectedOpt, list);
  listboxArea.append(label, optionsWrapper);

  document.querySelector(".fields").append(listboxArea);*/
};

export default selectUI;
