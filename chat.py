import PyPDF2
import openai
import json

openai.api_key = "T1xYhC_UvQ4060yG7jLiXG81OFcOFNe5jb0LrnsEcE4"
openai.api_base = "https://chimeragpt.adventblocks.cc/api/v1"

pdf_file_obj = open('./docs/IAC.pdf', 'rb')
pdf_reader = PyPDF2.PdfFileReader(pdf_file_obj)
num_pages = pdf_reader.numPages
detected_text = ''

for page_num in range(num_pages):
    page_obj = pdf_reader.getPage(page_num)
    detected_text += page_obj.extractText() + '\n\n'

pdf_file_obj.close()

def construct_index():
    pdf_content_dict = {
        'pdf_content': detected_text
    }

    json_data = json.dumps(pdf_content_dict, indent=4)

    with open("index.json", 'w') as json_file:
        json_file.write(json_data)

system_msg = "You are a helpful and kind AI Assistant."

def get_response(input_text):
    user_msg = detected_text + "\n\n" + input_text

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": system_msg},
            {"role": "user", "content": user_msg},
        ],
    )

    return response.choices[0].message.content

if __name__ == "__main__":
    construct_index()

    while True:
        query = input("You: ")
        if query.lower() == "exit":
            break
        response = get_response(query)
        print(response)