const updateSelect = (select, options) => {
  const optionsLi = document.querySelectorAll(
    `.${select}-list [role='option']`
  );
  if (optionsLi.length > 0) {
    optionsLi.forEach((option) => option.remove());
  }

  let optionsCount = 0;
  options.forEach((option) => {
    let targetedList = document.querySelector(`.${select}-list`);
    optionsCount++;
    let optionLi = document.createElement("li");
    optionLi.setAttribute("id", select + "-" + optionsCount);
    optionLi.setAttribute("role", "option");
    optionLi.setAttribute("tabindex", 0);
    optionLi.textContent = option;
    targetedList.append(optionLi);
  });
};

export default updateSelect;
