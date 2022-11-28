const form = document.getElementById('form');
const dataShow = document.getElementById('data__text');

form.onsubmit = function(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  // этот кусок кода взят из stackoverflow. 
  // Не тупо скопирован, я честно его ломала, чтобы понять принцип работы кода
  const data = Array.from(formData.entries()).reduce((memo, [key, value]) => ({
    ...memo,
    [key]: value,
  }), {});

  dataShow.innerText = `Данные пользователя: ${JSON.stringify(data)}`;

  // данные отправляются при запуске команды php -S localhost:8080
  // иначе будет ошибка, связанная с CORS политикой
  let request = new XMLHttpRequest();
  request.open('GET', './handler.php');
  request.send(formData);
  request.onload = function() {
    alert(`Статус отправки данных на сервер: ${request.status}`);
  }
  request.onerror = function() {
    alert('Ошибка соединения');
  };
};