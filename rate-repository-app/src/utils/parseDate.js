export const parseDate = (date) => {
	const formatedDate = new Date(date);

	const year = formatedDate.getFullYear();
	const month = formatedDate.getMonth();
	const day = formatedDate.getDate();
	const hours = formatedDate.getHours();
	const minutes = formatedDate.getMinutes();

	return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(
		2,
		0
	)}, ${day}.${month}.${year}`;
};
