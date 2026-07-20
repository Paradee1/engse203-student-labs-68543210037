import './style.css';

const form = document.querySelector('#request-form');

// TODO 1: query preview/status/list elements
const previewName = document.querySelector('#preview-name');
const previewType = document.querySelector('#preview-type');
const previewDetails = document.querySelector('#preview-details');
const requestList = document.querySelector('#request-list');
const formStatus = document.querySelector('#form-status');
const totalCount = document.querySelector('#total-count');

// TODO 2: readForm()
function readForm(form) {
  return Object.fromEntries(new FormData(form).entries());
}

// TODO 3: renderPreview(data)
function renderPreview(data) {
  previewName.textContent = data.requesterName || 'ยังไม่ระบุชื่อ';
  previewType.textContent = data.requestType || 'ยังไม่เลือกประเภท';
  previewDetails.textContent = data.details || 'ยังไม่มีรายละเอียด';
}

// TODO 4: validate(data)
function validate(data) {
  const errors = {};
  if (data.requesterName.trim().length < 2) {
    errors.requesterName = 'กรุณากรอกชื่ออย่างน้อย 2 ตัวอักษร';
  }
  if (!data.requestType) {
    errors.requestType = 'กรุณาเลือกประเภทคำขอ';
  }
  if (data.details.trim().length < 10) {
    errors.details = 'กรุณาอธิบายอย่างน้อย 10 ตัวอักษร';
  }
  return errors;
}

// TODO 5: renderErrors(errors)
function renderErrors(errors) {
  for (const name of ['requesterName', 'requestType', 'details']) {
    const field = document.querySelector(`[name="${name}"]`);
    const output = document.querySelector(`#${name}-error`);
    const message = errors[name] ?? "";
    
    output.textContent = message;
    field.setAttribute('aria-invalid', String(Boolean(message)));
  }
}

// Helper function: Render Form Status Feedback 
function renderStatus(status, message) {
  formStatus.textContent = message;
  formStatus.className = `status ${status}`;
}

// Helper function: Add item to Submitted Requests list
function addRequest(data) {
  const item = document.createElement('li');
  const title = document.createElement('strong');
  const details = document.createElement('span');
  
  title.textContent = `${data.requesterName} • ${data.requestType} `;
  details.textContent = data.details;
  
  item.append(title, details);
  requestList.prepend(item);
  
  if(totalCount) {
    let currentTotal = parseInt(totalCount.textContent) || 0;
    totalCount.textContent = currentTotal + 1;
  }
}

// TODO 6: input and submit listeners
form.addEventListener('input', (event) => {
  const data = Object.fromEntries(new FormData(event.currentTarget).entries());
  renderPreview(data);
  renderStatus('ready', 'Editing...');
});

// Form Submit Handler
form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const data = readForm(event.currentTarget);
  const errors = validate(data);
  
  renderErrors(errors);
  
  if (Object.keys(errors).length > 0) {
    renderStatus('invalid', 'Invalid Information');
    return;
  }
  
  addRequest(data);
  renderStatus('success', 'Success');
  form.reset();
  renderPreview(readForm(event.currentTarget));
});