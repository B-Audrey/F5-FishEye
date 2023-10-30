class ModalNavigator {
    currentValue = 0;
    elementsToDisplay = [];

    init(currentValue, elementsToDisplay) {
        this.currentValue = currentValue;
        this.elementsToDisplay = elementsToDisplay;
    };

    resetData(){
        this.currentValue = 0;
        this.elementsToDisplay = [];
    };

    goToNextIndex() {
        if (this.currentValue < this.elementsToDisplay.length-1 && this.currentValue >= 0) {
            this.currentValue ++;
        }
        else if (this.currentValue === this.elementsToDisplay.length-1) {
            this.currentValue = 0;
        }
        return this.getCurrentImg();
    };

    goToPreviousIndex() {
        if (this.currentValue >= 1) {
            this.currentValue --;
        }
        else if (this.currentValue === 0) {
            this.currentValue = this.elementsToDisplay.length-1;
        }
        return this.getCurrentImg();
    };

    getCurrentImg() {
        return this.elementsToDisplay[this.currentValue];
    }
}

export const modalNavigator = new ModalNavigator();

