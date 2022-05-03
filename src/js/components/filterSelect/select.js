const select = () => {
  const buttons = document.querySelectorAll(".list-button");
  const closeButtons = document.querySelectorAll(".close");

  /**
   * Show the list of options
   */
  const showList = (mainWrapper, listWrapper, button) => {
    if (document.querySelector(".show")) {
      hiddenListActions();
    }
    mainWrapper.classList.add("show");
    listWrapper.classList.remove("hidden");
    button.setAttribute("aria-expanded", true);
  };

  buttons.forEach((button) => {
    const mainWrapper = document.querySelector(
      `.combo-${button.getAttribute("id").replace("-button", "")}`
    );

    const listWrapper = document.querySelector(
      `.${button.getAttribute("id").replace("-button", "")}-list-wrapper`
    );

    const list = document.querySelector(
      `.${button.getAttribute("id").replace("button", "list")}`
    );

    button.addEventListener("click", () => {
      showList(mainWrapper, listWrapper, button, list);
    });
  });

  /**
   * Hide the list of options and trigger medias sort
   */
  const hiddenListActions = () => {
    document.querySelector(".show .combo-list").classList.add("hidden");
    document.querySelector(".show .list-wrapper").classList.add("hidden");

    document
      .querySelector(".show .list-button")
      .removeAttribute("aria-expanded");
    document.querySelector(".show").classList.remove("show");
  };

  const hideList = (e) => {
    if (
      !document.querySelector(".show") ||
      e.target.classList.contains("list-input") ||
      e.target.classList.contains("list-button")
    ) {
      return;
    }
    hiddenListActions();
  };

  document.addEventListener("click", (e) => hideList(e));
  closeButtons.forEach((button) =>
    button.addEventListener("click", hiddenListActions)
  );
};

export default select;
