import Swal, { SweetAlertResult } from "sweetalert2"

export const DeleteShowConfirmAlert = () => {
  return new Promise<SweetAlertResult>((resolve) => {
    Swal.fire({
      title: 'Are you sure you want to delete this show?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      resolve(result);
    });
  });
}

export const DeleteShowSuccessAlert = () => {
    Swal.fire(
        'Deleted!',
        'Show has been deleted.',
        'success'
      )
}

export const CreateProgramSuccess = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'New Program Created',
    showConfirmButton: false,
    timer: 1200
  }    
 )
}

export const CreateProgramGoneWrongAlert = () => {
  Swal.fire(
    'Something went wrong',
    'OH NO - there was a problem creating the program - check your connection or PAY THE DEVELOPERS MORE!',
    'error'
    )
}