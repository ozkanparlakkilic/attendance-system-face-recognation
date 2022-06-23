import Swal from "sweetalert2";
import StyleGuide from "../utils/StyleGuide";
import "./SweetAlert.css";

export const confirmModal = (message, confirm) => {
  Swal.fire({
    title: "Confirmation",
    text: message,
    backdrop: "rgba(0, 0, 0, 0.3)",
    icon: "warning",
    heightAuto: false,
    showCancelButton: true,
    confirmButtonText: "Yes",
    confirmButtonColor: `${StyleGuide.palette.softGreen}`,
    buttonsStyling: true,
    cancelButtonColor: `${StyleGuide.palette.softRed}`,
    cancelButtonText: "Cancel",
    customClass: "closeButton",
    showCloseButton: true,
    closeButtonAriaLabel: "X",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      confirm();
    }
  });
};

export const successModal = (message, confirm) => {
  Swal.fire({
    title: "Information",
    text: message,
    backdrop: "rgba(0, 0, 0, 0.3)",
    icon: "success",
    heightAuto: false,
    showConfirmButton: true,
    confirmButtonText: "Ok",
    confirmButtonColor: `${StyleGuide.palette.softBlue}`,
    buttonsStyling: true,
    confirmButtonClass: "modal-button",
    customClass: "closeButton",
    showCloseButton: true,
    closeButtonAriaLabel: "X",
    reverseButtons: true,
    didClose: () => {
      confirm();
    },
  }).then((result) => {
    if (result.isConfirmed) {
      confirm();
    }
  });
};

export const warningModal = (message, confirm = false) => {
  Swal.fire({
    title: "Warning",
    text: message,
    backdrop: "rgba(0, 0, 0, 0.3)",
    heightAuto: false,
    icon: "warning",
    showConfirmButton: true,
    confirmButtonText: "Ok",
    confirmButtonColor: `${StyleGuide.palette.softBlue}`,
    customClass: "closeButton",
    showCloseButton: true,
    closeButtonAriaLabel: "X",
    buttonsStyling: true,
    confirmButtonClass: "modal-button",
    reverseButtons: true,
    didClose: () => {
      if (!!confirm) {
        confirm();
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      if (!!confirm) {
        confirm();
      }
    }
  });
};

export const loginModal = (title, login) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didClose: () => {
      login();
    },
  });

  Toast.fire({
    icon: "success",
    title: title,
  });
};

export const errorModal = (message, confirm = false) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    confirmButtonText: "OK",
    confirmButtonColor: `${StyleGuide.palette.softRed}`,
    buttonsStyling: true,
    confirmButtonClass: "modal-button",
    heightAuto: false,
    customClass: "closeButton",
    showCloseButton: true,
    closeButtonAriaLabel: "X",
    didClose: () => {
      window.history.back();
    },
  });
};
