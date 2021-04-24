import spacy

# if __name__ == 'main':
#   print('!')
nlp = spacy.load('es_core_news_lg')
text = '120 gramos pechuga de pollo'
doc = nlp(text)

# for ent in doc.ents:
#   print(f"Named entity '{ent.text}' with label '{ent.label}'")

for token in doc:
  print(token.text, token.lemma_, token.pos_, token.tag_, token.dep_,
    token.shape_, token.is_alpha, token.is_stop)
