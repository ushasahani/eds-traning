export default function decorate(block) {
  let json;

  try {
    json = JSON.parse(block.textContent);
  } catch (e) {
    console.error('Invalid JSON input for form block', e);
    return;
  }

  // Clear raw JSON
  block.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'eds-form';

  // Loop through sheet data
  json.data.forEach((field) => {
    const fieldWrapper = document.createElement('div');
    fieldWrapper.className = 'form-field';

    const fieldName = field['Name ']?.trim() || field.Value;

    // Label
    const label = document.createElement('label');
    label.setAttribute('for', field.Value);
    label.textContent = fieldName;
    fieldWrapper.appendChild(label);

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

    fieldWrapper.appendChild(input);
    form.appendChild(fieldWrapper);
  });

  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Submit';
  form.appendChild(submitBtn);

  block.appendChild(form);
}
