/* eslint-disable react/prop-types */
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedstays, numDays, cabins }) {
  const numberofbokings = bookings.length;
  console.log(confirmedstays);

  const sales = bookings.reduce((acc, obj) => {
    return obj.totalPrice + acc;
  }, 0);

  const checkin = confirmedstays.length;

  const occupation =
    (confirmedstays.reduce((acc, val) => {
      return acc + val.numNights;
    }, 0) /
      numDays) *
    cabins;

  return (
    <>
      <Stat
        title={"Bookings"}
        color={"blue"}
        icon={<HiOutlineBriefcase />}
        value={numberofbokings}
      />
      <Stat
        title={"Sales"}
        color={"green"}
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title={"Check ins"}
        color={"indigo"}
        icon={<HiOutlineCalendarDays />}
        value={checkin}
      />
      <Stat
        title={"Occupancy rate"}
        color={"yellow"}
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation) + "%"}
      />
    </>
  );
}

export default Stats;
