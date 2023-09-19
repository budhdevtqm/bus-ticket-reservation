import React, { useCallback, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getDate, verifyStatus } from "../../common/utils";
import { handleFetch } from "../../Redux/slices/commonThunks";

const User = ({ modal, toggler }) => {
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);
  console.log(user, "---");

  const navigateCb = useCallback(navigate, []);

  useEffect(() => {
    const getUser = async (id) => {
      const response = await dispatch(handleFetch(`/users/get-user/${id}`));
      console.log(response, "-");
      // if (response.type === "")
      // try {
      //   const response = await axios.get(
      //     `${BASE_URL}/users/get-user/${id}`,
      //     headerConfig,
      //   );
      //   setUser(response.data.data);
      // } catch (error) {
      //   verifyStatus(error.response.status, navigateCb);
      // }
    };

    if (userId) {
      getUser(userId);
    }
  }, [userId, navigateCb]);
  return (
    <Modal isOpen={modal} toggle={toggler}>
      <ModalHeader toggle={toggler}>User Information</ModalHeader>
      <ModalBody>
        {/* <div className="d-flex flex-row my-4">
          <span style={{ width: "50%" }}>Full Name</span>
          <b style={{ width: "50%" }}>{user.name}</b>
        </div>
        <div className="d-flex flex-row my-4">
          <span style={{ width: "50%" }}>Email</span>
          <b style={{ width: "50%" }}>{user.email}</b>
        </div>
        <div className="d-flex flex-row my-4">
          <span style={{ width: "50%" }}>Joined On</span>
          <b style={{ width: "50%" }}>{getDate(user.createdAt)}</b>
        </div>
        <div className="d-flex flex-row my-4">
          <span style={{ width: "50%" }}>Last Updated</span>
          <b style={{ width: "50%" }}>
            {user.updatedAt ? getDate(user.updatedAt) : "N/A"}
          </b>
        </div> */}
      </ModalBody>
    </Modal>
  );
};

export default User;
