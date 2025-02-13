/**
 *  Debounce - Main
 */

let timer: any;

export const debounce = (func: (value:string) => void, timeout: number) => {
    if(timer){
        clearTimeout(timer);
        timer = undefined;
    }
    timer = setTimeout( func , timeout);
}


export const debounceFn = (fn: Function, ms:number) =>{
    let timeoutId :NodeJS.Timeout;
    return function(...args: any[]){
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            fn(...args);
        }, ms);
    }
}

