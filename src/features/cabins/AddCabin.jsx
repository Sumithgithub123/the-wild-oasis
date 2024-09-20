import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>

      {/* <Modal>
        <Modal.Open opens="table">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="table">
          <CabinTable />
        </Modal.Window>
      </Modal> */}
    </div>
  );
}

// function AddCabin() {
//   const [isopenmodel, setisopenmodel] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setisopenmodel((showcabinform) => !showcabinform)}>
//         Add new Cabin
//       </Button>
//       {isopenmodel && (
//         <Modal onclose={() => setisopenmodel((isopenmodel) => !isopenmodel)}>
//           <CreateCabinForm
//             onclose={() => setisopenmodel((isopenmodel) => !isopenmodel)}
//           />
//         </Modal>
//       )}
//     </>
//   );
// }

export default AddCabin;
