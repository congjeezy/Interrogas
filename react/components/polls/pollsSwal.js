import Swal from 'sweetalert2';


const baseSuccessConfig = {
    text: '',
    icon: 'success',
};

const baseErrorConfig = {
    text: '',
    icon: 'error',
};


const Success = (message) => {
    baseSuccessConfig.title = message;
    Swal.fire(baseSuccessConfig);
};

const Error = (message, text) => {
    baseErrorConfig.title = message;
    baseErrorConfig.text = text;
    Swal.fire(baseErrorConfig);
};

const TimedSucc = (message, text) => {
    Swal.fire({
        title: message,
        text: text,
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
    });
};

const TimedErrorToast = (message, text) => {
    Swal.fire({
        title: message,
        text: text,
        icon: "error",
        toast: true,
        showConfirmButton: false,
        timer: 2500,
      });
};

export { Success, Error, TimedSucc, TimedErrorToast };