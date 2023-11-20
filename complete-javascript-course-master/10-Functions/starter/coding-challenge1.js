'use-strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),

  // 1. My solution
  registerNewAnswer() {
    //1.1 / My solution
    const input = Number(
      prompt(
        'What is your favorite programming language? \n0: JavaScript\n1: Python\n2: Rust\n3: C++'
      )
      // Jonas solution
      // const answers = prompt(`${this.question}\n${this.options,join('\n)}\n(Write opetion number)`);
    );

    //1.2 My aolution
    if (input >= 0 && input < this.answers.length) {
      this.answers[input]++;
    } else {
      console.log('Invalid input!');
    }
    // console.log(this.answers);

    // Jonas solution
    // short-curcuiting technique
    // typeof answer === 'number' &&
    //   answer < this.answers.length &&
    //   this.answers[answer]++;

    //4.
    this.displayResults();
  },

  //3. My solution
  displayResults(type = 'string') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      const resultStr = `Poll results are: ${this.answers.join(', ')}`;
      console.log(resultStr);
    } else {
      console.log('Invalid type');
    }
  },

  // Jonas solution
  // mine is correct
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const data1 = [5, 2, 3];
const data2 = [1, 5, 3, 9, 6, 1];

// my solution
poll.displayResults.call({ answers: data1 }, 'array');
poll.displayResults.call({ answers: data2 }, 'string');
