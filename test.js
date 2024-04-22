var exam = {
  value: 50,
  func1: function () {
    console.log('func 1 - this: ' + this.value);
  },
  func2: function () {
    console.log('func 2 - this: ' + this.value);
    setTimeout(() => {
      console.log('func 2 - time out - this: ' + this.value);
    }, 200);
    value: 30;
  }
};

var value = 20;
exam.func1();
exam.func2();
