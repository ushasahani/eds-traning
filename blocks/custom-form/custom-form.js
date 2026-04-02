export default function decorate(block) {
  const pre = block.querySelector('pre');

  if (!pre) {
    console.error('custom-form: No <pre> tag with JSON found');
    return;
  }

  let json;

  try {
    json = JSON.parse(pre.textContent.trim());
  } catch (e) {
    console.error('custom-form: Invalid JSON', e);
    return;
  }

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

    if (field.Mandate === 'true') {
      input.required = true;
    }

    wrapper.append(label, input);
    form.appendChild(wrapper);
  });

  const btn = document.createElement('button');
  btn.type = 'submit';
  btn.textContent = 'Submit';

  form.appendChild(btn);
  block.appendChild(form);
}
