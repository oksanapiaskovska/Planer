var modal = document.querySelector(".modal");
var closeButton = document.querySelector(".close-button");
let currentModalItem = ''; 

function toggleModal(item) {
  currentModalItem ? currentModalItem = '' : currentModalItem = item; 
  modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
  if (event.target === modal) {
      toggleModal();
  }
}

function hideForm() {
  document.getElementById("duty-form").style.display = 'none';
}

function showForm() {
  document.getElementById("duty-form").style.display = 'block';
}

function saveDuty() {
 let duty;
 document.getElementsByName('duty-radio').forEach(el => {
    if(el.checked) {
      duty = el.id;
    }
  })
  if (duty !== "day-off") {
    const form = document.forms.namedItem('duty-form');
    const data = new FormData(form);
    const start = `${data.get('start-hours')}:${data.get('start-minutes')}`;
    const finish = `${data.get('finish-hours')}:${data.get('finish-minutes')}`;
    addDuty(currentModalItem, {duty, start, finish});
  } else {
    addDuty(currentModalItem, {duty});
  }
  toggleModal();
}

function addDuty(dayId, data) {
  const day = document.getElementById(dayId);
  const timeHtml = `<p>${data.start}-${data.finish}</p>`;
  const sufix = '-empty';
  let htmlString = '';
  const onClickAttr = 'onclick="removeDuty(event)"';

  if (data.duty === 'day'){
    htmlString = `<i class="far fa-sun"></i>${timeHtml}<i class="fas fa-times"${onClickAttr}></i>`;
  } else if (data.duty === 'night') {
    htmlString = `<i class="far fa-moon"></i>${timeHtml}<i class="fas fa-times"${onClickAttr}></i>`;
  } else {
    htmlString = `<i class="far fa-grin-beam"></i>Have fun!<i class="fas fa-times"${onClickAttr}></i>`;
  }

  const div = document.createElement("div");
  const emptyMessage = document.getElementById(dayId + sufix);
  const dutyClass = data.duty !== 'day-off' ? `${data.duty}-duty`: 'day-off';
  div.classList.add(dutyClass);
  div.innerHTML = htmlString.trim();
  emptyMessage && emptyMessage.remove();
  day.insertAdjacentElement('afterbegin', div);
}

function removeDuty(event) {
  const nodes = event.path;
  nodes[1].remove();
} 