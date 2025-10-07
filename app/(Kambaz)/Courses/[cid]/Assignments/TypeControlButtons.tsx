import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
export default function TypeControlButtons({ value }: { value: number }) {
  return (
    <div className="float-end">
      <span
        id="wd-assignment-weight"
        className="rounded-pill border border-black px-2 py-1"
      >
        {value}% of Total
      </span>
      <BsPlus className="mx-2 fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
