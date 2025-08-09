let globalToastFunction = null;

function registerToastFunction(toastFunction){
    globalToastFunction = toastFunction;
}

function showGlobalToast(message,type="info",duration=5000){
    if (globalToastFunction){
        globalToastFunction(message,type,duration);
    }else{
        console.warn("Toast function has not been registered yet.");
    }
}

export {registerToastFunction,showGlobalToast};
