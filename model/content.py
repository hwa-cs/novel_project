import torch
from transformers import pipeline,  AutoModelForCausalLM, AutoTokenizer

model_name = "Jade1222/gpt2_KM"

model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map = {"":0}
)
tokenizer = AutoTokenizer.from_pretrained(
    model_name,
    trust_remote_code = True
)

def content_generate(prompt):
    pipe = pipeline(task = 'text-generation', model = model, tokenizer = tokenizer)
    output = pipe(prompt, max_new_tokens = 512, do_sample = True,  temperature = 0.8, top_k = 50, top_p = 0.95)
    return output[0]['generated_text'][len(prompt):]