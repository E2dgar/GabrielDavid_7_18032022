const select = (options) => {
  const buttons = document.querySelectorAll("button");
  /*const options = document.querySelectorAll('[role=option]')*/

  /**
   * Set focus on an item. Class focus on item & aria-activedescendant on listbox
   * @param {object} item
   */
  /*const focusItem = (item) => {
    let focusedItem = document.querySelector('.focused')
    if(focusedItem){
      focusedItem.classList.remove('focused')
    }

    item.classList.add('focused')
    listbox.setAttribute('aria-activedescendant', item.id)
  }*/

  /**
   * Select a item and hide listbox
   */
  /* const selectItem = () => {
    let focusedItem = document.querySelector('.focused')
    button.textContent = focusedItem.textContent
    hideList()
  }*/

  /**
   * Add listener on keyboard
   */
  /* const keyEventsListener = () => {
    listbox.addEventListener('keydown', keyEvents)
  }*/

  /* Add listener on focus list to trigger listener on keyboad */
  /*listbox.addEventListener('focus', keyEventsListener)*/

  /**
   * Execute functions depending on keys pressed
   * @param event
   */
  /*const keyEvents = e => {
    e.preventDefault()

    if(e.code === 'Enter' || e.code === 'Space'){
      selectItem()
    }
  }*/

  /**
   * Show the list of options
   */
  const showList = (wrapper, button, list) => {
    if (document.querySelector(".show")) {
      hiddenListActions();
    }
    wrapper.classList.add("show");
    list.classList.remove("hidden");
    button.nextElementSibling.classList.remove("hidden");
    button.setAttribute("aria-expanded", true);
  };

  buttons.forEach((button) => {
    const wrapper = document.querySelector(
      `.combo-${button.getAttribute("aria-haspopup").replace("-list", "")}`
    );
    const list = document.querySelector(
      `.${button.getAttribute("aria-haspopup")}`
    );
    button.addEventListener("click", () => {
      showList(wrapper, button, list);
    });
  });

  /**
   * Hide the list of options and trigger medias sort
   */
  const hiddenListActions = () => {
    document.querySelector(".show .combo-list").classList.add("hidden");
    document.querySelector(".show input").classList.add("hidden");
    document.querySelector(".show button").removeAttribute("aria-expanded");
    document.querySelector(".show").classList.remove("show");
  };
  const hideList = (e) => {
    if (
      !document.querySelector(".show") ||
      e.target.closest("div")?.classList.contains("combo-box")
    ) {
      return;
    }
    hiddenListActions();
  };
  document.addEventListener("click", (e) => hideList(e));

  /* Focus item and select on mouse click    */
  /*const clickItem = e => {
    focusItem(e)
    selectItem()
  }*/

  /*Add listeners on options */
  /* options.forEach(option =>  option.addEventListener("click", e => clickItem(e.target)))
  options.forEach(option =>  option.addEventListener("keydown", e => {
   if(e.code === 'Enter'){
      clickItem(option)
   }
  }))*/
};

export default select;
