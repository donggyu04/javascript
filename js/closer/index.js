// Reference: https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures

// Closer.
function makeFunc() {
    let name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

let myFunc = makeFunc();
//myFunc 변수에 displayName 을 리턴함
//유효범위의 어휘적 환경을 유지
// myFunc();
//리턴된 displayName 함수를 실행(name 변수에 접근)

function makeAdder(x) {
    let y = 1;
    return function(z) {
        y = 100;
        return x + y + z;
    };
}
let add5 = makeAdder(5);
let add10 = makeAdder(10);
//클로저에 x와 y의 환경이 저장됨
console.log(add5(2));  // 107 (x:5 + y:100 + z:2)
console.log(add10(2)); // 112 (x:10 + y:100 + z:2)
//함수 실행 시 클로저에 저장된 x, y값에 접근하여 값을 계산

// Private method. (module pattern)
let counter = (function() {
    let privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        increment: function() {
            changeBy(1);
        },
        decrement: function() {
            changeBy(-1);
        },
        value: function() {
            return privateCounter;
        }
    };
})();

console.log(counter.value()); // logs 0
counter.increment();
counter.increment();
console.log(counter.value()); // logs 2
counter.decrement();
console.log(counter.value()); // logs 1


// Closer sample
function showHelp(help) {
    document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
    return function() {
        showHelp(help);
    };
}

function setupHelp() {
    let helpText = [
        {'id': 'email', 'help': 'Your e-mail address'},
        {'id': 'name', 'help': 'Your full name'},
        {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

    for (var i = 0; i < helpText.length; i++) {
        var item = helpText[i];
        document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
    }

    // for (var i = 0; i < helpText.length; i++) {
    //     (function() {
    //         var item = helpText[i];
    //         document.getElementById(item.id).onfocus = function() {
    //             showHelp(item.help);
    //         }
    //     })();
    // }

    // user let instead of var
    // for (var i = 0; i < helpText.length; i++) {
    //     let item = helpText[i];
    //     document.getElementById(item.id).onfocus = function() {
    //         showHelp(item.help);
    //     }
    // }
}

setupHelp();