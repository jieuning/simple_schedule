function YearMonthSelector() {
  const monthArr = [
    "January",
    "Februry",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novemver",
    "December",
  ];

  return (
    <div>
      <ul className="flex gap-4 relative">
        <li className="font-ptd-b text-3xl">
          2025
          <span className="inline-block w-0.5 h-6 ml-4 bg-priamry"></span>
        </li>
        {monthArr.map((month) => (
          <li key={month} className="flex items-center">
            {month}
            <span className="inline-block w-px h-3.5 ml-4 bg-secondary"></span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YearMonthSelector;
