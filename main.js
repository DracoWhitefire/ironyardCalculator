class Calculator {
    /**
     * @param $a
     * @param $b
     * @returns number
     */
    calculate($a, $b) {
        return this.calculation.calculate($a, $b);
    }

    setCalculation($calculation) {
        this.calculation = $calculation;
    }
}

class SumCalculation {
    /**
     * @param $a
     * @param $b
     * @returns number
     */
    calculate($a, $b) {
        return Number($a) + Number($b);
    }
}

class SubtractCalculation {
    /**
     * @param $a
     * @param $b
     * @returns number
     */
    calculate($a, $b) {
        return Number($a) - Number($b);
    }
}

class DivideCalculation {
    /**
     * @param $a
     * @param $b
     * @returns number
     */
    calculate($a, $b) {
        return Number($a) / Number($b);
    }
}

class ProductCalculation {
    /**
     * @param $a
     * @param $b
     * @returns number
     */
    calculate($a, $b) {
        return Number($a) * Number($b);
    }
}

class BufferManager {
    constructor() {
        this.activeBuffer = 'A';
    }

    clearBuffers() {
        this.bufferA = null;
        this.bufferB = null;
    }

    setActiveBuffer(value) {
        switch (value) {
            case 'A':
                this.activeBuffer = 'A';
                break;
            case 'B':
                this.activeBuffer = 'B';
                break;
        }
    }

    addToBuffer(number) {
        let allowed = /[\d.,]/;
        if (!allowed.test(number)) {
            return;
        }
        switch (this.activeBuffer) {
            case 'A':
                if (typeof this.bufferA === 'undefined' || this.bufferA === null) {
                    this.bufferA = number;
                } else {
                    this.bufferA += number;
                }
                this.bufferA = Number(this.bufferA);
                break;
            case 'B':
                if (typeof this.bufferB === 'undefined' || this.bufferB === null) {
                    this.bufferB = number;
                } else {
                    this.bufferB += number;
                }
                this.bufferB = Number(this.bufferB);
                break;
        }
    }

    setToBuffer(buffer, value) {
        switch (buffer) {
            case 'A':
                this.bufferA = value;
                break;
            case 'B':
                this.bufferB = value;
                break;
        }
    }

    getActiveBufferContent() {
        switch (this.activeBuffer) {
            case 'A':
                return this.bufferA;
            case 'B':
                return this.bufferB;
        }
    }

    getInactiveBufferContent() {
        switch (this.activeBuffer) {
            case 'A':
                return this.bufferB;
            case 'B':
                return this.bufferA;
        }
    }
}

(function () {
    let bufferManager = new BufferManager();
    let calculator = new Calculator();

    let displayBuffers = function() {
        let active = document.getElementById('active');
        active.textContent = bufferManager.getActiveBufferContent();
        let inactive = document.getElementById('inactive');
        inactive.textContent = bufferManager.getInactiveBufferContent();
    };

    document.querySelectorAll('.clear').forEach(function (element) {
        element.addEventListener("click", function clear() {
            bufferManager.clearBuffers();
            displayBuffers();
        });
    });


    document.querySelectorAll('.number').forEach(function (element) {
        element.addEventListener("click", function number() {
            let numberVal = this.textContent;
            bufferManager.addToBuffer(numberVal);
            displayBuffers();
        });
    });


    document.querySelectorAll('.operator').forEach(function (element) {
        element.addEventListener("click", function number() {
            if (bufferManager.activeBuffer === 'B') {
                let result = calculator.calculate(
                    bufferManager.getInactiveBufferContent(),
                    bufferManager.getActiveBufferContent()
                );
                bufferManager.clearBuffers();
                bufferManager.setToBuffer('A', result);
            } else {
                bufferManager.activeBuffer = 'B';
            }
            displayBuffers();

            let operator = this.textContent;
            document.getElementById('operator').textContent = operator;
            switch (operator) {
                case '+':
                    calculator.setCalculation(new SumCalculation());
                    break;
                case '-':
                    calculator.setCalculation(new SubtractCalculation());
                    break;
                case 'x':
                    calculator.setCalculation(new ProductCalculation());
                    break;
                case '/':
                    calculator.setCalculation(new DivideCalculation());
                    break;
            }
        });
    });

    document.querySelectorAll('.equal').forEach(function (element) {
        element.addEventListener("click", function equal() {
            let result = calculator.calculate(
                bufferManager.getInactiveBufferContent(),
                bufferManager.getActiveBufferContent()
            );
            bufferManager.clearBuffers();
            bufferManager.setActiveBuffer('A');
            bufferManager.setToBuffer('A', result);
            displayBuffers();
            document.getElementById('operator').textContent = '';
        });
    });

})();
