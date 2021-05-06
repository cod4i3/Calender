// VScode上で色々赤線が表示されたがコンパイルできたので問題は多分ない
// 調べたらVScodeのバグ？らしい
const weeks: string[] = ['日', '月', '火', '水', '木', '金', '土'];
const date = new Date();
let year: number = date.getFullYear();
// 表示のため + 1してる
let month: number = date.getMonth() + 1;
const config = { show: 3, }


function create_calendar(year, month) {

  // 最初の曜日
  const start_day: number = new Date(year, month - 1, 1).getDay();
  // 今月、先月の終わりの日
  const end_date: number = new Date(year, month, 0).getDate();
  const last_month_date: number = new Date(year, month - 1, 0).getDate();

  let year_month: string = '<h1>' + year + '年' + month + '月' + '</h1>';
  let calendar_table: string = year_month + '<table>';

  for (let i: number = 0; i < 7; i++) {
    calendar_table += '<td>' + weeks[i] + '</td>';
  }


  let day: number = 1
  // 最長で6マス必要
  for (let w: number = 0; w < 6; w++) {
    calendar_table += '<tr>';

    for (let d: number = 0; d < 7; d++) {
      if (w == 0 && d < start_day) {
        let num: number = last_month_date - start_day + d + 1;
        calendar_table += '<td class = "is-disabled">' + num + '</td>'; //空白セルを挿入
      } else if (day > end_date) {
        let num: number = day - end_date;
        calendar_table += '<td class = "is-disabled">' + num + '</td>';
        day++;
      } else {
        calendar_table += `<td class = "calendar_td"  data-date="${year}/${month}/${day}">${day}</td>`;
        day++;
      }
    }
    calendar_table += '</tr>';
  }
  calendar_table += '</table>';

  return calendar_table;
}


function show_calendar(year, month) {
  for (let i: number = 0; i < config.show; i++) {
    const calendar_table = create_calendar(year, month);
    const sec = document.createElement('section');
    sec.innerHTML = calendar_table;

    document.querySelector('#calendar').appendChild(sec);

    month++
    if (month > 12) {
      year++;
      month = 1;
    }
  }
}

function move_calendar(e) {
  document.querySelector('#calendar').innerHTML = '';
  if (e.target.id === 'prev_month') {
    month--;
    if (month < 1) {
      year--;
      month += 12;
    }
  }

  if (e.target.id === 'next_month') {
    month++;
    if (month > 12) {
      year++;
      month -= 12;
    }
  }

  if (e.target.id === 'prev_year') {
    year--;
  }
  if (e.target.id === 'next_year') {
    year++;
  }

  show_calendar(year, month);
}



document.querySelector('#prev_month').addEventListener('click', move_calendar);
document.querySelector('#next_month').addEventListener('click', move_calendar);
document.querySelector('#prev_year').addEventListener('click', move_calendar);
document.querySelector('#next_year').addEventListener('click', move_calendar);



document.addEventListener("click", function (e) {
  if ((e.target as HTMLElement).classList.contains("calendar_td")) {
    let print_str: string = 'クリックした日付は  ' + (e.target as HTMLElement).dataset.date + '  です\n';
    let num  =(e.target as HTMLElement).dataset.date.split('/').map( str => parseInt(str, 10));
    let click_date = new Date(num[0], num[1] - 1, num[2]);
    let diff_time = date.getTime() - click_date.getTime();
    let diff_day = Math.floor(diff_time / (1000*60*60*24));
    print_str += '今日との差は  ' + Math.abs(diff_day) + '  日';
    if(diff_day > 0) print_str += '前です';
    else print_str += '後です';
    alert(print_str);
  }
})

show_calendar(year, month);