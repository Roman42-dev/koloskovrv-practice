const numDivs = 36;
const maxHits = 10;

let hits = 0;
// Добавить на ошибки-готово
let fails = 0; 
let firstHitTime = 0;

function getTimestamp() {
  // FIXME: надо бы убрать "target" прежде чем искать новый-готово
  let d = new Date();
  return d.getTime();
}

function randomDivId() {
  let d = Math.floor(Math.random() * 6) + 1;
  let n = Math.floor(Math.random() * 6) + 1;
  return `#slot-${d}${n}`;
}


function round() {
  $('.target').removeClass('target');
  $('.miss').removeClass('miss');

  let divSelector = randomDivId();
  $(divSelector).addClass('target')
  $(divSelector).text(hits + 1)
  
  // TODO: помечать target текущим номером-готов

  // FIXME: тут надо определять при первом клике firstHitTime-готов
  if (hits === maxHits) $(divSelector).text(1)
  if (hits === 1) { firstHitTime = getTimestamp(); } 
  if (hits === maxHits) { endGame(); } 
}

function endGame() {
  $('.game-field').hide();

  // FIXME: спрятать игровое поле сначала-готово

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $('#totalScore').text(hits - fails);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?-готово
  let target = $(event.target)
  if (target.hasClass('target'))
{
    hits = hits + 1;
    target.text('');
    round();
  } else {
    fails += 1
    $(event.target).addClass('miss');
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss-готово
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке-готово
  round();

  $(".game-field").click(handleClick);
  $("#button-start").click(function() {
    hits = 0;
    fails = 0;
    firstHitTime = 0;
    $('.game-field').show();
    $('#win-message').addClass("d-none");
  });
}

$(document).ready(init);
