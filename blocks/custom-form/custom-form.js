export default async function decorate(block) {
  const link = block.querySelector('a');

  if (!link || !link.href) {
    console.error('custom-form: JSON link not found');
    return;
  }

  let json;
  try {
    // ✅ IMPORTANT: fetch the link AS-IS
    const response = await fetch(link.href);

    if (!response.ok) {
      console.error('custom-form: Fetch failed', response.status);
      return;
    }

    json = await response.json();
  } catch (e) {
    console.error('custom-form: Error fetching JSON', e);
    return;
  }

  if (!json?.data) {
    console.error('custom-form: Invalid JSON structure', json);
    return;
  }

  // Clear authored content (the link)
  block.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'custom-form';

  json.data.forEach((field) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-field';

    const label = document.createElement('label');
    label.textContent = field['Name ']?.trim() || field.Value;
    label.htmlFor = field.Value;

    const input = document.createElement('input');
    input.type = field.Type || 'text';
    input.name = field.Value;
    input.id = field.Value;

    if (field.Placeholder) {
      input.placeholder = field.Placeholder;
    }

    if (field.Mandate === 'true') {
      input.required = true;
    }

    wrapper.append(label, input);
    form.appendChild(wrapper);
  });

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit';

  form.appendChild(submitBtn);
  block.appendChild(form);
}
