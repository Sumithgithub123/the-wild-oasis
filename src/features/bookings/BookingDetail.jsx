import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useNavigate, useParams } from "react-router-dom";
import useBookingDetails from "./useBookingDetails";
import Spinner from "../../ui/Spinner";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useUpdatecheckout } from "./useCheckout";
import useDeletebooking from "./useDeletebooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBookingDetails();
  const { deletebooking, isdeletingbooking } = useDeletebooking();
  const { updatecheckout } = useUpdatecheckout();
  const navigate = useNavigate();
  const status = booking?.status;

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading) return <Spinner />;

  if (!booking) return <Empty resourceName="booking" />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens="deletebooking">
            <Button variation="danger" icon={<HiTrash />}>
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="deletebooking">
            <ConfirmDelete
              resourceName={`Booking #${booking.id}`}
              onConfirm={() => {
                deletebooking(booking.id);
                navigate(-1);
              }}
              disabled={isdeletingbooking}
            />
          </Modal.Window>
        </Modal>
        {status === "checked-in" && (
          <Button
            onClick={() => {
              updatecheckout(booking.id);
              navigate(-1);
            }}
            icon={<HiArrowUpOnSquare />}
          >
            Check out
          </Button>
        )}
        {status === "unconfirmed" && (
          <Button
            onClick={() => navigate(`/checkin/${booking.id}`)}
            icon={<HiArrowDownOnSquare />}
          >
            Check in
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
