const selectUI = (options) => {
  const optionsLi = document.querySelectorAll("[role='option']");
  if (optionsLi.length > 0) {
    optionsLi.forEach((option) => option.remove());
  }

  let optionsCount = 0;
  options.forEach((option) => {
    let targetedList = document.querySelector(`.${option.name}-list`);
    option.list.forEach((element) => {
      optionsCount++;
      let optionLi = document.createElement("li");
      optionLi.setAttribute("id", option.name + "-" + optionsCount);
      optionLi.setAttribute("role", "option");
      optionLi.setAttribute("tabindex", 0);
      optionLi.textContent = element;
      targetedList.append(optionLi);
    });
  });
};

export default selectUI;
