
(function () {
  // Select the custom tab block
  const block = document.querySelector('.custom-tab.block');
  if (!block) return;

  const items = block.children;

  // Hide all hover data except the first one
  Array.from(items).forEach((item, index) => {
    const hoverDiv = item.children[1];
    if (hoverDiv && index !== 0) {
      hoverDiv.style.display = 'none';
    }
  });

  // Add hover behavior
  Array.from(items).forEach((item) => {
    const dataDiv = item.children[0];   // "data", "data 2"
    const hoverDiv = item.children[1];  // "hover data", "hover data 2"

    if (!dataDiv || !hoverDiv) return;

    dataDiv.addEventListener('mouseenter', () => {
      // Hide all hover data
      Array.from(items).forEach(i => {
        if (i.children[1]) {
          i.children[1].style.display = 'none';
        }
      });

      // Show the correct hover data
      hoverDiv.style.display = 'block';
    });
  });
})();
