import Swal from "sweetalert2"


export const DeleteShowSuccessAlert = () => {
    Swal.fire(
        'Deleted!',
        'Show has been deleted.',
        'success'
      )
}

export const CreateProgramSuccess = () => {
  Swal.fire({
    position: 'top-end',
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