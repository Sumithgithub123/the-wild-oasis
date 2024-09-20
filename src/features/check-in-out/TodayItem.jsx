/* eslint-disable react/prop-types */
import styled from "styled-components";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { useUpdatecheckout } from "../bookings/useCheckout";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { ischeckout, updatecheckout } = useUpdatecheckout();
  const navigate = useNavigate();
  const { id, status, guests, numNights } = activity;
  return (
    <StyledTodayItem>
      {status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} Nights</div>

      {status === "unconfirmed" && (
        <Button
          onClick={() => {
            navigate(`/checkin/${id}`);
          }}
          size="small"
          variation="primary"
        >
          Checkin
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          onClick={() => updatecheckout(id)}
          size="small"
          variation="primary"
          disabled={ischeckout}
        >
          {ischeckout ? "Processing..." : "Checkout"}
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
