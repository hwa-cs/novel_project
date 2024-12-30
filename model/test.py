import base64
import io


img_in = open('./사과.jpg', 'rb')
print(img_in)
base64_str = base64.b64encode(img_in.read())
print(base64_str)