
document.addEventListener("DOMContentLoaded", function () {
  const wrapper = document.querySelector(".custom-tab.block");
  const items = wrapper.children;

  // Hide all contents except first
  Array.from(items).forEach((item, index) => {
    const title = item.children[0];
    const content = item.children[1];

    if (index !== 0) {
      content.style.display = "none";
    } else {
      title.classList.add("active");
    }

    // Hover functionality
    title.addEventListener("mouseenter", () => {
      // Hide all contents & remove active
      Array.from(items).forEach(i => {
        i.children[1].style.display = "none";
        i.children[0].classList.remove("active");
      });

      // Show current
      content.style.display = "block";
      title.classList.add("active");
    });
  });
});
