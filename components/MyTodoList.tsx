function MyTodoList() {
  return (
    <div className="mt-6 ">
      <div className="text-center text-sm">TODO&apos;S</div>
      <div className="w-[430px] mt-1.5 border-t-2 h-[600px] overflow-hidden overflow-y-scroll">
        <ul className="px-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <li key={index} className="p-1 border-b border-secondary">
              <input type="checkbox" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyTodoList;
