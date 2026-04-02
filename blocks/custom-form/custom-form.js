export default async function decorate(block) {
  const link = block.querySelector('a');

  if (!link) {
    console.error('custom-form: No JSON link found');
    return;
  }

  let json;
  try {
    const resp = await fetch(`${link.href}.json`);
    json = await resp.json();
  } catch (e) {
    console.error('custom-form: Failed to fetch JSON', e);
    return;
  }

  if (!json || !json.data) {
    console.error('custom-form: Invalid JSON structure');
    return;
  }

  // Clear authored content (link)
  block.innerHTML = '';

  // Create form
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
