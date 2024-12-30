import torch
import re
from transformers import pipeline,  AutoModelForCausalLM, AutoTokenizer

# model_name = "Jade1222/gpt2_KM_v2"

# model = AutoModelForCausalLM.from_pretrained(
#     model_name,
#     device_map = {"":0}
# )
# tokenizer = AutoTokenizer.from_pretrained(
#     model_name,
#     trust_remote_code = True
# )

# 텍스트 생성
class TextGenerator:
    def __init__(self, model, tokenizer, device = "cuda"):
        """
        초기화 메서드
        """
        self.model = model.to(device)
        self.tokenizer = tokenizer
        self.device = device

    def generate(self, genre: str, user_request: str = None, max_length = 512, temperature: float = 1.0, top_k: int = 50, top_p: float = 0.95,
                 repetition_penalty: float = 2.0):
        """
        텍스트를 생성
        - temperature: 생성 확률 분포의 다양성 제어
        - top_k: 가장 높은 확률 k개의 단어를 고려
        - top_p: 누적 확률이 p 이하인 단어만 고려 (nucleus sampling)
        """
        if user_request:
            prompt = f"</s> {genre} 장르의 이야기입니다. 요청: {user_request} 다음 단락을 완성하세요.\n"
        else:
            prompt = f"</s> {genre} 장르의 이야기입니다. 다음 단락을 완성하세요.\n"
            
        input_ids = self.tokenizer.encode(prompt, return_tensors = "pt").to(self.device)

        generated_ids = self.model.generate(
            input_ids = input_ids,
            max_length = max_length,
            temperature = temperature,
            top_k = top_k,
            top_p = top_p,
            repetition_penalty = repetition_penalty,
            pad_token_id = self.tokenizer.pad_token_id,
            eos_token_id = self.tokenizer.eos_token_id,
            bos_token_id = self.tokenizer.bos_token_id,
            do_sample = True # 샘플링 활성화
        )
        
        # 결과 디코딩
        generated_text = self.tokenizer.decode(generated_ids[0], skip_special_tokens = True)
        

        # 후처리
        # 프롬프트를 제외하고 생성 단락만 보여주기 
        generated_text = generated_text[len(prompt):]
        
        # 따옴표가 뒤에 없는 경우 문장부호 뒤에 공백이 없으면 공백 추가
        generated_text = re.sub(r'(?<=[.?!])(?=[^\s"”’])', " ", generated_text)
        
        # 문장부호 뒤에 따옴표가 있는 경우, 따옴표 뒤에 공백 추가
        generated_text = re.sub(r'(?<=[.?!])(["”’])(?=\S)', r'\1 ', generated_text)

        # 문장부호 뒤에 따옴표 있으면 따옴표 기준, 문장부호 기준으로 문장 나눈 후
        # 앞 두 문장과 마지막 한 문장 제거하기
        generated_text = re.split(r'(?<=[.?!]["”’])|(?<=[.?!])(?=\s)', generated_text)
        generated_text = generated_text[2:-1]

        # 맨 첫 번째 줄 공백 제거
        generated_text = re.sub(r'^\s+', "", "".join(generated_text))
        return generated_text