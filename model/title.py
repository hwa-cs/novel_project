import torch
import re
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

model = AutoModelForCausalLM.from_pretrained(
    "choeyunbeom/llama3_KM",
    device_map= {"":0}
)

tokenizer = AutoTokenizer.from_pretrained(
    "choeyunbeom/llama3_KM",
    trust_remote_code = True,  
   )
pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)

def predict(query):
    messages = [
      {"role": "system", "content" : "다음 소설의 제목을 지어주세요."},
      {"role": "user", "content": f"다음 글의 제목을 지어주세요. '{query}'"}
    ]
    
    terminators = [
      pipe.tokenizer.eos_token_id,
      pipe.tokenizer.convert_tokens_to_ids("<|eot_id|>")
    ]

    messages = pipe.tokenizer.apply_chat_template(
      messages,
      tokenize = False,
      add_generation_prompt = True
    )

    outputs = pipe(
      messages,
      max_new_tokens = 20,
      eos_token_id = terminators,
      do_sample = True,
      temperature = 0.6,
      top_p = 0.9)

    title = outputs[0]["generated_text"][len(messages):].split("'")[1]
    
    return title