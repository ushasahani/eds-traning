document.addEventListener('DOMContentLoaded', () => {
  const block = document.querySelector('.custom-tab.block');
  const items = block.children;

  // Hide all hover contents except first
  [...items].forEach((item, index) => {
    const content = item.children[1];
    if (index !== 0) {
      content.style.display = 'none';
    }
  });

  // Hover logic
  [...items].forEach(item => {
    const title = item.children[0];   // data / data 2 / etc
    const content = item.children[1]; // hover data / hover data 2 / etc

    title.addEventListener('mouseenter', () => {
      // Hide all contents
      [...items].forEach(i => {
        i.children[1].style.display = 'none';
      });

      // Show hovered content
      content.style.display = 'block';
    });
  });
});
