import { axiosInstance } from "../services/axios";
import { useSelector, useDispatch } from "react-redux";

export default function TestGet() {
  const dispatch = useDispatch();

  // Получаем массив категорий из Redux store
  const categories = useSelector(state => state.categories);
  console.log(categories);

  const handleClick = async () => {};

  return (
    <div className="p-4">
      <button onClick={handleClick} className="bg-blue-600 text-white px-4 py-2 rounded">
        Тестировать GET-запрос
      </button>
    </div>
  );
}
