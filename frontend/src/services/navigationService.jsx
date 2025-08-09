let globalNavigateFunction;

function registerGlobalNavigate(navigateFunction) {
    globalNavigateFunction = navigateFunction;
}

function navigateTo(path, options) {
    if (globalNavigateFunction) {
        globalNavigateFunction(path, options);
    } else {
        console.warn("Global navigate function has not been registered yet.");
    }
}

export {registerGlobalNavigate,navigateTo};