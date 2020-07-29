$("document").ready(function () {
	let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
	let days = ["воскресение", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
	
	let getUnixTime = () => {
		return new Date().valueOf() + 1000 * 60 * 60 * (new Date().getTimezoneOffset() / 60); // получаем чистую дату без смещения
	};

	let getUnixOffset = offset => {
		return getUnixTime() + 1000 * 60 * 60 * offset; //добавляем к чистой дате смещение. оффсет - часы
	};

	let getTomorrowInfo = () => {
		let tomorrow = new Date(getUnixOffset(3) + 1000 * 60 * 60 * 24); //завтрашний день
		//let tomorrow = new Date(getUnixOffset(3) + 1000 * 60 * 60 * 5); //24 - 5 = 19 (время смены дня)

		let date = tomorrow.getDate();
		let day = tomorrow.getDay();
		let month = tomorrow.getMonth();
		let time;
/*
		if (day >= 1 && day <= 5) {
			//если будни
			time = "19:00";
		} else {
			//все остальные дни
			time = "15:00";
		}
*/
		return {
			date: date,
			monthNumber: month,
			monthText: months[month],
			dayNumber: day,
			dayText: days[day],
			time: "19:00"//time
		};
	};

	let elem = $("[field='tn_text_1590160035158']"); //элемент с текстом
	let text = elem.eq(0).html(); //получаем текст
	
	let tomorrowInfo = getTomorrowInfo();

	text = text.replace(/\d\d:\d\d/g, tomorrowInfo.time);
	text = text.replace(/(,\s)\d+/, "$1" + tomorrowInfo.date); //находим число опираясь на запятую
	text = text.replace(/(,\s\d+&nbsp;).+?,/, "$1" + tomorrowInfo.monthText + ","); //находим месяц опираясь на число
	elem.html(text); //заменяем текст на странице
});