export default function print(str) {
    console.log(str);
}

function printWarn(str) {
    console.warn(str);
}

export function printError(str) {
    console.error(str);
}

export { printWarn };

