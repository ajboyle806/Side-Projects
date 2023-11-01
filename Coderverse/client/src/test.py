import numpy
from transformers import AutoModelForQuestionAnswering, AutoTokenizer, pipeline
import sys

input = sys.argv[1]
output = "A"
sys.stdout.flush()

model_name = "deepset/roberta-base-squad2"

# a) Get predictions
nlp = pipeline('question-answering', model=model_name, tokenizer=model_name)
QA_input = {
    'question': 'Why do I need quotes in print?',
    'context': 'Before we jump into Python programming, we need to talk about what a program actually is. A computer program is a set of ordered steps used to achieve a specific goal, like add two numbers. To elaborate, computer programs must be dividable, ordered, determined, and repeatable. Typically, the first program written in a new language is called Hello, World! because all it does is display the words, Hello, World! You can call the print function by writing print() and putting text in quotes or a number in the parenthesis. Now that we know what’s a program, then what’s a programming language? Similar  to how human beings use many languages for communication, programming languages  are the languages that you use to communicate with computers, letting the computer  know how you want it to execute the programs that you have defined. There are many  different programming languages that have been developed in the world. Python is  one of the easiest to understand and learn. Secondly a function uses a pair of parentheses to specify inputs to its task, the content inside the parenthesis pair is called an argument.'
}
res = nlp(QA_input)

# b) Load model & tokenizer
model = AutoModelForQuestionAnswering.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

print(res)