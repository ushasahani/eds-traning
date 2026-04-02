export default function decorate(block) {
  let json;

  // 1. Parse JSON authored in the block
  try {
    json = JSON.parse(block.textContent);
  } catch (e) {
    console.error('custom-form: Invalid JSON', e);
    return;
  }

  // 2. Clear raw JSON from DOM
  block.innerHTML = '';

  // 3. Create form
  const form = document.createElement('form');
  form.className = 'custom-form';

  // 4. Loop over sheet data
  json.data.forEach((field) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'form-field';

    const fieldName = field['Name ']?.trim() || field.Value;

    // Label
    const label = document.createElement('label');
    label.setAttribute('for', field.Value);
    label.textContent = fieldName;
    wrapper.appendChild(label);

    // Input
    const input = document.createElement('input');
    input.type = field.Type || 'text';
    input.id = field.Value;
    input.name = field.Value;

    if (field.Placeholder) {
      input.placeholder = field.Placeholder;
    }

    if (field.Mandate === 'true') {
      input.required = true;
    }

    wrapper.appendChild(input);
    form.appendChild(wrapper);
  });

  // 5. Submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit';
  form.appendChild(submitBtn);

  // 6. Append form to block
  block.appendChild(form);
}
